<template>
  <div id="CheckInRecordsView">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="ID" prop="check_ID">
        <el-input
          v-model="queryParams.check_ID"
          placeholder="请输入ID"
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
      <el-form-item label="签到积分" prop="check_in_points">
        <el-input
          v-model="queryParams.check_in_points"
          placeholder="请输入签到积分"
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
    <el-table v-loading="loading" :data="insList">
      <el-table-column label="ID" align="center" prop="checkId" />
      <el-table-column
        label="签到日期"
        align="center"
        prop="checkInDate"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="签到积分" align="center" prop="checkInPoints" />
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
//查询条件
const queryParams = ref({
  pageSize: 50,
  current: 1,
  check_ID: "",
  user_id: "",
  check_in_points: "",
});
//所有查询到的数据
const insList = ref([]);

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
#CheckInRecordsView {
}
</style>
