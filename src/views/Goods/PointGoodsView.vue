<template>
  <div id="PointGoodsView">
    <div class="searchBar">
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
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="商品类型" prop="product_type">
          <el-input
            v-model="queryParams.productType"
            placeholder="请输入商品类型"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="用户名" prop="user_name">
          <el-input
            v-model="queryParams.user_name"
            placeholder="请输入上架商品的用户名"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="商品积分" prop="price">
          <el-input
            v-model="queryParams.price"
            placeholder="请输入商品积分数"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="商品库存" prop="stock_quantity">
          <el-input
            v-model="queryParams.stock_quantity"
            placeholder="请输入商品库存数"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="是否上架" prop="shelf_status">
          <el-select
            v-model="queryParams.shelf_status"
            placeholder="是否上架"
            size="default"
            style="width: 240px"
            @change="handleQueryDebounce"
          >
            <el-option
              v-for="item in [
                {
                  value: 0,
                  label: '未上架',
                },
                {
                  value: 1,
                  label: '已上架',
                },
              ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上架时间" prop="shelf_time">
          <el-date-picker
            clearable
            v-model="queryParams.shelfTime"
            value-format="YYYY-MM-DD HH:mm:ss"
            type="datetime"
            placeholder="请选择上架时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间" prop="update_time">
          <el-date-picker
            clearable
            v-model="queryParams.updateTime"
            value-format="YYYY-MM-DD HH:mm:ss"
            type="datetime"
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
    </div>

    <div class="mainView">
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
        size="small"
        v-loading="loading"
        :data="productsList"
        :header-cell-style="{
          backgroundColor: '#E5EEFF',
          color: '#333',
          height: '5vh',
        }"
        @selection-change="handleSelectionChange"
        stripe
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
        <el-table-column label="商品类型" align="center" prop="product_type">
          <template #default="scope">
            <el-space
              direction="vertical"
              v-for="(item, i) in scope.row.product_type"
              :key="i"
            >
              <el-tag type="primary" round>{{ item }}</el-tag>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column label="商品积分" align="center" prop="price">
          <template #default="scope">
            <el-tag type="danger" round>{{ scope.row.price }}</el-tag>
            分
          </template>
        </el-table-column>
        <el-table-column label="商品库存" align="center" prop="stock_quantity">
          <template #default="scope">
            <el-tag type="success" round>{{ scope.row.stock_quantity }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="商品购买量"
          align="center"
          prop="consumption_Num"
        >
          <template #default="scope">
            <el-tag type="warning" round>{{
              scope.row.consumption_Num
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="用户名" align="center" prop="user_name" />
        <el-table-column label="是否上架" align="center" prop="shelf_status">
          <template #default="scope">
            <el-switch
              :model-value="scope.row.shelf_status === 1"
              inline-prompt
              active-text="上架"
              inactive-text="下架"
              @change="
              (val: boolean) => {
                productsList[scope.$index].shelf_status = val ? 1 : 0;
                handleEdit(scope.$index, scope.row, 'one');
              }
            "
            />
          </template>
        </el-table-column>
        <el-table-column
          label="上架时间"
          align="center"
          prop="shelf_time"
          show-overflow-tooltip
          width="180"
        >
          <template #default="scope">
            <span style="white-space: nowrap">{{
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
          show-overflow-tooltip
          width="180"
        >
          <template #default="scope">
            <span style="white-space: nowrap">{{
              `${moment(scope.row.update_time).format(
                "YYYY年MM月DD日 HH时mm分ss秒"
              )}`
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row, 'all')"
            >
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
              v-model="curProductType"
              @keydown.enter="
                () => {
                  form.productType.push(curProductType);
                  curProductType = '';
                }
              "
              @keydown.delete="
                () => {
                  form.productType.pop();
                }
              "
              placeholder="请输入商品类型"
              maxlength="30"
              size="large"
            >
              <template #prefix>
                <div v-for="(type, i) in form.productType" :key="i">
                  <div style="margin-left: 0.1vw">
                    <el-tag type="primary">{{ type }}</el-tag>
                  </div>
                </div>
              </template>
            </el-input>
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
          <el-form-item label="是否上架" prop="shelf_status">
            <el-switch
              :model-value="form.shelf_status === 1"
              inline-prompt
              active-text="上架"
              inactive-text="下架"
              @change="(val: boolean) => form.shelf_status = val ? 1 : 0"
            />
          </el-form-item>
          <el-form-item label="商品积分" prop="price">
            <el-input-number
              v-model="form.price"
              :step="0.1"
              size="large"
              maxlength="30"
            />
          </el-form-item>
          <el-form-item label="商品库存" prop="stockQuantity">
            <el-input-number
              v-model="form.stockQuantity"
              :step="1"
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
  </div>
  <footer-layout />
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { debounce } from "../../../utils/debounce_Throttle";
import { Delete, InfoFilled, Plus, ZoomIn } from "@element-plus/icons-vue";
import { ElMessage, ElPagination, UploadFile } from "element-plus";
import {
  type DeleteRequest,
  Products,
  ProductsControllerService,
  ProductsQueryRequest,
  UserControllerService,
} from "../../../generated";
import moment from "moment/moment";
import { ANNOUNCEMENT_TYPE } from "@/defaultData/DefaultData";
import FooterLayout from "@/layout/footerLayout.vue";

//总数
const total = ref(0);
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
  user_name: "",
  shelf_status: "" as any,
});
//查询得到的数据
const productsList = ref<Products[]>([]);

//添加和编辑对话框中编写的要放入数据库中的form数据
const form = ref({
  productName: "",
  productDescription: "",
  productImage: "",
  productType: [],
  price: 0,
  stockQuantity: 0,
  shelf_status: 0,
});
const curProductType = ref("");

//表单重置
const reset = () => {
  form.value = {
    productName: "",
    productDescription: "",
    productImage: "",
    productType: [],
    price: 0,
    stockQuantity: 0,
    shelf_status: 0,
  };
  curProductType.value = "";
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
  productDescription: [
    { required: true, message: "商品描述不能为空", trigger: "blur" },
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
      product_Image: form.value.productImage,
      product_description: form.value.productDescription,
      product_id: productsList.value[curEdit.value].product_id,
      product_name: form.value.productName,
      product_type: form.value.productType,
      stock_quantity: form.value.stockQuantity as any,
      shelf_status: form.value.shelf_status,
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
  const res = await ProductsControllerService.listProductsVoByPageUsingPost(
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
    shelf_status: "" as any,
  };
  handleQueryDebounce();
};
//分页触发事件
const pageHandleChange = (value: number) => {
  queryParams.value.current = value;
  handleQuery();
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
 * @param type 如果是all则表示编辑所有，one则表示编辑一个
 */
const curEdit = ref(0);
const handleEdit = (index: number, row: any, type: string) => {
  form.value = {
    productName: productsList.value[index].product_name as any,
    productDescription: productsList.value[index].product_description as any,
    productImage: productsList.value[index].product_Image as any,
    productType: productsList.value[index].product_type as any,
    price: productsList.value[index].price as any,
    stockQuantity: productsList.value[index].stock_quantity as any,
    shelf_status: productsList.value[index].shelf_status as any,
  };
  curEdit.value = index;
  if (type === "all") open.value = true;
  title.value = `修改${productsList.value[index].product_name}的信息`;
  if (type !== "all") {
    //单个数据修改则直接提交
    submitForm();
  }
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
  background-color: #f0f2f5;
  padding: 1vh 1vw;
}

/*搜索栏*/
.searchBar {
  background-color: white;
  padding: 2vh 1vw 0 7vw;
  margin-bottom: 2vh;
}

/*主要内容窗口*/
.mainView {
  background-color: white;
  padding: 2vh 1.5vw 0 1.5vw;
  margin-bottom: 2vh;
}

/*tip:防止图片预览与表格冲突，图层上的冲突*/
::v-deep .el-table__cell {
  position: static !important;
}
</style>
