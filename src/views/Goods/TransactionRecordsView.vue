<template>
  <div id="TransactionRecordsView">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="用户ID" prop="user_id">
        <el-input
          v-model="queryParams.user_id"
          placeholder="请输入用户ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="商品ID" prop="product_id">
        <el-input
          v-model="queryParams.product_id"
          placeholder="请输入商品ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="交易数量" prop="transaction_quantity">
        <el-input
          v-model="queryParams.transaction_quantity"
          placeholder="请输入交易数量"
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
    <el-table v-loading="loading" :data="transactionsList">
      <el-table-column label="ID" align="center" prop="transactionsId" />
      <el-table-column label="用户" align="center" prop="userId" />
      <el-table-column label="商品ID" align="center" prop="productId" />
      <el-table-column
        label="交易数量"
        align="center"
        prop="transactionQuantity"
      />
      <el-table-column
        label="交易时间"
        align="center"
        prop="transactionTime"
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
//显示搜索条件
const showSearch = ref(true);
//查询条件
const queryParams = ref({
  pageSize: 50,
  current: 1,
  user_id: "",
  product_id: "",
  transaction_quantity: "",
});
//查询得到的数据
const transactionsList = ref([]);

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
#TransactionRecordsView {
}
</style>
