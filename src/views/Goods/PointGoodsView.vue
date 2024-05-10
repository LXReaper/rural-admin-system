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
          v-model="queryParams.product_name"
          placeholder="请输入商品名称"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="商品类型" prop="product_type">
        <el-input
          v-model="queryParams.product_type"
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
          v-model="queryParams.shelf_time"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择上架时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间" prop="update_time">
        <el-date-picker
          clearable
          v-model="queryParams.update_time"
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
        <el-button type="danger" plain size="default" :disabled="multiple"
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
      <el-table-column label="商品ID" align="center" prop="productId" />
      <el-table-column label="商品名称" align="center" prop="productName" />
      <el-table-column
        label="商品详情"
        align="center"
        prop="productDescription"
      />
      <el-table-column label="商品类型" align="center" prop="productType" />
      <el-table-column label="商品积分" align="center" prop="price" />
      <el-table-column label="商品库存" align="center" prop="stockQuantity" />
      <el-table-column
        label="上架时间"
        align="center"
        prop="shelfTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row }}</span>
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
        <el-form-item label="商品名称" prop="product_name">
          <el-input
            v-model="form.product_name"
            placeholder="请输入商品名称"
            maxlength="30"
          />
        </el-form-item>
        <el-form-item label="商品描述" prop="product_description">
          <el-input
            v-model="form.product_description"
            placeholder="请输入商品描述"
            maxlength="30"
          />
        </el-form-item>
        <el-form-item label="商品类型" prop="product_type">
          <el-input
            v-model="form.product_type"
            placeholder="请输入商品类型"
            maxlength="30"
          />
        </el-form-item>
        <el-form-item label="商品积分" prop="price">
          <el-input
            v-model="form.price"
            placeholder="请输入商品类型"
            maxlength="30"
          />
        </el-form-item>
        <el-form-item label="商品库存" prop="stock_quantity">
          <el-input
            v-model="form.stock_quantity"
            placeholder="请输入商品库存"
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
import { InfoFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

//总数
const total = ref(50);
//是否加载
const loading = ref(true);
// 删除按钮禁用
const multiple = ref(true);
//显示搜索条件
const showSearch = ref(true);
//选中数组
const ids = ref<[]>([]);
// 弹出层标题
const title = ref("");
//是否显示数据弹出层
const open = ref(false);
//查询条件
const queryParams = ref({
  pageSize: 50,
  current: 1,
  product_name: "",
  product_type: "",
  price: "",
  stock_quantity: "",
  shelf_time: "",
  update_time: "",
});
//查询得到的数据
const productsList = ref([]);

//添加和编辑对话框中编写的要放入数据库中的form数据
const form = ref({
  product_name: "",
  product_description: "",
  product_type: "",
  price: "",
  stock_quantity: "",
});

//表单重置
const reset = () => {
  form.value = {
    product_name: "",
    product_description: "",
    product_type: "",
    price: "",
    stock_quantity: "",
  };
};
/**
 * 对话框
 */
//规则
const rules = ref({
  product_name: [
    { required: true, message: "商品名称不能为空", trigger: "blur" },
  ],
  product_type: [
    { required: true, message: "商品类型不能为空", trigger: "blur" },
  ],
  price: [{ required: true, message: "商品积分不能为空", trigger: "blur" }],
  stock_quantity: [
    { required: true, message: "商品库存不能为空", trigger: "blur" },
  ],
});
//提交
const submitForm = async () => {
  if (
    !form.value.product_name ||
    !form.value.product_type ||
    !form.value.price ||
    !form.value.stock_quantity
  ) {
    ElMessage.error("商品信息没填完整");
    return;
  }
  // 执行添加商品或者修改商品的操作
  // if (title.value.includes("添加商品")) {
  //   const res = await UserControllerService.addUserUsingPost({
  //     product_name: form.value.product_name,
  //     product_description: form.value.product_description,
  //     product_type: form.value.product_type,
  //     price: form.value.price,
  //     stock_quantity: form.value.stock_quantity,
  //   });
  //   if (res.code === 0) {
  //     ElMessage.success("添加成功");
  //     handleQuery();
  //   } else ElMessage.error("添加失败，" + res.message);
  // } else {
  //   const updateRes = await UserControllerService.updateUserUsingPost({
  //     id: productsList.value[curEdit.value].product_id,
  //     product_name: form.value.product_name,
  //     product_description: form.value.product_description,
  //     product_type: form.value.product_type,
  //     price: form.value.price,
  //     stock_quantity: form.value.stock_quantity,
  //   });
  //   if (updateRes.code === 0) {
  //     ElMessage.success("修改成功");
  //     handleQuery();
  //   } else ElMessage.error("删除失败，" + updateRes.message);
  // }
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
  // form.value = {
  //   product_name: productsList.value[index].product_name as string,
  //   product_description: productsList.value[index].product_description as string,
  //   product_type: productsList.value[index].product_type as string,
  //   price: productsList.value[index].price as string,
  //   stock_quantity: productsList.value[index].stock_quantity as string,
  // };
  curEdit.value = index;
  open.value = true;
  // title.value = `修改${productsList.value[index].product_name}的信息`;
};
const onDelete = async (index: number, row: any) => {
  // const res = await UserControllerService.deleteUserUsingPost({
  //   id: productsList.value[index].product_id,
  // });
  // if (res.code === 0) {
  //   ElMessage.success("成功删除");
  //   await handleQuery();
  // } else ElMessage.error("删除失败，" + res.message);
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
/**
 * 初始化表单
 */
const handleSelectionChange = (selection: any) => {
  //拿到选中的行的传递的数组信息selection，将数组selection中的product_id传给ids
  ids.value = [];
  // for (let i = 0; i < selection.length; ++i)
  //   ids.value.push({
  //     id: selection[i].product_id,
  //   });
};
</script>

<style scoped>
#PointGoodsView {
}
</style>
