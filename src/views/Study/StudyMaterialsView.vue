<template>
  <div id="StudyMaterialsView">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="资料内容" prop="text_content">
        <el-input
          v-model="queryParams.text_content"
          placeholder="请输入资料ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="发布用户" prop="user_id">
        <el-input
          v-model="queryParams.user_id"
          placeholder="请输入发布用户ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="更新用户" prop="updated_user_id">
        <el-input
          v-model="queryParams.updated_user_id"
          placeholder="请输入更新用户ID"
          clearable
          @keyup.enter="handleQueryDebounce"
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
      <el-table-column label="资料ID" align="center" prop="materialId" />
      <el-table-column label="视频" align="center" prop="videoUrl" />
      <el-table-column label="文字内容" align="center" prop="textContent" />
      <el-table-column label="发布用户ID" align="center" prop="userId" />
      <el-table-column
        label="发布日期"
        align="center"
        prop="publishDate"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新用户ID" align="center" prop="updatedUserId" />
      <el-table-column
        label="更新日期"
        align="center"
        prop="updateDate"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row }}</span>
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

    <!--    &lt;!&ndash;    分页&ndash;&gt;-->
    <!--    <el-pagination-->
    <!--      v-show="total > 0"-->
    <!--      :total="total"-->
    <!--      :page="queryParams.current"-->
    <!--      :limit="queryParams.pageSize"-->
    <!--    />-->

    <!-- 添加或修改学习资料内容对话框 -->
    <el-dialog :title="title" v-model="open" width="600px" append-to-body>
      <el-form :model="form" :rules="rules" label-width="80px">
        <el-form-item label="学习内容" prop="text_content">
          <el-input
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
import { UserControllerService } from "../../../generated";
import { ElMessage } from "element-plus";

//总数
const total = ref(50);
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
  user_id: "",
  updated_user_id: "",
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
  video_url: "",
  text_content: "",
});

//表单重置
const reset = () => {
  form.value = {
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
  // if (title.value.includes("添加学习资料")) {
  //   const res = await UserControllerService.addUserUsingPost({
  //     video_url: form.value.video_url,
  //     text_content: form.value.text_content,
  //   });
  //   if (res.code === 0) {
  //     ElMessage.success("添加成功");
  //     handleQuery();
  //   } else ElMessage.error("添加失败，" + res.message);
  // } else {
  //   const updateRes = await UserControllerService.updateUserUsingPost({
  //     id: learningMaterialsList.value[curEdit.value].villager_id,
  //     userAccount: form.value.account,
  //     userAddress: form.value.address,
  //     userName: form.value.villager_name,
  //     userPhone: form.value.phone_number,
  //     userProfile: form.value.introduction,
  //     userRole: form.value.userRole,
  //   });
  //   if (updateRes.code === 0) {
  //     ElMessage.success("修改成功");
  //     handleQuery();
  //   } else ElMessage.error("删除失败，" + updateRes.message);
  // }
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
const handleQuery = () => {
  loading.value = true;
  console.log();
  loading.value = false;
};
const handleQueryDebounce = debounce(handleQuery, 500);
onMounted(() => {
  handleQuery();
});
//重置
const resetQuery = () => {
  console.log();
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
