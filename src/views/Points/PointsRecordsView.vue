<template>
  <div id="PointsRecordsView">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="居民ID" prop="user_id">
        <el-input
          v-model="queryParams.user_id"
          placeholder="请输入用户ID"
          size="default"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总积分" prop="total_points">
        <el-input
          v-model="queryParams.total_points"
          placeholder="请输入总积分"
          size="default"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="剩余积分" prop="remaining_points">
        <el-input
          v-model="queryParams.remaining_points"
          placeholder="请输入剩余积分"
          size="default"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="结算日期" prop="settlement_date">
        <el-date-picker
          clearable
          v-model="queryParams.settlement_date"
          size="default"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择结算日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="handleQuery"
          >搜索
        </el-button>
        <el-button size="default" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <!--    表格-->
    <el-table v-loading="loading" :data="pointsList">
      <el-table-column label="ID" align="center" prop="pointId" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="总积分" align="center" prop="totalPoints" />
      <el-table-column label="剩余积分" align="center" prop="remainingPoints" />
      <el-table-column
        label="结算日期"
        align="center"
        prop="settlementDate"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row }}</span>
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
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { debounce } from "../../../utils/debounce_Throttle";

//总数
const total = ref(50);
//是否加载
const loading = ref(true);
// 显示搜索条件
const showSearch = ref(true);
//查询的内容
const queryParams = ref({
  pageSize: 50,
  current: 1,
  user_id: "",
  total_points: "",
  remaining_points: "",
  settlement_date: "",
});
//后端获取的表格数据
const pointsList = ref([]);
/**
 * 表单操作
 */
//查询
const handleQuery = () => {
  loading.value = true;
  const res = null;
  loading.value = false;
  console.log();
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
    user_id: "",
    total_points: "",
    remaining_points: "",
    settlement_date: "",
  };
  handleQueryDebounce();
};
</script>

<style scoped>
#PointsRecordsView {
}
</style>
