<template>
  <div id="TaskInfoView">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="任务ID" prop="task_id">
        <el-input
          v-model="queryParams.taskId"
          placeholder="请输入任务ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="任务内容" prop="task_content">
        <el-input
          v-model="queryParams.taskContent"
          placeholder="请输入任务内容"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="资料ID" prop="material_id">
        <el-input
          v-model="queryParams.materialId"
          placeholder="请输入资料ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="规则ID" prop="rule_id">
        <el-input
          v-model="queryParams.ruleId"
          placeholder="请输入规则ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="发布用户" prop="user_id">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入发布用户ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="更新用户" prop="updated_user_id">
        <el-input
          v-model="queryParams.updatedUserId"
          placeholder="请输入更新用户ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="积分数值" prop="points_value">
        <el-input
          v-model="queryParams.pointsValue"
          placeholder="请输入积分数值"
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

    <!--    表格-->
    <el-table v-loading="loading" :data="tasksList">
      <el-table-column label="任务ID" align="center" prop="task_id" />
      <el-table-column label="任务内容" align="center" prop="task_content" />
      <el-table-column label="资料ID" align="center" prop="material_id" />
      <el-table-column label="规则ID" align="center" prop="rule_id" />
      <el-table-column label="发布用户ID" align="center" prop="user_id" />
      <el-table-column
        label="发布日期"
        align="center"
        prop="publish_date"
        width="180"
      >
        <template #default="scope">
          <span>{{
            moment(scope.row.publish_date).format("YYYY年MM月DD日HH时mm分ss秒")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新用户ID"
        align="center"
        prop="updated_user_id"
      />
      <el-table-column
        label="更新日期"
        align="center"
        prop="update_date"
        width="180"
      >
        <template #default="scope">
          <span>{{
            moment(scope.row.update_date).format("YYYY年MM月DD日HH时mm分ss秒")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="截止日期"
        align="center"
        prop="deadline"
        width="180"
      >
        <template #default="scope">
          <span>{{
            moment(scope.row.deadline).format("YYYY年MM月DD日HH时mm分ss秒")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="积分数值" align="center" prop="points_value" />
    </el-table>

    <!--    &lt;!&ndash;    分页&ndash;&gt;-->
    <!--    <el-pagination-->
    <!--      v-show="total > 0"-->
    <!--      :total="total"-->
    <!--      :page="queryParams.current"-->
    <!--      :limit="queryParams.pageSize"-->
    <!--    />-->
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { debounce } from "../../../utils/debounce_Throttle";
import { TasksControllerService } from "../../../generated";
import moment from "moment";
import { ElMessage } from "element-plus";

//总数
const total = ref(50);
//是否加载
const loading = ref(true);
//显示搜索条件
const showSearch = ref(true);
//查询条件
const queryParams = ref({
  pageSize: 50,
  current: 1,
  taskId: "" as any,
  taskContent: "",
  materialId: "" as any,
  ruleId: "" as any,
  userId: "" as any,
  updatedUserId: "" as any,
  pointsValue: "" as any,
});
//所有查询到的数据
const tasksList = ref([]);

//查询数据
const handleQuery = async () => {
  loading.value = true;
  const res = await TasksControllerService.listTasksByPageUsingPost(
    queryParams.value
  );
  loading.value = false;
  if (res.code === 0) {
    tasksList.value = res.data.records;
  } else ElMessage.error("查询失败，" + res.message);
};
const handleQueryDebounce = debounce(handleQuery, 500);
onMounted(() => {
  handleQuery();
});
//重置
const resetQuery = () => {
  queryParams.value.taskId = "";
  queryParams.value.taskContent = "";
  queryParams.value.materialId = "";
  queryParams.value.ruleId = "";
  queryParams.value.userId = "";
  queryParams.value.updatedUserId = "";
  queryParams.value.pointsValue = "";
};
</script>

<style scoped>
#TaskInfoView {
}
</style>
