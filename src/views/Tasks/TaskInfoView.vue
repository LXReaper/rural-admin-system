<template>
  <div id="TaskInfoView">
    <div class="searchBar">
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        v-show="showSearch"
        label-width="68px"
      >
        <el-form-item label="任务编号" prop="task_id">
          <el-input
            v-model="queryParams.taskId"
            placeholder="请输入任务编号"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="任务内容" prop="task_content">
          <el-input
            v-model="queryParams.taskContent"
            placeholder="请输入任务内容"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="资料" prop="material_id">
          <el-input
            v-model="queryParams.materialId"
            placeholder="请输入资料编号"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="规则" prop="rule_id">
          <el-input
            v-model="queryParams.ruleId"
            placeholder="请输入规则编号"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="发布用户" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入发布用户姓名"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="更新用户" prop="updateUserName">
          <el-input
            v-model="queryParams.updateUserName"
            placeholder="请输入更新用户姓名"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="积分数值" prop="points_value">
          <el-input
            v-model="queryParams.pointsValue"
            placeholder="请输入积分数值"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item
          style="white-space: nowrap; margin-left: 3vw"
          label="最大任务接取人数"
          prop="all_Num"
        >
          <el-input
            v-model="queryParams.all_Num"
            placeholder="请输入最大任务接取人数"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item
          style="white-space: nowrap; margin-left: 3vw"
          label="当前接取任务人数"
          prop="join_Num"
        >
          <el-input
            v-model="queryParams.join_Num"
            placeholder="请输入当前接取任务人数"
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
      <!--    表格-->
      <el-table
        size="small"
        :header-cell-style="{
          backgroundColor: '#E5EEFF',
          color: '#333',
          height: '5vh',
        }"
        v-loading="loading"
        :data="tasksList"
        stripe
      >
        <el-table-column label="任务编号" align="center" prop="task_id" />
        <el-table-column
          label="任务内容"
          align="center"
          prop="task_content"
          show-overflow-tooltip
        />
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
              type="text"
              v-if="scope.row.rule_id && scope.row.rule_id.length"
              style="text-decoration: underline"
              @click="openDetailIdDialog('规则详情', scope.row.rule_id)"
              >显示规则
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="发布用户" align="center" prop="user_name" />
        <el-table-column
          label="发布日期"
          align="center"
          prop="publish_date"
          show-overflow-tooltip
          width="180"
        >
          <template #default="scope">
            <span style="white-space: nowrap">{{
              moment(scope.row.publish_date).format(
                "YYYY年MM月DD日HH时mm分ss秒"
              )
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="更新用户"
          align="center"
          prop="updated_user_name"
        />
        <el-table-column
          label="更新日期"
          align="center"
          prop="update_date"
          show-overflow-tooltip
          width="180"
        >
          <template #default="scope">
            <span style="white-space: nowrap">{{
              moment(scope.row.update_date).format("YYYY年MM月DD日HH时mm分ss秒")
            }}</span>
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
            <span style="white-space: nowrap">{{
              moment(scope.row.deadline).format("YYYY年MM月DD日HH时mm分ss秒")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="积分数值" align="center" prop="points_value">
          <template #default="scope">
            <el-tag type="success"
              >{{ scope.row.points_value / scope.row.all_Num }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="最大可接取人数" align="center" prop="all_Num">
          <template #default="scope">
            <el-tag type="danger">{{ scope.row.all_Num }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="当前接取人数" align="center" prop="join_Num">
          <template #default="scope">
            <el-tag type="primary">{{ scope.row.join_Num }}</el-tag>
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
import { onMounted, ref } from "vue";
import { debounce } from "../../../utils/debounce_Throttle";
import {
  LearningMaterialsControllerService,
  Rules,
  RulesControllerService,
  TasksControllerService,
} from "../../../generated";
import moment from "moment";
import { ElLoading, ElMessage } from "element-plus";
import FooterLayout from "@/layout/footerLayout.vue";

//总数
const total = ref(0);
//是否加载
const loading = ref(true);
//显示搜索条件
const showSearch = ref(true);
//查询条件
const queryParams = ref({
  pageSize: 50,
  current: 1,
  taskId: "" as any,
  taskContent: "",
  materialId: "" as any,
  ruleId: "" as any,
  userName: "",
  updateUserName: "",
  pointsValue: "" as any,
  all_Num: "" as any,
  join_Num: "" as any,
});
//所有查询到的数据
const tasksList = ref([]);

//查询数据
const handleQuery = async () => {
  loading.value = true;
  const res = await TasksControllerService.listTasksVoByPageUsingPost(
    queryParams.value as any
  );
  loading.value = false;
  if (res.code === 0) {
    tasksList.value = res.data.records;
    total.value = res.data.total;
  } else ElMessage.error("查询失败，" + res.message);
};
const handleQueryDebounce = debounce(handleQuery, 500);
onMounted(() => {
  handleQuery();
});
//重置
const resetQuery = () => {
  queryParams.value.taskId = "";
  queryParams.value.taskContent = "";
  queryParams.value.materialId = "";
  queryParams.value.ruleId = "";
  queryParams.value.userName = "";
  queryParams.value.updateUserName = "";
  queryParams.value.pointsValue = "";
  queryParams.value.all_Num = "";
  queryParams.value.join_Num = "";
  handleQueryDebounce();
};
//分页触发事件
const pageHandleChange = (value: number) => {
  queryParams.value.current = value;
  handleQuery();
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
#TaskInfoView {
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
