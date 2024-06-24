<template>
  <div id="PointsRulesView">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="规则ID" prop="rule_id">
        <el-input
          v-model="queryParams.rule_id"
          placeholder="请输入规则ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="规则内容" prop="rule_content">
        <el-input
          v-model="queryParams.rule_content"
          placeholder="请输入规则内容"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="发布用户" prop="publish_user_id">
        <el-input
          v-model="queryParams.publish_user_id"
          placeholder="请输入发布用户ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="更新用户" prop="update_user_id">
        <el-input
          v-model="queryParams.update_user_id"
          placeholder="请输入更新用户ID"
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

    <!--    增删改-->
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
          @click="onDelete"
          >删除
        </el-button>
      </el-col>
    </el-row>

    <!--    表格-->
    <el-table
      v-loading="loading"
      :data="rulesList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="规则ID" align="center" prop="ruleId" />
      <el-table-column label="规则内容" align="center" prop="ruleContent" />
      <el-table-column label="规则积分" align="center" prop="rulePoints" />
      <el-table-column label="发布用户ID" align="center" prop="publishUserId" />
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
      <el-table-column label="更新用户ID" align="center" prop="updateUserId" />
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
      <el-table-column label="是否删除" align="center" prop="isDeleted" />
    </el-table>

    <!--    &lt;!&ndash;    分页&ndash;&gt;-->
    <!--    <el-pagination-->
    <!--      v-show="total > 0"-->
    <!--      :total="total"-->
    <!--      :page="queryParams.current"-->
    <!--      :limit="queryParams.pageSize"-->
    <!--    />-->
    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" v-model="open" width="700px" append-to-body>
      <el-form :rules="rules" label-width="120px">
        <el-form-item label="规则内容：" prop="ruleContent">
          <el-input placeholder="请输入规则内容"></el-input>
        </el-form-item>
        <el-form-item label="规则积分：" prop="rulePoints">
          <el-input placeholder="请输入规则积分"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { debounce } from "../../../utils/debounce_Throttle";
import { DeleteRequest } from "../../../generated";

//总数
const total = ref(50);
//加载
const loading = ref(true);
//显示搜索条件
const showSearch = ref(true);
//删除是否禁用
const multiple = ref(true);
//后端获取到的所有数据
const rulesList = ref([]);
//选中数组
const ids = ref<DeleteRequest[]>([]);
// 弹出层标题
const title = ref("");
//是否显示数据弹出层
const open = ref(false);
//查询内容
const queryParams = ref({
  pageSize: 50,
  current: 1,
  rule_id: "",
  rule_content: "",
  publish_user_id: "",
  update_user_id: "",
});

/** 新增按钮操作 */
const handleAdd = () => {
  // reset();
  open.value = true;
  title.value = "添加居民";
};
/** 允许多行删除按钮操作 */
const onDelete = () => {
  console.log();
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
 * 对话框
 */
//规则
const rules = ref({
  ruleContent: [
    { required: true, message: "规则内容不能为空", trigger: "blur" },
  ],
  rulePoints: [
    { required: true, message: "规则积分不能为空", trigger: "blur" },
  ],
});
const handleSelectionChange = (selection: any) => {
  //拿到选中的行的传递的数组信息selection，将数组selection中的villager_id传给ids
  ids.value = [];
  for (let i = 0; i < selection.length; ++i)
    ids.value.push({
      id: selection[i].villager_id,
    });
};
</script>

<style scoped>
#PointsRulesView {
}
</style>
