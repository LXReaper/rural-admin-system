<template>
  <div id="TaskRecordsView">
    <div class="searchBar">
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        v-show="showSearch"
        label-width="68px"
      >
        <el-form-item label="记录编号" prop="submission_id">
          <el-input
            v-model="queryParams.submission_id"
            placeholder="请输入记录编号"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="用户" prop="user_name">
          <el-input
            v-model="queryParams.user_name"
            placeholder="请输入用户名"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="任务编号" prop="task_id">
          <el-input
            v-model="queryParams.task_id"
            placeholder="请输入任务编号"
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
    </div>

    <div class="mainView">
      <!--    表格-->
      <el-table
        size="small"
        v-loading="loading"
        :data="taskSubmissionsList"
        :header-cell-style="{
          backgroundColor: '#E5EEFF',
          color: '#333',
          height: '5vh',
        }"
        stripe
      >
        <el-table-column label="编号" align="center" prop="submission_id" />
        <el-table-column label="任务" align="center" prop="task_id" />
        <el-table-column label="用户" align="center" prop="user_name" />
        <el-table-column label="任务状态" align="center" prop="task_status">
          <template #default="scope">
            <el-tag :type="scope.row.task_status === 0 ? 'warning' : 'success'"
              >{{ scope.row.task_status === 0 ? "正在进行" : "已完成" }}
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
  </div>
  <footer-layout />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { debounce } from "../../../utils/debounce_Throttle";
import { ElMessage, ElPagination } from "element-plus";
import { TaskSubmissionsControllerService } from "../../../generated/services/TaskSubmissionsControllerService";
import FooterLayout from "@/layout/footerLayout.vue";

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
  user_name: "",
  task_id: "",
});
//所有查询到的数据
const taskSubmissionsList = ref([]);

//查询数据
const handleQuery = async () => {
  loading.value = true;
  const res =
    await TaskSubmissionsControllerService.listTaskSubmissionsVOByPageUsingPost(
      {
        pageSize: queryParams.value.pageSize,
        current: queryParams.value.current,
        submissionId: queryParams.value.submission_id as any,
        user_name: queryParams.value.user_name,
        taskId: queryParams.value.task_id as any,
      }
    );
  loading.value = false;
  if (res.code === 0) {
    taskSubmissionsList.value = res.data.records;
    total.value = res.data.total;
  } else ElMessage.error("任务状态信息加载失败，" + res.message);
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
</script>

<style scoped>
#TaskRecordsView {
  background-color: #f0f2f5;
  padding: 1vh 1vw;
}
/*搜索栏*/
.searchBar {
  background-color: white;
  padding: 2vh 0.5vw 0 0.5vw;
  margin-bottom: 2vh;
}

/*主要内容窗口*/
.mainView {
  background-color: white;
  padding: 2vh 1.5vw 0 1.5vw;
  margin-bottom: 2vh;
}
</style>
