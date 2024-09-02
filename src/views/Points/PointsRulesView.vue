<template>
  <div id="PointsRulesView">
    <div class="searchBar">
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        v-show="showSearch"
        label-width="68px"
      >
        <el-form-item label="规则编号" prop="rule_id">
          <el-input
            v-model="queryParams.rule_id"
            placeholder="请输入规则编号"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="规则内容" prop="rule_content">
          <el-input
            v-model="queryParams.rule_content"
            placeholder="请输入规则内容"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="发布用户" prop="publishUserName">
          <el-input
            v-model="queryParams.publishUserName"
            placeholder="请输入发布用户"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="更新用户" prop="updateUserName">
          <el-input
            v-model="queryParams.updateUserName"
            placeholder="请输入更新用户"
            clearable
            @keydown.enter="handleQueryDebounce"
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
        size="small"
        v-loading="loading"
        :data="rulesList"
        :header-cell-style="{
          backgroundColor: '#E5EEFF',
          color: '#333',
          height: '5vh',
        }"
        @selection-change="handleSelectionChange"
        stripe
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="规则编号" align="center" prop="rule_id" />
        <el-table-column
          label="规则内容"
          align="center"
          prop="rule_content"
          show-overflow-tooltip
        >
          <template #default="scope">
            <span style="white-space: nowrap">{{
              scope.row.rule_content
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规则积分" align="center" prop="rule_points" />
        <el-table-column
          label="发布用户"
          align="center"
          prop="publish_user_name"
        />
        <el-table-column
          label="发布日期"
          align="center"
          prop="publish_date"
          width="180"
        >
          <template #default="scope">
            <span>{{
              moment(scope.row.publish_date).format(
                "YYYY年MM月DD日 HH时mm分ss秒"
              )
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="更新用户"
          align="center"
          prop="update_user_name"
        />
        <el-table-column
          label="更新日期"
          align="center"
          prop="update_date"
          width="180"
        >
          <template #default="scope">
            <span>{{
              moment(scope.row.update_date).format(
                "YYYY年MM月DD日 HH时mm分ss秒"
              )
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="确定删除这个规则"
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
      <div class="pagination" v-if="total > 0">
        <el-pagination
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
      <!-- 添加或修改规则配置对话框 -->
      <el-dialog :title="title" v-model="open" width="700px" append-to-body>
        <el-form :model="form" :rules="rules" label-width="120px">
          <el-form-item label="规则内容：" prop="ruleContent">
            <el-input
              type="textarea"
              maxlength="2000"
              show-word-limit
              v-model="form.ruleContent"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="最大积分数：" prop="rulePoints">
            <el-input-number
              max="100"
              min="0"
              :step="0.1"
              style="width: 10vw"
              v-model="form.rulePoints"
              placeholder="请输入规则积分"
            ></el-input-number>
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
import {
  DeleteRequest,
  Rules,
  RulesControllerService,
  RulesQueryRequest,
  UserControllerService,
} from "../../../generated";
import { ElPagination } from "element-plus";
import { ElMessage, ElNotification } from "element-plus";
import moment from "moment";
import store from "@/store";
import { InfoFilled } from "@element-plus/icons-vue";
import MyEditor from "@/components/wangEditor/myEditor.vue";
import FooterLayout from "@/layout/footerLayout.vue";

//总数
const total = ref(0);
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
const title = ref("添加规则");
//是否显示数据弹出层
const open = ref(false);
//查询内容
const queryParams = ref({
  pageSize: 50,
  current: 1,
  rule_id: "",
  rule_content: "",
  rule_points: "" as any,
  publishUserName: "",
  updateUserName: "",
});
//添加和编辑对话框中编写的要放入数据库中的form数据
const form = ref({
  ruleContent: "",
  rulePoints: "",
  ruleId: "",
});
//表单重置
const reset = () => {
  form.value = {
    ruleContent: "",
    rulePoints: "",
    ruleId: "",
  };
};
/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  open.value = true;
  title.value = "添加规则";
};
/** 允许多行删除按钮操作 */
const onDelete = async () => {
  const res = await RulesControllerService.deleteRulesMoreUsingPost(ids.value);
  if (res.code === 0) {
    ElMessage.success("删除成功");
    await handleQuery();
  } else ElMessage.error("删除失败，" + res.message);
  ids.value = [];
};
watch(
  () => ids.value.length,
  () => {
    if (ids.value.length) multiple.value = false;
    else multiple.value = true; //是否显示使用多行删除按钮
  }
);

//查询数据
const handleQuery = async () => {
  loading.value = true;
  const res = await RulesControllerService.listRulesVoByPageUsingPost(
    queryParams.value as any
  );
  loading.value = false;
  if (res.code === 0) {
    rulesList.value = res.data.records;
    total.value = res.data.total;
  } else ElMessage.error("规则积分查询失败，" + res.message);
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
    rule_id: "",
    rule_content: "",
    rule_points: "" as any,
    publishUserName: "",
    updateUserName: "",
  };
  handleQueryDebounce();
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
//提交
const submitForm = async () => {
  let res = null;
  if (title.value.includes("添加规则")) {
    res = await RulesControllerService.rulesAddUsingPost({
      ruleContent: form.value.ruleContent as any,
      rulePoints: form.value.rulePoints as any,
    });
    if (res.code === 0) {
      ElNotification.success("规则添加成功");
      await handleQuery();
    } else ElNotification.error("规则添加失败，" + res.message);
  } else {
    res = await RulesControllerService.updateRulesUsingPost({
      ruleId: form.value.ruleId as any,
      ruleContent: form.value.ruleContent,
      rulePoints: form.value.rulePoints as any,
    });
    if (res.code === 0) {
      ElNotification.success("规则修改成功");
      await handleQuery();
    } else ElNotification.error("规则修改失败，" + res.message);
  }
  reset();
  open.value = false;
};
const submitFormDebounce = debounce(submitForm, 300); //防抖
//取消
const cancel = () => {
  open.value = false;
  reset();
};
/**
 * 表内的编辑和删除操作
 * @param index
 * @param row
 */
//编辑规则信息
const handleEdit = (index: number, row: any) => {
  form.value = {
    ruleContent: row.rule_content,
    rulePoints: row.rule_points,
    ruleId: row.rule_id,
  };
  open.value = true;
  title.value = `修改规则信息`;
};
//删除规则信息
const handleDelete = async (index: number, row: any) => {
  const res = await RulesControllerService.deleteRulesUsingPost({
    id: row.rule_id,
  });
  if (res.code === 0) {
    ElMessage.success("成功删除规则");
    await handleQuery();
  } else ElMessage.error("规则删除失败，" + res.message);
};
const confirmEvent = (index: number, row: any) => {
  handleDelete(index, row);
};
//选择表格某行触发事件
const handleSelectionChange = (selection: any) => {
  //拿到选中的行的传递的数组信息selection，将数组selection中的villager_id传给ids
  ids.value = [];
  for (let i = 0; i < selection.length; ++i)
    ids.value.push({
      id: selection[i].rule_id,
    });
};
//分页触发事件
const pageHandleChange = (value: number) => {
  queryParams.value.current = value;
  handleQuery();
};
</script>

<style scoped>
#PointsRulesView {
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
