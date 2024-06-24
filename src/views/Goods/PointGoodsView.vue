<template>
  <div id="PointGoodsView">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="商品名称" prop="product_name">
        <el-input
          v-model="queryParams.productName"
          placeholder="请输入商品名称"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="商品类型" prop="product_type">
        <el-input
          v-model="queryParams.productType"
          placeholder="请输入商品类型"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="商品积分" prop="price">
        <el-input
          v-model="queryParams.price"
          placeholder="请输入商品积分"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="商品库存" prop="stock_quantity">
        <el-input
          v-model="queryParams.stock_quantity"
          placeholder="请输入商品库存"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="上架时间" prop="shelf_time">
        <el-date-picker
          clearable
          v-model="queryParams.shelfTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择上架时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间" prop="update_time">
        <el-date-picker
          clearable
          v-model="queryParams.updateTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择更新时间"
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

    <!--    增删改操作-->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain size="default" @click="handleAdd"
          >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          size="default"
          :disabled="multiple"
          @click="onDeleteMore"
          >删除
        </el-button>
      </el-col>
    </el-row>
    <!--    表格-->
    <el-table
      v-loading="loading"
      :data="productsList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="商品ID" align="center" prop="product_id" />
      <el-table-column label="商品名称" align="center" prop="product_name" />
      <el-table-column label="商品图片" prop="product_Image">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.product_Image"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="[scope.row.product_Image]"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="商品详情"
        align="center"
        prop="product_description"
      />
      <el-table-column label="商品类型" align="center" prop="product_type" />
      <el-table-column label="商品积分" align="center" prop="price" />
      <el-table-column label="商品库存" align="center" prop="stock_quantity" />
      <el-table-column
        label="上架时间"
        align="center"
        prop="shelf_time"
        width="180"
      >
        <template #default="scope">
          <span>{{
            `${moment(scope.row.shelf_time).format(
              "YYYY年MM月DD日 HH时mm分ss秒"
            )}`
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="update_time"
        width="180"
      >
        <template #default="scope">
          <span>{{
            `${moment(scope.row.update_time).format(
              "YYYY年MM月DD日 HH时mm分ss秒"
            )}`
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="确定删除这个用户"
            @confirm="confirmEvent(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
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

    <!-- 添加或修改商品内容对话框 -->
    <el-dialog :title="title" v-model="open" width="600px" append-to-body>
      <el-form :model="form" :rules="rules" label-width="80px">
        <el-form-item label="商品名称" prop="productName">
          <el-input
            v-model="form.productName"
            placeholder="请输入商品名称"
            maxlength="30"
          />
        </el-form-item>
        <el-form-item label="商品描述" prop="productDescription">
          <el-input
            v-model="form.productDescription"
            placeholder="请输入商品描述"
            maxlength="30"
          />
        </el-form-item>
        <el-form-item label="商品类型" prop="productType">
          <el-input
            v-model="form.productType"
            placeholder="请输入商品类型"
            maxlength="30"
          />
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            limit="1"
          >
            <el-icon>
              <Plus />
            </el-icon>
            <template #file="{ file }">
              <div>
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file as any)"
                  >
                    <el-icon><zoom-in /></el-icon>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file as any)"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品积分" prop="price">
          <el-input-number v-model="form.price" size="large" maxlength="30" />
        </el-form-item>
        <el-form-item label="商品库存" prop="stockQuantity">
          <el-input-number
            v-model="form.stockQuantity"
            size="large"
            maxlength="30"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitFormDebounce"
            >确 定
          </el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { debounce } from "../../../utils/debounce_Throttle";
import { Delete, InfoFilled, Plus, ZoomIn } from "@element-plus/icons-vue";
import { ElMessage, UploadFile } from "element-plus";
import {
  type DeleteRequest,
  Products,
  ProductsControllerService,
  ProductsQueryRequest,
  UserControllerService,
} from "../../../generated";
import moment from "moment/moment";

//总数
const total = ref(50);
//是否加载
const loading = ref(true);
// 删除按钮禁用
const multiple = ref(true);
//显示搜索条件
const showSearch = ref(true);
//选中数组
const ids = ref<DeleteRequest[]>([]);
// 弹出层标题
const title = ref("");
//是否显示数据弹出层
const open = ref(false);
//查询条件
const queryParams = ref<ProductsQueryRequest>({
  pageSize: 50,
  current: 1,
  productName: "",
  productType: "",
  price: "" as any,
  stock_quantity: "" as any,
  shelfTime: "",
  updateTime: "",
});
//查询得到的数据
const productsList = ref<Products[]>([]);

//添加和编辑对话框中编写的要放入数据库中的form数据
const form = ref({
  productName: "",
  productDescription: "",
  productImage: "",
  productType: "",
  price: 0,
  stockQuantity: 0,
});

//表单重置
const reset = () => {
  form.value = {
    productName: "",
    productDescription: "",
    productImage: "",
    productType: "",
    price: 0,
    stockQuantity: 0,
  };
};
/**
 * 对话框
 */
//规则
const rules = ref({
  productName: [
    { required: true, message: "商品名称不能为空", trigger: "blur" },
  ],
  productType: [
    { required: true, message: "商品类型不能为空", trigger: "blur" },
  ],
  price: [{ required: true, message: "商品积分不能为空", trigger: "blur" }],
  stockQuantity: [
    { required: true, message: "商品库存不能为空", trigger: "blur" },
  ],
});
//提交
const submitForm = async () => {
  if (
    !form.value.productName ||
    !form.value.productType ||
    !form.value.price ||
    !form.value.stockQuantity
  ) {
    ElMessage.error("商品信息没填完整");
    return;
  }
  // 执行添加商品或者修改商品的操作
  if (title.value.includes("添加商品")) {
    const res = await ProductsControllerService.productsAddUsingPost(
      form.value as any
    );
    if (res.code === 0) {
      ElMessage.success("添加成功");
      await handleQuery();
    } else ElMessage.error("添加失败，" + res.message);
  } else {
    const updateRes = await ProductsControllerService.updateProductsUsingPost({
      price: form.value.price as any,
      productImage: form.value.productImage,
      product_description: form.value.productDescription,
      product_id: productsList.value[curEdit.value].product_id,
      product_name: form.value.productName,
      product_type: form.value.productType,
      stock_quantity: form.value.stockQuantity as any,
    });
    if (updateRes.code === 0) {
      ElMessage.success("修改成功");
      await handleQuery();
    } else ElMessage.error("删除失败，" + updateRes.message);
  }
  open.value = false;
  reset();
};
const submitFormDebounce = debounce(submitForm, 300); //防抖
//取消
const cancel = () => {
  open.value = false;
  reset();
};

//查询数据
const handleQuery = async () => {
  loading.value = true;
  const res = await ProductsControllerService.listProductsByPageUsingPost(
    queryParams.value
  );
  loading.value = false;
  if (res.code === 0) {
    productsList.value = res.data.records;
    total.value = res.data.total;
  } else ElMessage.error("请求失败，" + res.message);
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
    productName: "",
    productType: "",
    price: "" as any,
    stock_quantity: "" as any,
    shelfTime: "",
    updateTime: "",
  };
  handleQueryDebounce();
};

/**
 * 增加和多个数据删除按钮
 */
//增加
const handleAdd = () => {
  reset();
  open.value = true;
  title.value = "添加商品";
};

/**
 * 表格内操作
 * 编辑和删除操作
 * @param index
 * @param row
 */
const curEdit = ref(0);
const handleEdit = (index: number, row: any) => {
  form.value = {
    productName: productsList.value[index].product_name as any,
    productDescription: productsList.value[index].product_description as any,
    productImage: productsList.value[index].product_Image as any,
    productType: productsList.value[index].product_type as any,
    price: productsList.value[index].price as any,
    stockQuantity: productsList.value[index].stock_quantity as any,
  };
  curEdit.value = index;
  open.value = true;
  title.value = `修改${productsList.value[index].product_name}的信息`;
};
const onDelete = async (index: number, row: any) => {
  const res = await ProductsControllerService.deleteProductsUsingPost({
    id: productsList.value[index].product_id,
  });
  if (res.code === 0) {
    ElMessage.success("成功删除");
    await handleQuery();
  } else ElMessage.error("删除失败，" + res.message);
};
const confirmEvent = (index: number, row: any) => {
  onDelete(index, row);
};
watch(
  () => ids.value.length,
  () => {
    if (ids.value.length) multiple.value = false;
    else multiple.value = true;
  }
);
/*删除多行数据*/
const onDeleteMore = async () => {
  const res = await ProductsControllerService.deleteProductsMoreUsingPost(
    ids.value
  );
  if (res.code === 0) {
    ElMessage.success("删除成功");
    await handleQuery();
  } else ElMessage.error("删除失败，" + res.message);
  ids.value = [];
};
/**
 * 初始化表单
 */
const handleSelectionChange = (selection: any) => {
  //拿到选中的行的传递的数组信息selection，将数组selection中的product_id传给ids
  ids.value = [];
  for (let i = 0; i < selection.length; ++i)
    ids.value.push({
      id: selection[i].product_id,
    });
};

/**
 * 图片文件处理
 */
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);

const handleRemove = (file: UploadFile) => {
  console.log(file);
};
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};
</script>

<style scoped>
#PointGoodsView {
}

/*tip:防止图片预览与表格冲突，图层上的冲突*/
::v-deep .el-table__cell {
  position: static !important;
}
</style>
