<template>
  <div id="protocolSetting">
    <el-tabs style="height: 72vh; width: 82vw" v-model="activeName">
      <el-tab-pane :label="'隐私协议'" name="secret">
        <protocol-setting-view
          :title="'隐私协议'"
          :type="ProtocolType.SECRET"
          :protocol-content="protocolContent.secret"
          :hand-change-content="(v) => (protocolContent.secret = v)"
        />
      </el-tab-pane>
      <el-tab-pane :label="'用户协议'" name="user">
        <protocol-setting-view
          :title="'用户协议'"
          :type="ProtocolType.USER"
          :protocol-content="protocolContent.user"
          :hand-change-content="(v) => (protocolContent.user = v)"
        />
      </el-tab-pane>
      <el-tab-pane :label="'注销协议'" name="logout">
        <protocol-setting-view
          :title="'注销协议'"
          :type="ProtocolType.LOGOUT"
          :protocol-content="protocolContent.logout"
          :hand-change-content="(v) => (protocolContent.logout = v)"
        />
      </el-tab-pane>
      <el-tab-pane :label="'积分协议'" name="point">
        <protocol-setting-view
          :title="'积分协议'"
          :type="ProtocolType.POINT"
          :protocol-content="protocolContent.point"
          :hand-change-content="(v) => (protocolContent.point = v)"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import ProtocolSettingView from "@/components/setting/protocolSetting/protocolSettingView.vue";
import { SysConfigControllerService } from "../../../../generated/services/SysConfigControllerService";
import { ElLoading, ElMessage, ElNotification } from "element-plus";
import store from "@/store";
import { ProtocolType } from "@/Consant/ProtocolTypeConstant";

//标签页展示的页面
const activeName = ref("secret");
//协议内容
const protocolContent = ref<{
  secret: string;
  user: string;
  logout: string;
  point: string;
  [key: string]: string;
}>({
  secret: "",
  user: "",
  logout: "",
  point: "",
});

/*读取协议数据*/
watch(
  () => activeName.value,
  () => {
    getProtocolByType(activeName.value);
  }
);
//根据类型获取协议信息
const getProtocolByType = async (type: string) => {
  const loading = ElLoading.service({
    lock: true,
    text: "玩命加载中...",
    background: "rgba(0, 0, 0, 0.1)",
  }); //创建加载动画
  const res = await SysConfigControllerService.getProtocolByTypeUsingGet(type);
  if (res.code === 0) {
    protocolContent.value[type] = res.data.content;
  } else ElMessage.error("协议信息加载失败，" + res.message);
  loading.close(); //关闭加载
};

onMounted(() => {
  getProtocolByType(ProtocolType.SECRET);
});
</script>

<style scoped>
#protocolSetting {
  background-color: white;
  padding: 1vh 1vw;
}
</style>
