<template>
  <!--  发布公告-->
  <div id="publishAnnouncementView">
    <el-icon style="cursor: pointer" size="25" @click="publishAnnouncement">
      <DataAnalysis />
    </el-icon>
  </div>
  <!--  公告新建对话框-->
  <el-dialog
    v-model="openAddAnnouncementDialog"
    :before-close="closeAnnouncementAddDialog"
    append-to-body
    destroy-on-close
    :fullscreen="true"
  >
    <template #title>
      <el-space direction="horizontal">
        <el-icon size="20">
          <DataAnalysis />
        </el-icon>
        <span>&nbsp;发布公告</span>
      </el-space>
    </template>

    <!--    添加公告表单-->
    <el-form :model="announcement" style="width: 80vw" :rules="rules">
      <el-form-item label="公告标题：" prop="title">
        <el-input v-model="announcement.title" style="width: 60vw"></el-input>
      </el-form-item>
      <el-form-item label="公告类型：" prop="announcement_type">
        <el-select
          v-model="announcement.announcement_type"
          placeholder="请选择公告类型"
          size="default"
          style="width: 240px"
          @change="changeAnnouncementType"
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
        <el-input v-model="announcement.image_url" style="width: 60vw" />
      </el-form-item>
      <el-form-item label="公告内容：" prop="content">
        <el-row
          v-if="
            announcement.announcement_type &&
            announcement.announcement_type !== ANNOUNCEMENT_TYPE[2].value
          "
        >
          <el-col :span="15">
            <my-editor
              :value-html="announcement.content"
              :max-length="15000"
              :width="'50vw'"
              :height="'57.5vh'"
              :placeholder="'请输入公告内容'"
              :handle-change-text="(text) => (textContent = text)"
              :handle-change-html="(html) => (announcement.content = html)"
            />
          </el-col>
          <el-col style="margin-left: 1vw" :span="3">
            <div
              style="
                width: 20vw;
                height: 64vh;
                border: 1px solid #dadada;
                padding: 1vh 1vw;
                border-radius: 2vw;
              "
            >
              <h4 class="Title">预览</h4>
              <el-scrollbar style="height: 62vh">
                <div
                  style="overflow-wrap: break-word"
                  v-html="announcement.content"
                />
              </el-scrollbar>
            </div>
          </el-col>
        </el-row>
        <el-input
          type="textarea"
          v-model="announcement.content"
          placeholder="请输入公告内容"
          v-else
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="success" @click="uploadAnnouncement">提交</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {
  DataAnalysis,
  DataBoard,
  Notification,
  Promotion,
  View,
} from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import store from "@/store";
import { AnnouncementsControllerService } from "../../../../generated";
import { ANNOUNCEMENT_TYPE } from "@/defaultData/DefaultData";
import MyEditor from "@/components/wangEditor/myEditor.vue";
import html2canvas from "html2canvas";

/**
 * 公告对话框
 */
//公告内容的Text文本
const textContent = ref();
//公告内容是否预览
const preview = ref(false);
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
  preview.value = false;
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
    openAddAnnouncementDialog.value = false;
  } else ElNotification.error("公告发布失败，" + res.message);
};

//选择公告类型
const changeAnnouncementType = () => {
  if (announcement.value.announcement_type === ANNOUNCEMENT_TYPE[2].value)
    announcement.value.content = textContent.value;
};
</script>

<style scoped>
#hiddenDiv {
  text-align: justify;
  word-wrap: break-word;
  width: 400px;
}

.Title {
  user-select: none;
  height: 0;
  margin: 1px auto 30px auto;
  text-align: center;
  color: #707070;
}
</style>
