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
        <el-input
          v-model="announcement.image_url"
          style="width: 60vw"
        ></el-input>
      </el-form-item>
      <el-form-item label="公告内容：" prop="content">
        <div
          v-if="
            announcement.announcement_type &&
            announcement.announcement_type !== ANNOUNCEMENT_TYPE[2].value
          "
        >
          <my-editor
            :value-html="announcement.content"
            :max-length="5000"
            :width="'71vw'"
            :placeholder="'请输入公告内容'"
            :handle-change-html="(html) => (announcement.content = html)"
          />
          <div style="margin: 2vh 0">
            <el-button
              type="primary"
              @click="
                () => {
                  preview = true;
                  transformContentToCanvas();
                }
              "
            >
              <el-icon>
                <View />
              </el-icon>
              &nbsp;预览
            </el-button>
          </div>
          <!--  （用于临时存放公告内容的）-->
          <el-scrollbar
            v-if="preview"
            style="
              border: 1px solid #dad2d1;
              width: 65vw;
              height: 40vh;
              overflow-y: visible;
              overflow-x: visible;
            "
          >
            <div id="hiddenDiv"></div>
          </el-scrollbar>
          <!--        <el-image :src="htmlContent"></el-image>-->
        </div>
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
import { AnnouncementsControllerService } from "../../../generated";
import { ANNOUNCEMENT_TYPE } from "@/defaultData/DefaultData";
import MyEditor from "@/components/wangEditor/myEditor.vue";
import html2canvas from "html2canvas";

/**
 * 公告对话框
 */
//公告内容的html文本
const htmlContent = ref();
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
  } else ElNotification.error("公告发布失败，" + res.message);
  openAddAnnouncementDialog.value = false;
};

//将公告内容转图片
const transformContentToCanvas = () => {
  let html = announcement.value.content as string;
  //1、先查询到一个隐藏div中的元素
  let hiddenDiv = document.querySelector("#hiddenDiv");
  let myAnnouncement = document.querySelector("#myAnnouncement");
  if (hiddenDiv) {
    //2、接判断hiddenDiv中是否有myAnnouncement，有就删除myAnnouncement
    if (myAnnouncement) hiddenDiv.removeChild(myAnnouncement);
    //3、然后将富文本编辑器中获取的html文本内容加上<div id="myAnnouncement"></div>,然后合并到隐藏的div中
    html = `<div id="myAnnouncement">${html}</div>`;
    // console.log(html);
    hiddenDiv.innerHTML = html.replace(/<p>/g, "<p>");
    // 使用DOM解析器创建DOM结构
    // console.log(hiddenDiv);

    //画成图
    // html2canvas(hiddenDiv as any, {
    //   backgroundColor: null, // null 表示设置背景为透明色
    //   allowTaint: true,
    //   logging: false,
    //   useCORS: true,
    //   width: 400,
    //   height: 400,
    //   scale: 4, //按比例增加分辨率
    // })
    //   .then((canvas) => {
    //     htmlContent.value = canvas.toDataURL("image/jpg", 1.0);
    //     // console.log(htmlContent.value);
    //     // announcement.value.content = htmlContent.value;
    //   })
    //   .catch((error) => {
    //     console.log("html文本转换错误" + error);
    //   });
  }
};
</script>

<style scoped>
#hiddenDiv {
  text-align: justify;
  word-wrap: break-word;
  width: 400px;
}
</style>
