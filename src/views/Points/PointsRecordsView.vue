<template>
  <div id="PointsRecordsView">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="居民" prop="user_id">
        <el-input
          v-model="queryParams.user_name"
          placeholder="请输入用户名"
          size="default"
          clearable
          @keydown.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="总积分" prop="total_points">
        <el-input
          v-model="queryParams.total_points"
          placeholder="请输入总积分"
          size="default"
          clearable
          @keydown.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="剩余积分" prop="remaining_points">
        <el-input
          v-model="queryParams.remaining_points"
          placeholder="请输入剩余积分"
          size="default"
          clearable
          @keydown.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="是否结算" prop="is_Settled">
        <el-select
          v-model="queryParams.is_Settled"
          placeholder="请选择结算状态"
          @change="handleQueryDebounce"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in [
              { value: '', label: '所有' },
              { value: 0, label: '未结算' },
              { value: 1, label: '已结算' },
            ]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
        <el-button type="primary" size="default" @click="handleQueryDebounce"
          >搜索
        </el-button>
        <el-button size="default" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <!--    表格-->
    <el-table v-loading="loading" :data="pointsList">
      <el-table-column label="编号" align="center" prop="point_id" />
      <el-table-column label="用户" align="center" prop="user_name" />
      <el-table-column label="总积分" align="center" prop="total_points">
        <template #default="scope">
          <el-tag>{{ scope.row.total_points }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="剩余积分" align="center" prop="remaining_points">
        <template #default="scope">
          <el-tag
            :type="`${
              scope.row.remaining_points / scope.row.total_points >= 0.2
                ? 'success'
                : 'danger'
            }`"
          >
            {{ scope.row.remaining_points }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否结算" align="center" prop="is_Settled">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.is_Settled">已结算</el-tag>
          <el-tag type="warning" v-else>未结算</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="开始日期"
        align="center"
        prop="start_date"
        width="180"
      >
        <template #default="scope">
          <span>{{
            moment(scope.row.start_date).format("YYYY年MM月DD日 HH时mm分ss秒")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="结算日期"
        align="center"
        prop="settlement_date"
        width="180"
      >
        <template #default="scope">
          <span v-if="scope.row.settlement_date">{{
            moment(scope.row.settlement_date).format(
              "YYYY年MM月DD日 HH时mm分ss秒"
            )
          }}</span>
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
import { PointsControllerService } from "../../../generated";
import { ElMessage, ElPagination } from "element-plus";
import moment from "moment";

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
  user_name: "",
  total_points: "",
  remaining_points: "",
  settlement_date: "",
  is_Settled: "",
});
//后端获取的表格数据
const pointsList = ref([]);
/**
 * 表单操作
 */
//查询
const handleQuery = async () => {
  loading.value = true;
  const res = await PointsControllerService.listPointsVoByPageUsingPost({
    current: queryParams.value.current,
    pageSize: queryParams.value.pageSize,
    remaining_points: queryParams.value.remaining_points as any,
    total_points: queryParams.value.total_points as any,
    user_name: queryParams.value.user_name,
    is_Settled: queryParams.value.is_Settled as any,
  });
  loading.value = false;
  if (res.code === 0) {
    pointsList.value = res.data.records;
    total.value = res.data.total;
  } else ElMessage.error("积分信息加载失败");
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
    user_name: "",
    total_points: "",
    remaining_points: "",
    settlement_date: "",
    is_Settled: "",
  };
  handleQueryDebounce();
};

//分页触发事件
const pageHandleChange = (value: number) => {
  queryParams.value.current = value;
  handleQuery();
};
</script>

<style scoped>
#PointsRecordsView {
}
</style>
