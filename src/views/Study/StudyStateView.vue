<template>
  <div id="StudyStateView">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="用户" prop="user_id">
        <el-input
          v-model="queryParams.user_id"
          placeholder="请输入用户ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="资料ID" prop="material_id">
        <el-input
          v-model="queryParams.material_id"
          placeholder="请输入资料ID"
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
    <el-table v-loading="loading" stripe border :data="courseSubmissionsList">
      <el-table-column label="ID" align="center" prop="submissionId" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="资料ID" align="center" prop="materialId" />
      <el-table-column
        label="课程学习状态"
        align="center"
        prop="course_status"
        :filters="filters"
        :filter-method="filterTag"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.course_status === '0' ? '' : 'success'"
            disable-transitions
            >{{ scope.row.course_status }}
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

//总数
const total = ref(0);
//是否进入加载状态
const loading = ref(true);
//显示搜索条件
const showSearch = ref(true);
//查询条件
const queryParams = ref({
  pageSize: 50,
  current: 1,
  user_id: "",
  material_id: "",
});
//查询到的数据
const courseSubmissionsList = ref([]);

//查询
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
  return row.course_status === value;
};
</script>

<style scoped>
#StudyStateView {
}
</style>
