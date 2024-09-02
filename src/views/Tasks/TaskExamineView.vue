<template>
  <div id="TaskExamineView">
    <div class="searchBar">
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        v-show="showSearch"
        label-width="68px"
      >
        <el-form-item label="任务内容" prop="task_content">
          <el-input
            v-model="queryParams.task_content"
            placeholder="请输入任务内容"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="发布用户" prop="user_name">
          <el-input
            v-model="queryParams.user_name"
            placeholder="请输入发布用户"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="审核用户" prop="examine_user_name">
          <el-input
            v-model="queryParams.examine_user_name"
            placeholder="请输入审核用户"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="任务积分" prop="points_value">
          <el-input
            v-model="queryParams.points_value"
            placeholder="请输入任务积分"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="规则" prop="rule_id">
          <el-input
            v-model="queryParams.rule_id"
            placeholder="请输入规则编号"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="资料" prop="material_id">
          <el-input
            v-model="queryParams.material_id"
            placeholder="请输入资料编号"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="接取人数" prop="all_Num">
          <el-input
            v-model="queryParams.all_Num"
            placeholder="请输入接取人数"
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
      <!--    增删改操作-->
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="danger"
            plain
            size="default"
            @click="handleDelete"
            :disabled="multiple"
            >删除
          </el-button>
        </el-col>
      </el-row>

      <!--    表格-->
      <el-table
        size="small"
        v-loading="loading"
        :data="taskExamineList"
        :header-cell-style="{
          backgroundColor: '#E5EEFF',
          color: '#333',
          height: '5vh',
        }"
        @selection-change="handleSelectionChange"
        stripe
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="编号" align="center" prop="id" />
        <el-table-column label="资料" align="center" prop="material_id">
          <template #default="scope">
            <el-button
              type="text"
              v-if="scope.row.material_id && scope.row.material_id.length"
              style="text-decoration: underline"
              @click="openDetailIdDialog('资料详情', scope.row.material_id)"
              >显示资料
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="规则" align="center" prop="rule_id">
          <template #default="scope">
            <el-button
              v-if="scope.row.rule_id && scope.row.rule_id.length"
              type="text"
              style="text-decoration: underline"
              @click="openDetailIdDialog('规则详情', scope.row.rule_id)"
              >显示规则
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="任务内容"
          align="center"
          prop="task_content"
          show-overflow-tooltip
        >
          <template #default="scope">
            <span style="white-space: nowrap">
              {{ scope.row.task_content }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="任务积分数值"
          align="center"
          prop="points_value"
        />
        <el-table-column label="任务可接取总人数" align="center" prop="all_Num">
          <template #default="scope">
            <el-tag type="danger">{{ scope.row.all_Num }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="center" prop="is_accepted">
          <template #default="scope">
            <el-tag type="warning" v-if="!scope.row.is_accepted">未审核</el-tag>
            <el-tag type="success" v-else-if="scope.row.is_accepted === 1"
              >审核通过
            </el-tag>
            <el-tag type="danger" v-else-if="scope.row.is_accepted === 2"
              >审核打回
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布用户" align="center" prop="villager_name" />
        <el-table-column
          label="发布日期"
          align="center"
          prop="publish_date"
          show-overflow-tooltip
          width="180"
        >
          <template #default="scope">
            <span style="white-space: nowrap"
              >{{
                moment(scope.row.publish_date).format(
                  "YYYY年MM月DD日 HH时mm分ss秒"
                )
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="审核用户"
          align="center"
          prop="examine_user_name"
        />
        <el-table-column
          label="审核日期"
          align="center"
          prop="update_date"
          show-overflow-tooltip
          width="180"
        >
          <template #default="scope">
            <span v-if="scope.row.update_date" style="white-space: nowrap"
              >{{
                moment(scope.row.update_date).format(
                  "YYYY年MM月DD日 HH时mm分ss秒"
                )
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="截止日期"
          align="center"
          prop="deadline"
          show-overflow-tooltip
          width="180"
        >
          <template #default="scope">
            <span style="white-space: nowrap"
              >{{
                moment(scope.row.deadline).format("YYYY年MM月DD日 HH时mm分ss秒")
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template #default="scope">
            <el-button
              v-if="!scope.row.is_accepted"
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >
              审核
            </el-button>
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="确定删除这条审核记录吗"
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

      <!-- 审核任务对话框 -->
      <el-dialog :title="title" v-model="open" width="600px" append-to-body>
        <el-form :model="curState" :rules="rules" label-width="80px">
          <el-form-item label="审核状态" prop="is_accepted">
            <el-select
              v-model="curState.is_accepted"
              placeholder="请选择审核的状态"
              size="large"
              default-first-option
              style="width: 240px"
            >
              <el-option
                v-for="item in [
                  { value: 0, label: '审核中' },
                  { value: 1, label: '审核通过' },
                  { value: 2, label: '审核打回' },
                ]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
      <!--    展示规则信息对话框-->
      <el-dialog v-model="isOpenRuleDetail" draggable append-to-body>
        <el-descriptions
          :title="'规则详情'"
          direction="vertical"
          :column="4"
          :size="'default'"
          border
        >
          <el-descriptions-item label="规则编号"
            >{{ ruleDetail.rule_id }}
          </el-descriptions-item>
          <el-descriptions-item label="规则限制点数">
            <el-tag type="danger" round>{{ ruleDetail.rule_points }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="发布用户">
            {{ ruleDetail.publish_user_name }}
          </el-descriptions-item>
          <el-descriptions-item label="更新用户">
            {{ ruleDetail.update_user_name }}
          </el-descriptions-item>
          <el-descriptions-item label="规则内容" :span="4"
            >{{ ruleDetail.rule_content }}
          </el-descriptions-item>
          <el-descriptions-item label="规则发布时间">
            <el-tag type="primary" round
              >{{
                moment(ruleDetail.publish_date).format(
                  "YYYY年MM月DD日 HH时mm分ss秒"
                )
              }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="规则更新时间">
            <el-tag type="primary" round
              >{{
                moment(ruleDetail.update_date).format(
                  "YYYY年MM月DD日 HH时mm分ss秒"
                )
              }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-dialog>
      <!--    展示学习资料信息对话框-->
      <el-dialog
        v-model="isOpenLearningMaterialDetail"
        draggable
        append-to-body
      >
        <el-descriptions
          :title="'学习资料详情'"
          direction="vertical"
          :column="3"
          :size="'small'"
          border
        >
          <el-descriptions-item label="学习资料编号"
            >{{ learningMaterialDetail.material_id }}
          </el-descriptions-item>
          <el-descriptions-item label="发布用户">
            <el-tag type="success" round
              >{{ learningMaterialDetail.user_name }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="更新用户">
            <el-tag type="success" round
              >{{ learningMaterialDetail.updated_user_name }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="学习内容"
            >{{ learningMaterialDetail.text_content }}
          </el-descriptions-item>
          <el-descriptions-item label="学习视频" :span="2"
            >{{ learningMaterialDetail.video_url }}
          </el-descriptions-item>
          <el-descriptions-item label="学习资料发布时间">
            <el-tag type="primary" round
              >{{
                moment(learningMaterialDetail.publish_date).format(
                  "YYYY年MM月DD日 HH时mm分ss秒"
                )
              }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="学习资料更新时间">
            <el-tag type="primary" round
              >{{
                moment(learningMaterialDetail.update_date).format(
                  "YYYY年MM月DD日 HH时mm分ss秒"
                )
              }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-dialog>
      <!--    展示规则和资料id详情的对话框-->
      <el-dialog
        v-model="isOpenIdDetail"
        :title="detailTitle"
        destroy-on-close
        draggable
        append-to-body
      >
        <el-descriptions
          :title="`${detailTitle}编号：`"
          :extra="`点击编号可以展示${detailTitle}信息`"
          direction="vertical"
          :column="4"
          :size="'default'"
          border
        />
        <el-scrollbar style="height: 50vh">
          <div
            style="
              height: 6vh;
              border: 1px solid #dad2d1;
              background-color: #f6f6f6;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              margin-top: 1vh;
              cursor: pointer;
            "
            :class="{ hoverTab: hoverId == item }"
            v-for="(item, i) in curDetailIdList"
            @click="openDetailInfo(i)"
            @mouseover="hoverId = item"
            @mouseout="hoverId = -1"
            :key="i"
          >
            <div>{{ detailTitle.substring(0, 2) + (i + 1) }}</div>
          </div>
        </el-scrollbar>
      </el-dialog>
    </div>
  </div>
  <footer-layout />
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { debounce } from "../../../utils/debounce_Throttle";
import { InfoFilled } from "@element-plus/icons-vue";
import {
  DeleteRequest,
  LearningMaterialsControllerService,
  RulesControllerService,
  UserControllerService,
} from "../../../generated";
import {
  ElLoading,
  ElMessage,
  ElNotification,
  ElPagination,
} from "element-plus";
import { TasksExamineControllerService } from "../../../generated/services/TasksExamineControllerService";
import moment from "moment/moment";
import FooterLayout from "@/layout/footerLayout.vue";
import { error } from "echarts/types/src/util/log";

//总数
const total = ref(0);
//是否加载
const loading = ref(true);
// 删除按钮禁用
const multiple = ref(true);
//显示搜索条件
const showSearch = ref(true);
//查询条件
const queryParams = ref({
  pageSize: 50,
  current: 1,
  task_content: "",
  user_name: "",
  examine_user_name: "",
  is_accepted: "",
  material_id: "",
  points_value: "",
  deadline: "",
  publish_date: "",
  rule_id: "",
  update_date: "",
  all_Num: "",
});
//查询后得到的数据
const taskExamineList = ref([]);

//选中数组
const ids = ref<DeleteRequest[]>([]);
// 弹出层标题
const title = ref("");
//是否显示数据弹出层
const open = ref(false);

//表单重置
const reset = () => {
  curState.value = {
    id: 0,
    is_accepted: 0,
  };
};

//分页触发事件
const pageHandleChange = (value: number) => {
  queryParams.value.current = value;
  handleQuery();
};

/**
 * 对话框
 */
//规则
const rules = ref({
  text_content: [
    { required: true, message: "学习内容不能为空", trigger: "blur" },
  ],
});
//审核处理任务
const submitForm = async () => {
  const res = await TasksExamineControllerService.taskHandleUsingPost({
    id: curState.value.id,
    is_accepted: curState.value.is_accepted,
  });
  if (res.code === 0) {
    ElNotification.success("已审核");
  } else ElNotification.error("审核失败，" + res.message);
  await handleQuery();
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
  const res =
    await TasksExamineControllerService.listTasksExamineVoByPageUsingPost({
      pageSize: queryParams.value.pageSize,
      current: queryParams.value.current,
      task_content: queryParams.value.task_content,
      user_name: queryParams.value.user_name,
      examine_user_name: queryParams.value.examine_user_name,
      is_accepted: queryParams.value.is_accepted as any,
      material_id: queryParams.value.material_id as any,
      points_value: queryParams.value.points_value as any,
      deadline: queryParams.value.deadline,
      publish_date: queryParams.value.publish_date,
      rule_id: queryParams.value.rule_id as any,
      update_date: queryParams.value.update_date,
      all_Num: queryParams.value.all_Num as any,
    });
  loading.value = false;

  if (res.code === 0) {
    taskExamineList.value = res.data.records;
    total.value = res.data.total;
  } else ElMessage.error("加载失败，" + res.message);
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
    task_content: "",
    user_name: "",
    examine_user_name: "",
    is_accepted: "",
    material_id: "",
    points_value: "",
    deadline: "",
    publish_date: "",
    rule_id: "",
    update_date: "",
    all_Num: "",
  };
  handleQueryDebounce();
};

/**
 * 表格中的按钮
 */
const curState = ref({
  id: 0,
  is_accepted: 0,
});
//审核
const handleEdit = (index: number, row: any) => {
  curState.value.id = row.id;
  curState.value.is_accepted = row.is_accepted;
  open.value = true;
  title.value = "审核";
};
//删除
const onDelete = async (index: number) => {
  const res = await TasksExamineControllerService.deleteTaskExamineUsingPost({
    id: index,
  });
  if (res.code === 0) {
    ElNotification.success("删除成功");
    await handleQuery();
  } else ElNotification.error("删除失败，" + res.message);
};
const confirmEvent = (index: number, row: any) => {
  onDelete(row.id);
};
watch(
  () => ids.value.length,
  () => {
    if (ids.value.length) multiple.value = false;
    else multiple.value = true;
  }
);

const handleSelectionChange = (selection: any) => {
  //拿到选中的行的传递的数组信息selection，将数组selection中的material_id传给ids
  ids.value = [];
  for (let i = 0; i < selection.length; ++i)
    ids.value.push({
      id: selection[i].id,
    });
};
//删除多条记录
const handleDelete = async () => {
  for (let i = 0; i < ids.value.length; ++i) {
    const res = await TasksExamineControllerService.deleteTaskExamineUsingPost({
      id: ids.value[i].id,
    });
    if (res.code === 0) {
      ElNotification.success("删除成功");
    } else ElNotification.error("删除失败，" + res.message);
  }
  await handleQuery();
};

/**
 * 展示规则和学习资料id详情
 */
const hoverId = ref(-1); //hover某块id信息
const detailTitle = ref("");
const isOpenIdDetail = ref(false); //是否打开id详情对话框
const curDetailIdList = ref([]);
//打开详情id对话框
const openDetailIdDialog = (name: string, list: []) => {
  detailTitle.value = name;
  curDetailIdList.value = list;
  isOpenIdDetail.value = true;
};
//打开详情信息对话框
const openDetailInfo = (i: number) => {
  if (detailTitle.value === "规则详情") {
    showRuleDetail(curDetailIdList.value[i]);
  } else showLearningMaterialDetail(curDetailIdList.value[i]);
};

/**
 * 展示规则信息
 */
//是否显示规则详情对话框
const isOpenRuleDetail = ref(false);
//规则信息
const ruleDetail = ref({
  publish_date: "",
  publish_user_name: "",
  rule_content: "",
  rule_id: "",
  rule_points: "",
  update_date: "",
  update_user_name: "",
});
//展示规则对话框
const showRuleDetail = (id: number) => {
  const loading = ElLoading.service({
    lock: true,
    text: "玩命加载中...",
    background: "rgba(0, 0, 0, 0.1)",
  }); //创建加载动画
  getRuleById(id)
    .then(() => {
      loading.close();
      isOpenRuleDetail.value = true;
    })
    .catch(() => {
      loading.close();
    });
};
//获取规则信息
const getRuleById = async (id: number) => {
  const res = await RulesControllerService.getRulesVoByIdUsingGet(id);
  if (res.code === 0) {
    ruleDetail.value = res.data as any;
  } else ElMessage.error("查询规则信息失败，" + res.message);
};
/**
 * 展示学习资料信息
 */
//是否显示学习资料详情对话框
const isOpenLearningMaterialDetail = ref(false);
//学习资料信息
const learningMaterialDetail = ref({
  material_id: "",
  publish_date: "",
  text_content: "",
  update_date: "",
  updated_user_name: "",
  user_name: "",
  video_url: "",
});
const showLearningMaterialDetail = (id: number) => {
  const loading = ElLoading.service({
    lock: true,
    text: "玩命加载中...",
    background: "rgba(0, 0, 0, 0.1)",
  }); //创建加载动画
  getLearningMaterialById(id)
    .then(() => {
      loading.close();
      isOpenLearningMaterialDetail.value = true;
    })
    .catch(() => {
      loading.close();
    });
};
//获取学习资料信息
const getLearningMaterialById = async (id: number) => {
  const res =
    await LearningMaterialsControllerService.getLearningMaterialsVoUsingGet(id);
  if (res.code === 0) {
    learningMaterialDetail.value = res.data as any;
  } else ElMessage.error("查询学习资料信息失败，" + res.message);
};
</script>

<style scoped>
#TaskExamineView {
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

.hoverTab {
  background-color: #c6f6f6 !important;
  margin-left: 1vw !important;
  box-shadow: 10px 7px 6px rgba(0, 0, 0, 0.1) !important;
}
</style>
