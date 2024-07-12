<template>
  <!--  发布公告-->
  <div id="publishAnnouncementView">
    <el-icon style="cursor: pointer" size="25" @click="publishAnnouncement">
      <Notification />
    </el-icon>
  </div>
  <!--  公告新建对话框-->
  <el-dialog
    v-model="openAddAnnouncementDialog"
    :before-close="closeAnnouncementAddDialog"
    style="width: 45vw"
    append-to-body
    destroy-on-close
  >
    <template #title>
      <el-icon size="20">
        <Notification />
      </el-icon>
      <span>&nbsp;发布公告</span>
    </template>
    <el-form :model="announcement" style="width: 40vw" :rules="rules">
      <el-form-item label="公告标题：" prop="title">
        <el-input v-model="announcement.title"></el-input>
      </el-form-item>
      <el-form-item label="公告内容：" prop="content">
        <my-editor
          :value-html="announcement.content"
          :max-length="5000"
          :placeholder="'请输入公告内容'"
          :handle-change="(v) => (announcement.content = v)"
        />
      </el-form-item>
      <el-form-item label="公告类型：" prop="announcement_type">
        <el-select
          v-model="announcement.announcement_type"
          placeholder="请选择公告类型"
          size="default"
          style="width: 240px"
        >
          <el-option
            v-for="item in ANNOUNCEMENT_TYPE"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="公告图片：" prop="image_url">
        <el-input v-model="announcement.image_url"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="success" @click="uploadAnnouncement">提交</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { Notification, Promotion } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import store from "@/store";
import { AnnouncementsControllerService } from "../../../generated";
import { ANNOUNCEMENT_TYPE } from "@/defaultData/DefaultData";
import MyEditor from "@/components/wangEditor/myEditor.vue";

/**
 * 公告对话框
 */
//打开添加公告对话框
const openAddAnnouncementDialog = ref(false);
//请求添加公告参数
const announcement = ref({
  announcement_type: "",
  title: "",
  content: "",
  image_url: "",
});
//规则
const rules = ref({
  title: [{ required: true, message: "输入公告标题", trigger: "blur" }],
  content: [{ required: true, message: "输入公告内容", trigger: "blur" }],
  announcement_type: [
    { required: true, message: "输入公告类型", trigger: "blur" },
  ],
});
//重置请求添加公告参数
const reset = () => {
  announcement.value = {
    announcement_type: "",
    title: "",
    content: "",
    image_url: "",
  };
};
//关闭发布公告对话框
const closeAnnouncementAddDialog = () => {
  //关闭对话框
  openAddAnnouncementDialog.value = false;
  reset();
};
//发布公告
const publishAnnouncement = () => {
  reset();
  openAddAnnouncementDialog.value = true;
};
const uploadAnnouncement = async () => {
  const res = await AnnouncementsControllerService.addAnnouncementsUsingPost({
    ...announcement.value,
    user_id: store.state.user.loginUser.villager_id,
  });
  if (res.code === 0) {
    ElNotification.success("公告已发布");
  } else ElNotification.error("公告发布失败，" + res.message);
  openAddAnnouncementDialog.value = false;
};
</script>

<style scoped></style>
