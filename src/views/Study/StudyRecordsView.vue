<template>
  <div id="StudyRecordsView">
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
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="资料ID" prop="material_id">
        <el-input
          v-model="queryParams.material_id"
          placeholder="请输入资料ID"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="完成次数" prop="completion_count">
        <el-input
          v-model="queryParams.completion_count"
          placeholder="请输入完成次数"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="handleQuery"
          >搜索
        </el-button>
        <el-button size="default" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!--    表格-->
    <el-table v-loading="loading" :data="learningCoursesList">
      <el-table-column label="ID" align="center" prop="learningCoursesId" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="资料ID" align="center" prop="materialId" />
      <el-table-column label="完成次数" align="center" prop="completionCount" />
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

//总数
const total = ref(50);
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
  completion_count: "",
});
//查询到的数据
const learningCoursesList = ref([]);

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
</script>

<style scoped>
#StudyRecordsView {
}
</style>
