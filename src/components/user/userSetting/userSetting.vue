<template>
  <div id="userSetting">
    <el-tabs style="height: 72vh; width: 82vw" v-model="activeName">
      <el-tab-pane label="用户等级配置" name="level"></el-tab-pane>
      <el-tab-pane></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const activeName = ref("level");
</script>

<style scoped>
#userSetting {
  background-color: white;
  padding: 1vh 1vw;
}
</style>
