<template>
  <div id="customNoticeConfig">
    <el-button
      type="primary"
      color="#0256ff"
      @click="addNoticeOpen = !addNoticeOpen"
      >添加通知
    </el-button>
    <el-table>
      <el-table-column></el-table-column>
    </el-table>

    <!--    添加通知对话框-->
    <el-dialog
      :title="'添加通知'"
      v-model="addNoticeOpen"
      style="height: 28vh; width: 30vw"
      append-to-body
      destroy-on-close
    >
      <el-form style="width: 25vw; margin-left: 2vw">
        <el-form-item :label="'触发位置：'">
          <el-select :placeholder="'请选择触发位置'"></el-select>
        </el-form-item>
        <el-form-item :label="'名称：'">
          <el-input :placeholder="'请填写消息名称'" />
        </el-form-item>
        <el-form-item :label="'消息图标'">
          <el-select :placeholder="'请选择消息的图标'"></el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addNoticeOpen = false">取消</el-button>
        <el-button color="#0256ff" type="primary" @click="addNotice"
          >确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

//添加通知配置对话框
const addNoticeOpen = ref(false);

//添加通知配置
const addNotice = () => {
  addNoticeOpen.value = false;
};
</script>

<style scoped>
#customNoticeConfig {
}
</style>
