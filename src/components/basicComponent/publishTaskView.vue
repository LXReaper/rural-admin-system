<template>
  <div id="publishTaskView">
    <el-icon style="cursor: pointer" size="25" @click="publishTask">
      <Promotion />
    </el-icon>
  </div>

  <!--  任务新建对话框-->
  <el-dialog
    v-model="openAddTaskDialog"
    width="600px"
    append-to-body
    destroy-on-close
  >
    <template #title>
      <el-icon size="20">
        <Promotion />
      </el-icon>
      <span>&nbsp;发布任务</span>
    </template>
    <el-form :model="task" :rules="rules">
      <el-form-item label="任务内容：" prop="taskContent">
        <el-input type="textarea" v-model="task.taskContent"></el-input>
      </el-form-item>
      <el-form-item label="积分数：" prop="pointsValue">
        <el-input-number min="0" v-model="task.pointsValue" />
      </el-form-item>
      <el-form-item label="任务接取最大人数：" prop="all_Num">
        <el-input-number min="0" v-model="task.all_Num" />
      </el-form-item>
      <el-form-item label="截止日期：" prop="deadline">
        <el-date-picker
          v-model="task.deadline"
          type="datetime"
          placeholder="选择截止日期"
        />
      </el-form-item>
      <el-form-item label="规则：" prop="ruleId">
        <el-button
          type="text"
          @click="openSelectRules"
          v-if="!task.ruleId || !(task.ruleId as []).length"
          style="text-decoration: underline"
          >选择规则
        </el-button>
        <div v-else-if="(task.ruleId as []).length">
          <text>选择了</text>
          <el-tag>
            {{ (task.ruleId as []).length }}
          </el-tag>
          <text>个</text>
          <el-button
            type="text"
            style="color: red; margin-left: 1vw"
            @click="()=>{
              task.ruleId = '' as any;
              rulesMap = {};
              isClickRule = [];
            }"
            >重置
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="资料：" prop="materialId">
        <el-button
          type="text"
          @click="openSelectMaterial"
          v-if="!task.materialId || !(task.materialId as []).length"
          style="text-decoration: underline"
          >选择资料
        </el-button>
        <div v-else-if="(task.materialId as []).length">
          <text>选择了</text>
          <el-tag>
            {{ (task.materialId as []).length }}
          </el-tag>
          <text>个</text>
          <el-button
            type="text"
            style="color: red; margin-left: 1vw"
            @click="()=>{
              task.materialId = '' as any;
              materialMap = {};
              isClickMaterial = [];
            }"
            >重置
          </el-button>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="success" @click="uploadTask">提交</el-button>
    </template>
  </el-dialog>

  <!--  选择规则抽屉-->
  <el-drawer
    v-model="drawer"
    :direction="'btt'"
    size="650"
    :before-close="handleCloseRules"
  >
    <template #title>
      <span style="text-align: left; font-weight: bolder; font-size: 20px"
        >选择规则
      </span>
    </template>
    <el-input
      v-model="queryRules.ruleContent"
      placeholder="搜索规则"
      @keydown.enter="listRules"
    ></el-input>
    <div style="text-align: left">
      <div
        style="
          height: 6vh;
          border: 1px solid #dad2d1;
          background-color: #f6f6f6;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-top: 1vh;
          cursor: pointer;
        "
        v-for="(item, i) in ruleList"
        @click="selectRule(item, i)"
        @mouseover="isHoverRule = i"
        @mouseout="isHoverRule = -1"
        :class="{
          ruleSelectTab: isHoverRule == i,
          ruleClickTab: isClickRule[i] == i,
        }"
        :key="i"
      >
        <div>
          <div style="text-align: left">
            <el-popover
              placement="top-start"
              :content="item?.rule_content"
              :width="300"
              trigger="hover"
              :disabled="item?.rule_content.length <= 110"
            >
              <template #reference>
                {{
                  item?.rule_content.substring(0, 110) +
                  (item?.rule_content.length > 110 ? "..." : "")
                }}
              </template>
            </el-popover>
            <div>
              <text style="font-size: 13px"
                >~~~每人最大可获取积分点数：{{ item?.rule_points }}
              </text>
            </div>
          </div>
          <div
            style="text-align: right; white-space: nowrap"
            v-if="rulesMap[item.rule_id]"
          >
            <el-icon>
              <Check />
            </el-icon>
          </div>
        </div>
      </div>
      <span
        class="loadMoreText"
        v-if="ruleList.length < rulesTotal"
        @click="loadMoreRules"
        >加载更多
      </span>
    </div>
  </el-drawer>
  <!--  选择资料抽屉-->
  <el-drawer
    v-model="openMaterialDrawer"
    :direction="'btt'"
    size="650"
    :before-close="handleCloseMaterial"
  >
    <template #title>
      <span style="text-align: left; font-weight: bolder; font-size: 20px"
        >选择资料
      </span>
    </template>
    <el-input
      v-model="queryMaterial.text_content"
      placeholder="搜索资料"
      @keydown.enter="listMaterial"
    >
    </el-input>
    <div style="text-align: left">
      <div
        style="
          height: 5vh;
          border: 1px solid #dad2d1;
          background-color: #f6f6f6;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-top: 1vh;
          cursor: pointer;
        "
        v-for="(item, i) in materialList"
        @click="selectMaterial(item, i)"
        @mouseover="isHoverMaterial = i"
        @mouseout="isHoverMaterial = -1"
        :class="{
          materialSelectTab: isHoverMaterial == i,
          materialClickTab: isClickMaterial[i] == i,
        }"
        :key="i"
      >
        <el-popover
          placement="top-start"
          :content="item?.text_content"
          :width="300"
          trigger="hover"
          :disabled="item?.text_content.length <= 110"
        >
          <template #reference>
            <text
              >{{
                item?.text_content.substring(0, 110) +
                (item?.text_content.length > 110 ? "..." : "")
              }}
            </text>
          </template>
        </el-popover>
        <div
          style="text-align: right; white-space: nowrap"
          v-if="materialMap[item.material_id]"
        >
          <el-icon>
            <Check />
          </el-icon>
        </div>
      </div>
      <span
        class="loadMoreText"
        v-if="materialList.length < materialTotal"
        @click="loadMoreMaterial"
        >加载更多
      </span>
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
import { Check, Message, Promotion } from "@element-plus/icons-vue";
import {
  LearningMaterialsControllerService,
  LearningMaterialsVO,
  RulesControllerService,
  TasksControllerService,
} from "../../../generated";
import { ref } from "vue";
import store from "@/store";
import moment from "moment";
import { ElMessage, ElNotification } from "element-plus";
import { RulesVO } from "../../../generated/models/RulesVO";

