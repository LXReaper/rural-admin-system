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
          v-model="queryParams.task_id"
          placeholder="请输入任务ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="任务内容" prop="task_content">
        <el-input
          v-model="queryParams.task_content"
          placeholder="请输入任务内容"
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
      <el-form-item label="规则ID" prop="rule_id">
        <el-input
          v-model="queryParams.rule_id"
          placeholder="请输入规则ID"
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
      <el-form-item label="积分数值" prop="points_value">
        <el-input
          v-model="queryParams.points_value"
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
      <el-table-column label="任务ID" align="center" prop="taskId" />
      <el-table-column label="任务内容" align="center" prop="taskContent" />
      <el-table-column label="资料ID" align="center" prop="materialId" />
      <el-table-column label="规则ID" align="center" prop="ruleId" />
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
      <el-table-column
        label="截止日期"
        align="center"
        prop="deadline"
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
      <el-table-column label="积分数值" align="center" prop="pointsValue" />
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
//是否加载
const loading = ref(true);
//显示搜索条件
const showSearch = ref(true);
//查询条件
const queryParams = ref({
  pageSize: 50,
  current: 1,
  task_id: "",
  task_content: "",
  material_id: "",
  rule_id: "",
  user_id: "",
  updated_user_id: "",
  points_value: "",
});
//所有查询到的数据
const tasksList = ref([]);

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
</script>

<style scoped>
#TaskInfoView {
}
</style>
