<template>
  <div id="TaskExamineView">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="任务内容" prop="task_content">
        <el-input
          v-model="queryParams.task_content"
          placeholder="请输入任务内容"
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
      <el-form-item label="审核用户" prop="examine_user_id">
        <el-input
          v-model="queryParams.examine_user_id"
          placeholder="请输入审核用户ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="任务积分" prop="points_value">
        <el-input
          v-model="queryParams.points_value"
          placeholder="请输入任务积分"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="规则" prop="rule_id">
        <el-input
          v-model="queryParams.rule_id"
          placeholder="请输入规则id"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="资料" prop="material_id">
        <el-input
          v-model="queryParams.material_id"
          placeholder="请输入资料id"
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
      :data="taskExamineList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="资料id" align="center" prop="material_id" />
      <el-table-column label="规则id" align="center" prop="rule_id" />
      <el-table-column
        label="任务内容"
        align="center"
        prop="task_content"
        show-overflow-tooltip
      >
        <template #default="scope">
          <span style="white-space: nowrap">
            {{ scope.row.task_content }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="任务积分数值"
        align="center"
        prop="points_value"
      />
      <el-table-column label="审核状态" align="center" prop="is_accepted" />
      <el-table-column label="发布用户id" align="center" prop="user_id" />
      <el-table-column
        label="发布日期"
        align="center"
        prop="publish_date"
        show-overflow-tooltip
        width="180"
      >
        <template #default="scope">
          <span style="white-space: nowrap"
            >{{
              moment(scope.row.publish_date).format(
                "YYYY年MM月DD日 HH时mm分ss秒"
              )
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核用户ID"
        align="center"
        prop="examine_user_id"
      />
      <el-table-column
        label="审核日期"
        align="center"
        prop="update_date"
        show-overflow-tooltip
        width="180"
      >
        <template #default="scope">
          <span v-if="scope.row.update_date" style="white-space: nowrap"
            >{{
              moment(scope.row.update_date).format(
                "YYYY年MM月DD日 HH时mm分ss秒"
              )
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="截止日期"
        align="center"
        prop="deadline"
        show-overflow-tooltip
        width="180"
      >
        <template #default="scope">
          <span style="white-space: nowrap"
            >{{
              moment(scope.row.deadline).format("YYYY年MM月DD日 HH时mm分ss秒")
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            审核
          </el-button>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="确定删除这条审核记录吗"
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

    <!-- 审核任务对话框 -->
    <el-dialog :title="title" v-model="open" width="600px" append-to-body>
      <el-form :model="form" :rules="rules" label-width="80px">
        <el-form-item label="审核状态" prop="video_url">
          <el-select
            v-model="curState.is_accepted"
            placeholder="请选择审核的状态"
            size="large"
            default-first-option
            style="width: 240px"
          >
            <el-option
              v-for="item in [
                { value: 0, label: '审核中' },
                { value: 1, label: '审核通过' },
                { value: 2, label: '审核打回' },
              ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
import { ElMessage, ElNotification } from "element-plus";
import { TasksExamineControllerService } from "../../../generated/services/TasksExamineControllerService";
import moment from "moment/moment";

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
  task_content: "",
  user_id: "",
  examine_user_id: "",
  is_accepted: "",
  material_id: "",
  points_value: "",
  deadline: "",
  publish_date: "",
  rule_id: "",
  update_date: "",
});
//查询后得到的数据
const taskExamineList = ref([]);

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
  const res = await TasksExamineControllerService.taskHandleUsingPost({
    id: curState.value.id,
    is_accepted: curState.value.is_accepted,
  });
  if (res.code === 0) {
    ElNotification.success("已审核");
  } else ElNotification.error("审核失败，" + res.message);
  await handleQuery();
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
    await TasksExamineControllerService.listTasksExamineByPageUsingPost({
      pageSize: queryParams.value.pageSize,
      current: queryParams.value.current,
      task_content: queryParams.value.task_content,
      user_id: queryParams.value.user_id as any,
      examine_user_id: queryParams.value.examine_user_id as any,
      is_accepted: queryParams.value.is_accepted as any,
      material_id: queryParams.value.material_id as any,
      points_value: queryParams.value.points_value as any,
      deadline: queryParams.value.deadline,
      publish_date: queryParams.value.publish_date,
      rule_id: queryParams.value.rule_id as any,
      update_date: queryParams.value.update_date,
    });
  loading.value = false;

  if (res.code === 0) {
    taskExamineList.value = res.data.records;
  } else ElMessage.error("查询失败，" + res.message);
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
  title.value = "添加审核任务";
};

/**
 * 表格中的按钮
 */
const curState = ref({
  id: 0,
  is_accepted: 0,
});
//审核
const handleEdit = (index: number, row: any) => {
  curState.value.id = row.id;
  curState.value.is_accepted = row.is_accepted;
  open.value = true;
  title.value = "审核";
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
#TaskExamineView {
}
</style>
