<template>
  <div id="CheckInRecordsView">
    <div class="searchBar">
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
    </div>

    <div class="mainView">
      <!--    表格-->
      <el-table
        size="small"
        :data="insList"
        :header-cell-style="{
          backgroundColor: '#E5EEFF',
          color: '#333',
          height: '5vh',
        }"
        v-loading="loading"
        stripe
      >
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
  </div>
  <footer-layout />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { debounce } from "../../../utils/debounce_Throttle";
import { ElPagination } from "element-plus";
import FooterLayout from "@/layout/footerLayout.vue";

//总数
const total = ref(0);
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

//分页触发事件
const pageHandleChange = (value: number) => {
  queryParams.value.current = value;
  handleQuery();
};
</script>

<style scoped>
#CheckInRecordsView {
  background-color: #f0f2f5;
  padding: 1vh 1vw;
}

/*搜索栏*/
.searchBar {
  background-color: white;
  padding: 2vh 0.5vw 0 0.5vw;
  margin-bottom: 2vh;
}

/*主要内容窗口*/
.mainView {
  background-color: white;
  padding: 2vh 1.5vw 0 1.5vw;
  margin-bottom: 2vh;
}
</style>
