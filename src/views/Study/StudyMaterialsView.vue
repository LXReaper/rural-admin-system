<template>
  <div id="StudyMaterialsView">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="资料编号" prop="text_content">
        <el-input
          v-model="queryParams.text_content"
          placeholder="请输入资料编号"
          clearable
          @keydown.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="发布用户" prop="user_name">
        <el-input
          v-model="queryParams.user_name"
          placeholder="请输入发布用户"
          clearable
          @keydown.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="更新用户" prop="updated_user_name">
        <el-input
          v-model="queryParams.updated_user_name"
          placeholder="请输入更新用户"
          clearable
          @keydown.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="handleQueryDebounce"
          >搜索
        </el-button>
        <el-button size="default" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!--    增删改操作-->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain size="default" @click="handleAdd"
          >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain size="default" :disabled="multiple"
          >删除
        </el-button>
      </el-col>
    </el-row>

    <!--    表格-->
    <el-table
      v-loading="loading"
      :data="learningMaterialsList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="资料编号" align="center" prop="material_id" />
      <el-table-column label="文字内容" align="center" prop="text_content" />
      <el-table-column label="视频" align="center" prop="video_url" />
      <el-table-column label="发布用户" align="center" prop="user_name" />
      <el-table-column
        label="发布日期"
        align="center"
        prop="publish_date"
        width="180"
      >
        <template #default="scope">
          <span>{{
            moment(scope.row.publish_date).format("YYYY年MM月DD日 HH时mm分ss秒")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新用户"
        align="center"
        prop="updated_user_name"
      />
      <el-table-column
        label="更新日期"
        align="center"
        prop="update_date"
        width="180"
      >
        <template #default="scope">
          <span>{{
            moment(scope.row.update_date).format("YYYY年MM月DD日 HH时mm分ss秒")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="确定删除这份学习资料"
            @confirm="confirmEvent(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--    分页-->
    <el-pagination
      v-show="total > 0"
      background
      :currentPage="queryParams.current"
      :page-size="total"
      :page-count="Math.ceil(total / queryParams.pageSize)"
      :total="Math.ceil(total / queryParams.pageSize)"
      layout="total, size, prev, pager, next, jumper"
      @current-change="pageHandleChange"
      class="mt-4"
    />

    <!-- 添加或修改学习资料内容对话框 -->
    <el-dialog :title="title" v-model="open" width="600px" append-to-body>
      <el-form :model="form" :rules="rules" label-width="80px">
        <el-form-item label="学习内容" prop="text_content">
          <el-input
            type="textarea"
            v-model="form.text_content"
            placeholder="请输入学习内容"
            maxlength="30"
          />
        </el-form-item>
        <el-form-item label="学习视频" prop="video_url">
          <el-input
            v-model="form.video_url"
            placeholder="请输入学习视频网址"
            maxlength="30"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitFormDebounce"
            >确 定
          </el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { debounce } from "../../../utils/debounce_Throttle";
import { InfoFilled } from "@element-plus/icons-vue";
import {
  LearningMaterialsControllerService,
  UserControllerService,
} from "../../../generated";
import { ElMessage, ElPagination } from "element-plus";
import moment from "moment";

//总数
const total = ref(0);
//是否加载
const loading = ref(true);
// 删除按钮禁用
const multiple = ref(true);
//显示搜索条件
const showSearch = ref(true);
//查询条件
const queryParams = ref({
  pageSize: 50,
  current: 1,
  text_content: "",
  user_name: "",
  updated_user_name: "",
});
//查询后得到的数据
const learningMaterialsList = ref([]);

//选中数组
const ids = ref<[]>([]);
// 弹出层标题
const title = ref("");
//是否显示数据弹出层
const open = ref(false);
//添加和编辑对话框中编写的要放入数据库中的form数据
const form = ref({
  material_id: "",
  video_url: "",
  text_content: "",
});

//表单重置
const reset = () => {
  form.value = {
    material_id: "",
    video_url: "",
    text_content: "",
  };
};

/**
 * 对话框
 */
//规则
const rules = ref({
  text_content: [
    { required: true, message: "学习内容不能为空", trigger: "blur" },
  ],
});
//提交
const submitForm = async () => {
  if (!form.value.text_content) {
    ElMessage.error("学习资料信息没填完整");
    return;
  }
  //执行添加学习资料或者修改学习资料的操作
  if (title.value.includes("添加学习资料")) {
    const res =
      await LearningMaterialsControllerService.addLearningMaterialsUsingPost({
        video_url: form.value.video_url,
        text_content: form.value.text_content,
      });
    if (res.code === 0) {
      ElMessage.success("学习资料添加成功");
      await handleQuery();
    } else ElMessage.error("学习资料添加失败，" + res.message);
  } else {
    const updateRes =
      await LearningMaterialsControllerService.updateLearningMaterialsUsingPost(
        {
          material_id: form.value.material_id as any,
          video_url: form.value.video_url,
          text_content: form.value.text_content,
        }
      );
    if (updateRes.code === 0) {
      ElMessage.success("学习资料修改成功");
      await handleQuery();
    } else ElMessage.error("学习资料修改失败，" + updateRes.message);
  }
  open.value = false;
  reset();
};
const submitFormDebounce = debounce(submitForm, 300); //防抖
//取消
const cancel = () => {
  open.value = false;
  reset();
};

//查询数据
const handleQuery = async () => {
  loading.value = true;
  const res =
    await LearningMaterialsControllerService.listLearningMaterialsVoByPageUsingPost(
      queryParams.value
    );
  loading.value = false;
  if (res.code === 0) {
    learningMaterialsList.value = res.data.records;
    total.value = res.data.total;
  } else ElMessage.error("学习资料加载失败，" + res.message);
};
const handleQueryDebounce = debounce(handleQuery, 500);
onMounted(() => {
  handleQuery();
});
//重置
const resetQuery = () => {
  queryParams.value = {
    pageSize: 50,
    current: 1,
    text_content: "",
    user_name: "",
    updated_user_name: "",
  };
  handleQueryDebounce();
};
//分页触发事件
const pageHandleChange = (value: number) => {
  queryParams.value.current = value;
  handleQuery();
};

/**
 * 增删改操作
 */
//增加
const handleAdd = () => {
  reset();
  open.value = true;
  title.value = "添加学习资料";
};

/**
 * 表格中的按钮
 */
const curEdit = ref(0);
//修改
const handleEdit = (index: number, row: any) => {
  // form.value = {
  //   video_url: learningMaterialsList.value[index].video_url as string,
  //   text_content: learningMaterialsList.value[index].text_content as string,
  // };
  // curEdit.value = index;
  // open.value = true;
  // title.value = `修改${learningMaterialsList.value[index].villager_name}的信息`;
};
//删除
const onDelete = async (index: number, row: any) => {
  // const res = await UserControllerService.deleteUserUsingPost({
  //   id: learningMaterialsList.value[index].villager_id,
  // });
  // if (res.code === 0) {
  //   ElMessage.success("成功删除");
  //   await handleQuery();
  // } else ElMessage.error("删除失败，" + res.message);
};
const confirmEvent = (index: number, row: any) => {
  onDelete(index, row);
};
watch(
  () => ids.value.length,
  () => {
    if (ids.value.length) multiple.value = false;
    else multiple.value = true;
  }
);

const handleSelectionChange = (selection: any) => {
  //拿到选中的行的传递的数组信息selection，将数组selection中的material_id传给ids
  ids.value = [];
  // for (let i = 0; i < selection.length; ++i)
  //   ids.value.push({
  //     id: selection[i].material_id,
  //   });
};
</script>

<style scoped>
#StudyMaterialsView {
}
</style>
