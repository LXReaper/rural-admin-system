<template>
  <div id="SettingView">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基础配置" name="first"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeName = ref("first");
</script>

<style scoped>
#SettingView {
}
</style>