interface HashTable {
  [key: number]: boolean;
}

/**
 * 规则抽屉
 */
const addRulesQueryNum = 10;
const queryRules = ref({
  current: 1,
  pageSize: 10,
  ruleContent: "",
});
const ruleList = ref([]); //查询得到的规则数据
const rulesTotal = ref(0); //总数
const drawer = ref(false); //是否打开
let rulesMap: HashTable = {}; //选中规则的哈希表
const openSelectRules = () => {
  drawer.value = true;
  listRules();
};
const listRules = async () => {
  const res = await RulesControllerService.listRulesVoByPageUsingPost(
    queryRules.value
  );
  if (res.code === 0) {
    ruleList.value = res.data.records;
    rulesTotal.value = res.data.total;
    for (let i = 0; i < ruleList.value.length; ++i) isClickRule.value.push(-1);
  } else ElMessage.error("规则数据加载失败，" + res.message);
};
const loadMoreRules = () => {
  queryRules.value.pageSize += addRulesQueryNum;
  listRules();
};
//设置规则抽屉的样式
const isHoverRule = ref(-1);
const isClickRule = ref<number[]>([]);
const selectRule = (item: RulesVO, i: number) => {
  rulesMap[item.rule_id as number] = !rulesMap[item.rule_id as number];
  isClickRule.value[i] = isClickRule.value[i] == -1 ? i : -1;
};
//关闭规则对话框前的事件
const handleCloseRules = () => {
  //设置ruleId
  setId(rulesMap, "规则");
  drawer.value = false;
};

/**
 * 资料抽屉
 */
