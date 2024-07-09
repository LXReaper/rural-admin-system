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
          v-model="queryParams.userId"
          placeholder="请输入用户ID"
          clearable
          @keydown.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="订单ID" prop="transactionsId">
        <el-input
          v-model="queryParams.transactionsId"
          placeholder="请输入订单ID"
          clearable
          @keydown.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="商品ID" prop="productId">
        <el-input
          v-model="queryParams.productId"
          placeholder="请输入商品ID"
          clearable
          @keydown.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="交易状态" prop="transaction_status">
        <el-select
          v-model="queryParams.transaction_status"
          placeholder="请选择订单的状态"
          @change="handleQuery"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in [
              { value: '', label: '所有' },
              { value: 0, label: '正在交易' },
              { value: 1, label: '交易已完成' },
            ]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="handleQueryDebounce"
          >搜索
        </el-button>
        <el-button size="default" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!--    表格-->
    <el-table v-loading="loading" stripe border :data="transactionsList">
      <el-table-column label="订单ID" align="center" prop="transactions_Id" />
      <el-table-column label="交易用户" align="center" prop="villager_name" />
      <el-table-column label="商品" align="center" prop="product_id">
        <template #default="scope">
          <el-button
            type="text"
            v-if="scope.row.product_id"
            style="text-decoration: underline"
            @click="openProductIdDetail(scope.row)"
            >显示商品
          </el-button>
          <!--          <span v-for="(item, i) in scope.row.product_id" :key="i">-->
          <!--            <el-tag-->
          <!--              type="primary"-->
          <!--              :hit="true"-->
          <!--              style="cursor: pointer"-->
          <!--              round-->
          <!--              @click="openProductDetail(scope.row, i as number)"-->
          <!--              >{{ item }}-->
          <!--            </el-tag>-->
          <!--          </span>-->
        </template>
      </el-table-column>
      <el-table-column
        label="交易状态"
        align="center"
        prop="transaction_status"
      >
        <template #default="scope">
          <span v-if="!scope.row.transaction_status">
            <el-tag type="warning" round>正在进行</el-tag>
          </span>
          <span v-else-if="scope.row.transaction_status">
            <el-tag type="success" round>完成交易</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="交易时间"
        align="center"
        prop="transaction_time"
        width="180"
      >
        <template #default="scope">
          <span>{{
            moment(scope.row.transaction_time).format(
              "YYYY年MM月DD日 HH时mm分ss秒"
            )
          }}</span>
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

    <!--    展示商品id详情的对话框-->
    <el-dialog v-model="isOpenProductIdDetail" draggable append-to-body>
      <el-descriptions
        :title="'商品编号详情'"
        :extra="'点击编号可以展示商品详细信息'"
        direction="vertical"
        :column="4"
        :size="'default'"
        border
      >
        <el-descriptions-item label="商品编号">
          <span v-for="(item, i) in curTransactionsVO.product_id" :key="i">
            <el-tag
              type="primary"
              style="cursor: pointer"
              @click="openProductDetail(curTransactionsVO, i as number)"
              round
              effect="plain"
              :hit="true"
              ><text style="text-decoration: underline">{{ item }}</text>
            </el-tag>
          </span>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
    <!--    展示商品详情的对话框-->
    <el-dialog v-model="isOpenProductDetail" draggable append-to-body>
      <el-descriptions
        :title="'商品详情'"
        direction="vertical"
        :column="4"
        :size="'default'"
        border
      >
        <el-descriptions-item label="商品编号"
          >{{ productDetail.product_id }}
        </el-descriptions-item>
        <el-descriptions-item label="商品名字" :span="3"
          >{{ productDetail.product_name }}
        </el-descriptions-item>
        <el-descriptions-item label="商品类型">
          <el-tag type="primary" round
            >{{ productDetail.product_type }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="商品库存">
          <el-tag type="success" round
            >{{ productDetail.stock_quantity }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="购买数量">
          <el-tag type="primary" round
            >{{ productDetail.transaction_quantity }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="商品价格">
          <el-space direction="horizontal">
            <el-tag type="danger" round>{{ productDetail.price }}</el-tag>
            <text>分</text>
          </el-space>
        </el-descriptions-item>
        <el-descriptions-item label="商品图片">
          <el-image
            style="width: 100px; height: 100px"
            :src="productDetail.product_Image"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="[productDetail.product_Image]"
            fit="cover"
          />
        </el-descriptions-item>
        <el-descriptions-item label="商品描述" :span="3">
          {{ productDetail.product_description }}
        </el-descriptions-item>
        <el-descriptions-item label="商品上架时间">
          <el-tag type="primary" round
            >{{
              moment(productDetail.shelf_time).format(
                "YYYY年MM月DD日 HH时mm分ss秒"
              )
            }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="商品更新时间">
          <el-tag type="primary" round
            >{{
              moment(productDetail.update_time).format(
                "YYYY年MM月DD日 HH时mm分ss秒"
              )
            }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { debounce } from "../../../utils/debounce_Throttle";
import {
  Products,
  TransactionsControllerService,
  TransactionsQueryRequest,
} from "../../../generated";
import { ElMessage } from "element-plus";
import moment from "moment";
import { TransactionsVO } from "../../../generated/models/TransactionsVO";

//总数
const total = ref(50);
//是否加载
const loading = ref(true);
//显示搜索条件
const showSearch = ref(true);
//查询条件
const queryParams = ref<TransactionsQueryRequest>({
  pageSize: 50,
  current: 1,
  userId: "" as any,
  productId: "" as any,
  transaction_status: "" as any,
  transactionsId: "" as any,
});
//查询得到的数据
const transactionsList = ref([]);

/**
 * 商品详情
 */
//是否打开商品详情对话框
const isOpenProductDetail = ref(false);
//商品详情中的数据
const productDetail = ref({
  product_id: "",
  product_name: "",
  product_type: "",
  product_description: "",
  transaction_quantity: "",
  price: "",
  stock_quantity: "",
  product_Image: "",
  shelf_time: "",
  update_time: "",
});

//查询数据
const handleQuery = async () => {
  loading.value = true;
  const res =
    await TransactionsControllerService.listTransactionsByPageUsingPost({
      pageSize: queryParams.value.pageSize,
      current: queryParams.value.current,
      userId: queryParams.value.userId,
      productId: [parseInt(queryParams.value.productId as any)],
      transaction_status: queryParams.value.transaction_status,
      transactionsId: queryParams.value.transactionsId,
    });
  loading.value = false;
  if (res.code === 0) {
    transactionsList.value = res.data.records;
  } else ElMessage.error("订单信息请求失败，" + res.message);
};
const handleQueryDebounce = debounce(handleQuery, 500);
onMounted(() => {
  handleQuery();
});
//重置
const resetQuery = () => {
  console.log();
};
/**
 * 打开表格中标签内容的详情信息
 */
const curTransactionsVO = ref();
const isOpenProductIdDetail = ref(false);
//打开商品id详情
const openProductIdDetail = (transactionsVO: any) => {
  isOpenProductIdDetail.value = true;
  curTransactionsVO.value = transactionsVO;
};
//打开商品的具体详情信息
const openProductDetail = (transactionsVO: any, i: number) => {
  cancelProductDetail(); //先重置信息
  console.log(transactionsVO);
  const product = transactionsVO?.productsList[i];
  const transaction_quantity = transactionsVO?.transaction_quantity[i];
  productDetail.value = {
    product_id: product.product_id as any,
    product_name: product.product_name as any,
    product_type: product.product_type as any,
    product_description: product.product_description as any,
    transaction_quantity: transaction_quantity as any,
    price: product.price as any,
    stock_quantity: product.stock_quantity as any,
    product_Image: product.product_Image as any,
    shelf_time: product.shelf_time as any,
    update_time: product.update_time as any,
  };
  isOpenProductDetail.value = true;
};
//关闭商品详情信息
const cancelProductDetail = () => {
  isOpenProductDetail.value = false;
  productDetail.value = {
    product_id: "",
    product_name: "",
    product_type: "",
    product_description: "",
    transaction_quantity: "",
    price: "",
    stock_quantity: "",
    product_Image: "",
    shelf_time: "",
    update_time: "",
  };
};
</script>

<style scoped>
#TransactionRecordsView {
}
</style>
