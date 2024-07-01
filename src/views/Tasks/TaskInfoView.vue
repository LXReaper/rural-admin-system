<template>
  <div id="TaskInfoView">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="任务ID" prop="task_id">
        <el-input
          v-model="queryParams.taskId"
          placeholder="请输入任务ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="任务内容" prop="task_content">
        <el-input
          v-model="queryParams.taskContent"
          placeholder="请输入任务内容"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="资料ID" prop="material_id">
        <el-input
          v-model="queryParams.materialId"
          placeholder="请输入资料ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="规则ID" prop="rule_id">
        <el-input
          v-model="queryParams.ruleId"
          placeholder="请输入规则ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="发布用户" prop="user_id">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入发布用户ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="更新用户" prop="updated_user_id">
        <el-input
          v-model="queryParams.updatedUserId"
          placeholder="请输入更新用户ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="积分数值" prop="points_value">
        <el-input
          v-model="queryParams.pointsValue"
          placeholder="请输入积分数值"
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
    <el-table v-loading="loading" stripe border :data="tasksList">
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
            v-if="scope.row.material_id"
            style="text-decoration: underline"
            @click="showLearningMaterialDetail(scope.row.material_id)"
            >显示资料
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="规则" align="center" prop="rule_id">
        <template #default="scope">
          <el-button
            type="text"
            v-if="scope.row.rule_id"
            style="text-decoration: underline"
            @click="showRuleDetail(scope.row.rule_id)"
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
            moment(scope.row.publish_date).format("YYYY年MM月DD日HH时mm分ss秒")
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
          <el-tag type="success">{{ scope.row.points_value }}</el-tag>
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

    <!--    &lt;!&ndash;    分页&ndash;&gt;-->
    <!--    <el-pagination-->
    <!--      v-show="total > 0"-->
    <!--      :total="total"-->
    <!--      :page="queryParams.current"-->
    <!--      :limit="queryParams.pageSize"-->
    <!--    />-->

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
    <el-dialog v-model="isOpenLearningMaterialDetail" draggable append-to-body>
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
        <el-descriptions-item label="发布用户id">
          <el-tag type="success" round
            >{{ learningMaterialDetail.user_id }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="更新用户id">
          <el-tag type="success" round
            >{{ learningMaterialDetail.updated_user_id }}
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
  </div>
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
import { ElMessage } from "element-plus";

//总数
const total = ref(50);
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
  userId: "" as any,
  updatedUserId: "" as any,
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
    queryParams.value
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
  queryParams.value.userId = "";
  queryParams.value.updatedUserId = "";
  queryParams.value.pointsValue = "";
  queryParams.value.all_Num = "";
  queryParams.value.join_Num = "";
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
  isOpenRuleDetail.value = true;
  getRuleById(id);
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
  updated_user_id: "",
  user_id: "",
  video_url: "",
});
const showLearningMaterialDetail = (id: number) => {
  getLearningMaterialById(id);
  isOpenLearningMaterialDetail.value = true;
};
//获取学习资料信息
const getLearningMaterialById = async (id: number) => {
  const res =
    await LearningMaterialsControllerService.getLearningMaterialsByIdUsingGet(
      id
    );
  if (res.code === 0) {
    learningMaterialDetail.value = res.data as any;
  } else ElMessage.error("查询学习资料信息失败，" + res.message);
};
</script>

<style scoped>
#TaskInfoView {
}
</style>
