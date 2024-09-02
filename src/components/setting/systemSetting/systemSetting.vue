<template>
  <div id="systemSetting">
    <el-tabs style="height: 72vh; width: 82vw" v-model="activeName">
      <el-tab-pane label="基础配置" name="fundamental">
        <basic-setting-config :search="activeName === 'fundamental'" />
      </el-tab-pane>
      <el-tab-pane label="模块配置" name="module">模块</el-tab-pane>
      <el-tab-pane label="签到配置" name="checkIn">
        <check-in-config />
      </el-tab-pane>
      <el-tab-pane label="任务配置" name="task">
        <task-config :search="activeName === 'task'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import CheckInConfig from "@/components/setting/systemSetting/checkInConfig/checkInConfig.vue";
import TaskConfig from "@/components/setting/systemSetting/taskConfig/taskConfig.vue";
import BasicSettingConfig from "@/components/setting/systemSetting/basicConfig/basicSettingConfig.vue";

//标签页展示的页面
const activeName = ref("fundamental");
</script>

<style scoped>
#systemSetting {
  background-color: white;
  padding: 1vh 1vw;
}
</style>
