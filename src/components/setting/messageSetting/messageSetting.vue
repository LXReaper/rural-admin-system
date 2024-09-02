<template>
  <div id="messageSetting">
    <el-tabs style="height: 72vh; width: 82vw">
      <el-tab-pane label="自定义通知">
        <custom-notice-config />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import CustomNoticeConfig from "@/components/setting/messageSetting/customNoticeConfig.vue";
</script>

<style scoped>
#messageSetting {
  background-color: white;
  padding: 1vh 1vw;
}
</style>
