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
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input
          v-model="searchParams.phone_number"
          placeholder="请输入手机号"
          size="default"
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
  <!--  用户管理-->
  <div id="userManagement">
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
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          size="default"
          :disabled="multiple"
          @click="openNotice = true"
        >
          <el-icon>
            <Bell />
          </el-icon>
          &nbsp;发送通知
        </el-button>
      </el-col>
    </el-row>
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
      <!--      <el-table-column label="ID" prop="villager_id" />-->
      <el-table-column label="姓名" prop="villager_name" />
      <el-table-column label="头像" prop="avatar">
        <template #default="scope">
          <el-avatar :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column label="账号" prop="account" />
      <el-table-column label="简介" prop="introduction" show-overflow-tooltip>
        <template #default="scope">
          <span style="white-space: nowrap">
            {{ scope.row.introduction }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="住址" prop="address" show-overflow-tooltip>
        <template #default="scope">
          <span style="white-space: nowrap">
            {{ scope.row.address }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" prop="phone_number" />
      <el-table-column
        label="身份"
        prop="userRole"
        :filters="filters"
        :filter-method="filterTag"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.userRole === 'admin' ? '' : 'success'"
            disable-transitions
            >{{ scope.row.userRole }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created_at">
        <template #default="scope">
          {{
            `${moment(scope.row.created_at).format(
              "YYYY年MM月DD日 HH时mm分ss秒"
            )}`
          }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template #default="scope">
          <div style="display: inline-flex">
            <span
              @click="openUserDetailDrawer = true"
              style="font-size: 110%; color: #0256ff; cursor: pointer"
              >详情
            </span>
            <el-divider direction="vertical" />
            <el-dropdown
              trigger="click"
              style="cursor: pointer; margin-top: 0.2vh"
            >
              <span style="color: #0256ff">
                更多
                <el-icon>
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    @click="handleEdit(scope.$index, scope.row)"
                  >
                    编辑
                  </el-dropdown-item>
                  <el-dropdown-item
                    @click="()=>{
                  ElMessageBox.alert('是否删除这个用户？', '选择删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    callback: (action: Action) => {
                      if(action === 'confirm') confirmEvent(scope.$index, scope.row)
                    },
                  })
                }"
                    >删除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
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

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" v-model="open" width="600px" append-to-body>
      <el-form :model="form" :rules="rules" label-width="80px">
        <el-form-item label="居民姓名" prop="villager_name">
          <el-input
            v-model="form.villager_name"
            placeholder="请输入居民姓名"
            maxlength="30"
          />
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input
            v-model="form.account"
            placeholder="请输入账号"
            maxlength="30"
          />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone_number">
          <el-input
            v-model="form.phone_number"
            placeholder="请输入手机号码"
            maxlength="11"
          />
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input
            v-model="form.address"
            placeholder="请输入住址"
            maxlength="50"
          />
        </el-form-item>
        <el-form-item label="角色" prop="userRole">
          <el-select v-model="form.userRole" placeholder="请选择角色">
            <el-option
              v-for="(item, id) in filters"
              :key="id"
              :label="item.text"
              :value="item.value"
              v-model="form.userRole"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="简介">
          <el-input
            v-model="form.introduction"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
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
    <!-- 通知用户对话框 -->
    <el-dialog
      :title="'发送通知'"
      v-model="openNotice"
      width="600px"
      append-to-body
    >
      <el-form :model="noticeForm" :rules="rulesByNotice" label-width="80px">
        <el-form-item label="通知标题" prop="title">
          <el-input
            v-model="noticeForm.title"
            placeholder="请输入通知标题"
            maxlength="30"
          />
        </el-form-item>
        <el-form-item label="通知内容" prop="content">
          <el-input
            type="textarea"
            v-model="noticeForm.content"
            placeholder="请输入通知内容"
            maxlength="2000"
          />
        </el-form-item>
        <el-form-item label="通知图片" prop="image_url">
          <el-input
            v-model="noticeForm.image_url"
            placeholder="请输入通知图片"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="publishNotification"
            >确 定
          </el-button>
          <el-button @click="cancelNotice">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!--    某个用户详情-->
    <user-detail-drawer
      :is-open="openUserDetailDrawer"
      :handle-close-drawer="() => (openUserDetailDrawer = false)"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {
  Action,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElPagination,
} from "element-plus";
import { ArrowDown, Bell, InfoFilled } from "@element-plus/icons-vue";
import moment from "moment";
import store from "@/store";
import {
  DeleteRequest,
  User,
  UserControllerService,
  UserQueryRequest,
} from "../../../../generated";
import { debounce } from "../../../../utils/debounce_Throttle";
import { NoticesControllerService } from "../../../../generated/services/NoticesControllerService";
import UserDetailDrawer from "@/components/user/userManagement/userDetailDrawer.vue";

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
const openUserDetailDrawer = ref(false); //是否打开用户详情抽屉
const openNotice = ref(false); //发送通知

//添加和编辑对话框中编写的要放入数据库中的form数据
const form = ref({
  account: "",
  userRole: "",
  villager_name: "",
  phone_number: "",
  address: "",
  introduction: "",
});

//表单重置
const reset = () => {
  form.value = {
    account: "",
    userRole: "",
    villager_name: "",
    phone_number: "",
    address: "",
    introduction: "",
  };
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  open.value = true;
  title.value = "添加居民";
};
/** 允许多行删除按钮操作 */
const onDelete = async () => {
  const res = await UserControllerService.deleteMoreUserUsingPost(ids.value);
  if (res.code === 0) {
    ElMessage.success("删除成功");
    await handleQuery();
  } else ElMessage.error("删除失败，" + res.message);
  ids.value = [];
};
/**
 * 对话框
 */
//规则
const rules = ref({
  villager_name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
  account: [{ required: true, message: "账号不能为空", trigger: "blur" }],
  userRole: [{ required: true, message: "角色不能为空", trigger: "blur" }],
});
//提交
const submitForm = async () => {
  if (
    !form.value.account ||
    !form.value.villager_name ||
    !form.value.userRole ||
    form.value.account.length < 4
  ) {
    ElMessage.error(
      form.value.account.length < 4 ? "账号长度不能小于4" : "用户信息没填完整"
    );
    return;
  }
  //执行添加用户或者修改用户的操作
  if (title.value.includes("添加居民")) {
    const res = await UserControllerService.addUserUsingPost({
      account: form.value.account,
      userRole: form.value.userRole,
      villager_name: form.value.villager_name,
      phone_number: form.value.phone_number,
      address: form.value.address,
      introduction: form.value.introduction,
    });
    if (res.code === 0) {
      ElMessage.success("添加成功");
      await handleQuery();
    } else ElMessage.error("添加失败，" + res.message);
  } else {
    const updateRes = await UserControllerService.updateUserUsingPost({
      id: tableData.value[curEdit.value].villager_id,
      userAccount: form.value.account,
      userAddress: form.value.address,
      userName: form.value.villager_name,
      userPhone: form.value.phone_number,
      userProfile: form.value.introduction,
      userRole: form.value.userRole,
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
/**
 * 筛选框
 */
const filters = [
  { text: "管理员", value: "admin" },
  { text: "普通用户", value: "user" },
  { text: "封号", value: "ban" },
];
const filterTag = (value: string, row: any) => {
  return row.userRole === value;
};

/**
 * 表单基本数据
 */
const tableData = ref<User[]>([]);
const searchParams = ref<UserQueryRequest>({
  pageSize: 50,
  current: 1,
  villager_id: "" as any,
  villager_name: "",
  phone_number: "",
  address: "",
});

/**
 * 请求指定信息的用户数据
 */
const handleQuery = async () => {
  loading.value = true;
  const res = await UserControllerService.listUserByPageUsingPost(
    searchParams.value
  );
  loading.value = false;
  if (res.code === 0) {
    tableData.value = res.data.records;
    total.value = res.data.total;
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
    phone_number: "",
    address: "",
  };
  handleQueryDebounce();
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
    account: tableData.value[index].account as string,
    userRole: tableData.value[index].userRole as string,
    villager_name: tableData.value[index].villager_name as string,
    phone_number: tableData.value[index].phone_number as string,
    address: tableData.value[index].address as string,
    introduction: tableData.value[index].introduction as string,
  };
  curEdit.value = index;
  open.value = true;
  title.value = `修改${tableData.value[index].villager_name}的信息`;
};
const handleDelete = async (index: number, row: any) => {
  const res = await UserControllerService.deleteUserUsingPost({
    id: tableData.value[index].villager_id,
  });
  if (res.code === 0) {
    ElMessage.success("成功删除村民");
    await handleQuery();
  } else ElMessage.error("村民删除失败，" + res.message);
};
const confirmEvent = (index: number, row: any) => {
  handleDelete(index, row);
};
watch(
  () => ids.value.length,
  () => {
    if (ids.value.length) multiple.value = false;
    else multiple.value = true;
  }
);
/**
 * 通知
 */
//规则
const rulesByNotice = ref({
  title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
  content: [{ required: true, message: "内容不能为空", trigger: "blur" }],
});
//通知表单
const noticeForm = ref({
  content: "",
  image_url: "",
  title: "",
  user: "",
  user_id: [],
});
const resetNotice = () => {
  noticeForm.value = {
    content: "",
    image_url: "",
    title: "",
    user: "",
    user_id: [],
  };
};
const cancelNotice = () => {
  openNotice.value = false;
  resetNotice();
};
//发送通知
const publishNotification = async () => {
  noticeForm.value.user = store.state.user.loginUser.villager_name;
  noticeForm.value.user_id = ids.value.map((item) => item.id || 0) as any;
  const res = await NoticesControllerService.publishNotificationsUsingPost(
    noticeForm.value
  );
  if (res.code === 0) {
    ElNotification({
      message: "通知发送成功",
      type: "success",
      duration: 1000,
      showClose: false,
    });
  } else ElNotification.error("通知发送失败，" + res.message);
  openNotice.value = false;
  resetNotice();
};
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
      id: selection[i].villager_id,
    });
};
//分页触发事件
const pageHandleChange = (value: number) => {
  searchParams.value.current = value;
  handleQuery();
};
</script>

<style scoped>
#userManagement {
  background-color: white;
  padding: 1vh 1vw;
}

.searchBar {
  background-color: white;
  padding: 2vh 1.5vw 0 1.5vw;
  margin-bottom: 2vh;
}
</style>
