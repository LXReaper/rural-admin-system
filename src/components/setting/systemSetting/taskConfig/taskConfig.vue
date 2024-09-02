<template>
  <div id="taskConfig">
    <el-form>
      <el-form-item :label="'AI辅助开关：'">
        <div style="white-space: pre-wrap">
          <el-radio-group v-model="taskConfigForm.aiCheckTaskSwitch">
            <el-radio :value="1">开启</el-radio>
            <el-radio :value="0">关闭</el-radio>
          </el-radio-group>
          <div v-if="taskConfigForm.aiCheckTaskSwitch">
            <div style="color: #aaaaaa; font-weight: bolder">
              AI系统预设提示词：
            </div>
            <el-input
              type="textarea"
              :maxlength="1000"
              v-model="taskConfigForm.aiPreSysPrompt"
              input-style="max-height: 30vh; height: 30vh"
              style="width: 25vw"
              show-word-limit
            />
          </div>
          <div class="tips-info">
            AI辅助审核任务开关，开启后会使用AI审核目前还未审核的任务，判断任务是否符合规则
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="submit"
          color="#0256ff"
          type="primary"
          style="margin-left: 5vw"
          >提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { defineProps, onMounted, ref, watch, withDefaults } from "vue";
import { SysConfigControllerService } from "../../../../../generated/services/SysConfigControllerService";
import { ElLoading, ElMessage, ElNotification } from "element-plus";
import store from "@/store";

interface Props {
  search: boolean; //判断是否跳转到该页面
}

const props = withDefaults(defineProps<Props>(), {
  search: false,
});

//任务配置表单
const taskConfigForm = ref({
  aiCheckTaskSwitch: 0, //ai辅助开关
  aiPreSysPrompt: "", //ai预设系统提示词
});

//获取AI配置信息
const getAIConfig = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: "玩命加载中...",
    background: "rgba(0, 0, 0, 0.1)",
  }); //创建加载动画
  const res = await SysConfigControllerService.getAIConfigUsingGet();
  if (res.code === 0) {
    taskConfigForm.value.aiCheckTaskSwitch = res.data.isOpen;
    taskConfigForm.value.aiPreSysPrompt = res.data.aiPreSysPrompt;
  } else ElMessage.error("ai配置加载失败");
  loading.close(); //关闭加载
};

//监听外部tabs是否选中了此页面
watch(
  () => props.search,
  () => {
    //每次进入该页面就加载一次ai配置
    if (props.search) getAIConfig();
  }
);
onMounted(() => {
  getAIConfig();
});

/*
 * 更新配置信息
 */
const submit = () => {
  updateAIConfig().then((res) => {
    if (res) ElNotification.success("任务配置更新成功");
    else return;
  });
};

//更新ai配置
const updateAIConfig = async () => {
  const res = await SysConfigControllerService.updateAIConfigUsingPost({
    isOpen: taskConfigForm.value.aiCheckTaskSwitch,
    aiPreSysPrompt: taskConfigForm.value.aiPreSysPrompt,
    userId: store.state.user.loginUser.villager_id,
  });
  if (res.code !== 0) {
    ElMessage.error("更新失败，" + res.message);
    return false;
  } else await getAIConfig();
  return true;
};
</script>

<style scoped>
#taskConfig {
}

.tips-info {
  line-height: 18px;
  margin-top: 3px;
  color: #c0c4cc;
  font-size: 12px;
}
</style>
