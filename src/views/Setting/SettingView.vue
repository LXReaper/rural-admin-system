<template>
  <div id="SettingView">
    <el-row>
      <el-col :span="2">
        <el-scrollbar style="height: 80vh; width: 8vw">
          <setting-menu-component />
        </el-scrollbar>
      </el-col>
      <el-col :span="22">
        <!--        设置窗口-->
        <div class="settingWin">
          <system-setting v-if="curActive === 'system'" />
          <protocol-setting v-if="curActive === 'protocol'" />
          <message-setting v-if="curActive === 'notice'" />
          <!--          页脚-->
          <footer-layout />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import SettingMenuComponent from "@/components/setting/settingMenuComponent.vue";
import store from "@/store";
import SystemSetting from "@/components/setting/systemSetting/systemSetting.vue";
import ProtocolSetting from "@/components/setting/protocolSetting/protocolSetting.vue";
import FooterLayout from "@/layout/footerLayout.vue";
import MessageSetting from "@/components/setting/messageSetting/messageSetting.vue";

//实时获取到当前的页面
const curActive = ref(store.state.settingsData.settingsData.curActive);
watch(
  () => store.state.settingsData.settingsData.curActive,
  () => {
    curActive.value = store.state.settingsData.settingsData.curActive;
  }
);
</script>

<style scoped>
#SettingView {
}

.settingWin {
  background-color: #f0f2f5;
  width: 85vw;
  height: 83vh;
  padding: 1vh 1vw;
}
</style>