const addMaterialQueryNum = 10;
const queryMaterial = ref({
  current: 1,
  pageSize: 10,
  text_content: "",
});
const materialList = ref([]); //查询得到的资料数据
const materialTotal = ref(0); //总数
const openMaterialDrawer = ref(false); //是否打开
let materialMap: HashTable = {}; //选中资料的哈希表
const openSelectMaterial = () => {
  openMaterialDrawer.value = true;
  listMaterial();
};
const listMaterial = async () => {
  const res =
    await LearningMaterialsControllerService.listLearningMaterialsVoByPageUsingPost(
      queryMaterial.value
    );
  if (res.code === 0) {
    materialList.value = res.data.records;
    materialTotal.value = res.data.total;
    for (let i = 0; i < materialList.value.length; ++i)
      isClickMaterial.value.push(-1);
  } else ElMessage.error("资料数据加载失败，" + res.message);
};
const loadMoreMaterial = () => {
  queryMaterial.value.pageSize += addMaterialQueryNum;
  listMaterial();
};
//设置资料抽屉的样式
const isHoverMaterial = ref(-1);
const isClickMaterial = ref<number[]>([]);
const selectMaterial = (item: LearningMaterialsVO, i: number) => {
  materialMap[item.material_id as number] =
    !materialMap[item.material_id as number];
  isClickMaterial.value[i] = isClickMaterial.value[i] == -1 ? i : -1;
};
//关闭资料对话框前的事件
const handleCloseMaterial = () => {
  //设置materialId
  setId(materialMap, "资料");
  openMaterialDrawer.value = false;
};

/**
 * 任务对话框
 */
//打开添加任务对话框
const openAddTaskDialog = ref(false);
//请求添加任务参数
const task = ref({
  all_Num: 0,
  deadline: "",
  materialId: "",
  pointsValue: 0,
  ruleId: "",
  taskContent: "",
});
//规则
const rules = ref({
  // all_Num: [
  //   {
  //     required: true,
  //     message: "任务总接取数不能为空",
  //     trigger: "blur",
  //   },
  // ],
  deadline: [{ required: true, message: "选择截取时间", trigger: "blur" }],
  // pointsValue: [
  //   { required: true, message: "积分点数不能为空", trigger: "blur" },
  // ],
  ruleId: [{ required: true, message: "参考规则不能为空", trigger: "blur" }],
  taskContent: [
    { required: true, message: "输入任务内容", trigger: "blur" },
    {
      min: 1,
      message: "任务内容不能为空",
      trigger: "blur",
    },
  ],
});
//重置请求添加任务参数
const reset = () => {
  task.value = {
    all_Num: 0,
    deadline: "",
    materialId: "",
    pointsValue: 0,
    ruleId: "",
    taskContent: "",
  };
};
const publishTask = () => {
  reset();
  openAddTaskDialog.value = true;
  console.log();
};
const uploadTask = async () => {
  if (!task.value.deadline) {
    ElNotification.error("任务发布失败，截止日期不能为空");
    openAddTaskDialog.value = false;
    return;
  }
  //设置ruleId和materialId
  setId(rulesMap, "规则");
  const res = await TasksControllerService.tasksAddUsingPost({
    all_Num: task.value.all_Num,
    deadline: moment(task.value.deadline).format("YYYY-MM-DD HH:mm:ss"),
    materialId: task.value.materialId as any,
    pointsValue: task.value.pointsValue,
    publish_date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    ruleId: task.value.ruleId as any,
    taskContent: task.value.taskContent,
    user_id: store.state.user.loginUser.villager_id,
  });
  if (res.code === 0) {
    ElNotification.success("任务已发布");
  } else ElNotification.error("任务发布失败，" + res.message);
  openAddTaskDialog.value = false;
};
//将哈希表中的键（即id）放进任务添加请求中的ruleId或materialId数组中
const setId = (hashtable: HashTable, tag: string) => {
  let tempArray: number[] = [];
  if (tag === "规则") {
    tempArray = [];
    Object.entries(rulesMap).forEach(([key, value]) => {
      if (rulesMap[key as any]) tempArray.push(key as any);
    });
    task.value.ruleId = tempArray as any;
  } else if (tag === "资料") {
    tempArray = [];
    Object.entries(materialMap).forEach(([key, value]) => {
      if (materialMap[key as any]) tempArray.push(key as any);
    });
    task.value.materialId = tempArray as any;
  }
};
</script>

<style scoped>
.loadMoreText {
  cursor: pointer;
  color: #1e1e1e;
}

.ruleSelectTab {
  background-color: #e6f6f6 !important;
  margin-left: 1vw !important;
  box-shadow: 10px 7px 6px rgba(0, 0, 0, 0.1) !important;
}

.materialSelectTab {
  background-color: #e6f6f6 !important;
  margin-left: 1vw !important;
  box-shadow: 10px 7px 6px rgba(0, 0, 0, 0.1) !important;
}

.ruleClickTab {
  background-color: #c6f6f6 !important;
  margin-left: 1vw !important;
  box-shadow: 10px 7px 6px rgba(0, 0, 0, 0.1) !important;
}

.materialClickTab {
  background-color: #c6f6f6 !important;
  margin-left: 1vw !important;
  box-shadow: 10px 7px 6px rgba(0, 0, 0, 0.1) !important;
}
</style>
