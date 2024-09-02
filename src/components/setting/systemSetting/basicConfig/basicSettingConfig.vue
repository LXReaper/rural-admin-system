<template>
  <div id="basicSettingConfig">
    <el-form>
      <el-form-item :label="'AppKey：'">
        <div style="white-space: pre-wrap">
          <el-input
            type="password"
            v-model="basicSettingConfigForm.appKey"
            style="width: 20vw"
            show-password
          />
          <div class="tips-info">
            AI需要的Appkey，如果开启AI功能就必须要配置
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
import { onMounted, ref, withDefaults, defineProps, watch } from "vue";
import { SysConfigControllerService } from "../../../../../generated/services/SysConfigControllerService";
import { ElLoading, ElMessage, ElNotification } from "element-plus";
import store from "@/store";

interface Props {
  search: boolean; //判断是否跳转到该页面
}

const props = withDefaults(defineProps<Props>(), {
  search: false,
});

//基础配置表单
const basicSettingConfigForm = ref({
  appKey: "",
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
    basicSettingConfigForm.value.appKey = res.data.appKey;
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
    if (res) ElNotification.success("基础配置更新成功");
    else return;
  });
};

//更新ai配置
const updateAIConfig = async () => {
  const res = await SysConfigControllerService.updateAIConfigUsingPost({
    appKey: basicSettingConfigForm.value.appKey,
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
#basicSettingConfig {
}

.tips-info {
  line-height: 18px;
  margin-top: 3px;
  color: #c0c4cc;
  font-size: 12px;
}
</style>
