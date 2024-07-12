<template>
  <div id="TaskRecordsView">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="记录ID" prop="submission_id">
        <el-input
          v-model="queryParams.submission_id"
          placeholder="请输入记录ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="用户ID" prop="user_id">
        <el-input
          v-model="queryParams.user_id"
          placeholder="请输入用户ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="任务ID" prop="task_id">
        <el-input
          v-model="queryParams.task_id"
          placeholder="请输入任务ID"
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
    <el-table v-loading="loading" :data="taskSubmissionsList">
      <el-table-column label="ID" align="center" prop="submissionId" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="任务ID" align="center" prop="taskId" />
      <el-table-column
        label="任务状态"
        align="center"
        prop="task_status"
        :filters="filters"
        :filter-method="filterTag"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.task_status === '0' ? '' : 'success'"
            disable-transitions
            >{{ scope.row.task_status }}
          </el-tag>
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
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { debounce } from "../../../utils/debounce_Throttle";
import { ElPagination } from "element-plus";

//总数
const total = ref(0);
//是否加载
const loading = ref(true);
//显示搜索条件
const showSearch = ref(true);
//查询条件
const queryParams = ref({
  pageSize: 50,
  current: 1,
  submission_id: "",
  user_id: "",
  task_id: "",
});
//所有查询到的数据
const taskSubmissionsList = ref([]);

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

//分页触发事件
const pageHandleChange = (value: number) => {
  queryParams.value.current = value;
  handleQuery();
};

/**
 * 筛选框
 */
const filters = [
  { text: "正在进行", value: "0" },
  { text: "已完成", value: "1" },
];
const filterTag = (value: string, row: any) => {
  return row.userRole === value;
};
</script>

<style scoped>
#TaskRecordsView {
}
</style>
