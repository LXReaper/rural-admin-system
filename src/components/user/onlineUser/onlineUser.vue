<template>
  <div class="searchBar">
    <!--    搜索栏-->
    <el-form
      :model="searchParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="村民姓名" prop="villagerName">
        <el-input
          v-model="searchParams.villager_name"
          placeholder="请输入村民姓名"
          size="default"
          clearable
          @keydown.enter.prevent="handleQueryDebounce"
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
  <!--  在线用户-->
  <div id="onlineUser">
    <!--      表格-->
    <el-table
      size="small"
      :data="tableData"
      :header-cell-style="{
        backgroundColor: '#E5EEFF',
        color: '#333',
        height: '5vh',
      }"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      stripe
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="会话编号" prop="sessionId" />
      <el-table-column label="姓名" prop="villager_name" />
      <el-table-column label="头像" prop="avatar">
        <template #default="scope">
          <el-avatar :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column label="浏览器" prop="userAgent" show-overflow-tooltip>
        <template #default="scope">
          <span style="white-space: nowrap">
            {{ scope.row.userAgent }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="ip地址" prop="remoteAddr" />
      <el-table-column label="主机名" prop="remoteHost" show-overflow-tooltip>
        <template #default="scope">
          <span style="white-space: nowrap">
            {{ scope.row.remoteHost }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="登录状态"
        prop="loginStatus"
        :filters="filters"
        :filter-method="filterTag"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.loginStatus ? 'success' : 'warning'"
            disable-transitions
            >{{ scope.row.loginStatus ? "在线" : "离线" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="登录时间" prop="loginTime">
        <template #default="scope">
          <text v-if="scope.row.loginTime">
            {{
              `${moment(scope.row.loginTime).format(
                "YYYY年MM月DD日 HH时mm分ss秒"
              )}`
            }}
          </text>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="确定移除这个用户"
            @confirm="removeOnlineUser(scope.row)"
            v-if="
              scope.row.loginStatus &&
              scope.row.userId !== store.state.user.loginUser.villager_id
            "
          >
            <template #reference>
              <el-button size="small" type="danger">强制下线</el-button>
            </template>
          </el-popconfirm>
          <el-tag v-else>无任何操作</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <!--    分页-->
    <el-pagination
      background
      :currentPage="searchParams.current"
      :page-size="total"
      :page-count="Math.ceil(total / searchParams.pageSize)"
      :total="Math.ceil(total / searchParams.pageSize)"
      layout="total, size, prev, pager, next, jumper"
      @current-change="pageHandleChange"
      class="mt-4"
      v-show="total > 0"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { ElMessage, ElNotification, ElPagination } from "element-plus";
import { Bell, InfoFilled } from "@element-plus/icons-vue";
import moment from "moment";
import store from "@/store";
import {
  DeleteRequest,
  OnLineUserVO,
  UserControllerService,
} from "../../../../generated";
import { debounce } from "../../../../utils/debounce_Throttle";

//总数
const total = ref(0);
//是否进入加载状态
const loading = ref(true);
//显示搜索条件
const showSearch = ref(true);
//删除是否禁用
const multiple = ref(true);

//选中数组
const ids = ref<DeleteRequest[]>([]);
// 弹出层标题
const title = ref("");
//是否显示数据弹出层
const open = ref(false); //添加修改用户信息

//添加和编辑对话框中编写的要放入数据库中的form数据
const form = ref({
  account: "",
  userRole: "",
  villager_name: "",
  phone_number: "",
  address: "",
  introduction: "",
});

/**
 * 筛选框
 */
const filters = [
  { text: "在线", value: 1 },
  { text: "离线", value: 0 },
];
const filterTag = (value: string, row: any) => {
  return row.loginStatus === value;
};

/**
 * 表单基本数据
 */
const tableData = ref<OnLineUserVO[]>([]);
const searchParams = ref({
  pageSize: 50,
  current: 1,
  villager_name: "",
});

/**
 * 请求指定信息的用户数据
 */
const handleQuery = async () => {
  loading.value = true;
  const res = await UserControllerService.getOnlineUsersPageUsingGet({
    pageSize: searchParams.value.pageSize,
    current: searchParams.value.current,
    username: searchParams.value.villager_name,
  });
  loading.value = false;
  if (res.code === 0) {
    tableData.value = res.data?.records as any;
    total.value = res.data?.total as any;
  } else ElMessage.error("数据请求失败，" + res.message);
};
//前端防抖
const handleQueryDebounce = debounce(handleQuery, 500);
/**
 * 重置请求的内容
 */
const resetQuery = () => {
  searchParams.value = {
    pageSize: 50,
    current: 1,
    villager_name: "",
  };
  handleQueryDebounce();
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
onMounted(async () => {
  await handleQuery();
});
const handleSelectionChange = (selection: any) => {
  //拿到选中的行的传递的数组信息selection，将数组selection中的villager_id传给ids
  ids.value = [];
  for (let i = 0; i < selection.length; ++i)
    ids.value.push({
      id: selection[i].sessionId as any,
    });
};
/**
 * 移除在线用户
 */
const removeOnlineUser = async (onLineUserVO: OnLineUserVO) => {
  const res = await UserControllerService.removeOnlineUserUsingPost(
    onLineUserVO.userId
  );
  if (res.code === 0) {
    ElMessage.success(onLineUserVO.villager_name + "已下线");
    await handleQuery();
  } else
    ElMessage.error(
      "移除" + onLineUserVO.villager_name + "失败，" + res.message
    );
};

//分页触发事件
const pageHandleChange = (value: number) => {
  searchParams.value.current = value;
  handleQuery();
};
</script>

<style scoped>
#onlineUser {
  background-color: white;
  padding: 1vh 1vw;
}

.searchBar {
  background-color: white;
  padding: 2vh 1.5vw 0 1.5vw;
  margin-bottom: 2vh;
}
</style>
