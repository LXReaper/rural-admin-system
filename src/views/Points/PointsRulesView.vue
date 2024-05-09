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

    <!--    表格-->
    <el-table v-loading="loading" :data="rulesList">
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
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { debounce } from "../../../utils/debounce_Throttle";

//总数
const total = ref(50);
//加载
const loading = ref(true);
//显示搜索条件
const showSearch = ref(true);
//后端获取到的所有数据
const rulesList = ref([]);
//查询内容
const queryParams = ref({
  pageSize: 50,
  current: 1,
  rule_id: "",
  rule_content: "",
  publish_user_id: "",
  update_user_id: "",
});

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
#PointsRulesView {
}
</style>
