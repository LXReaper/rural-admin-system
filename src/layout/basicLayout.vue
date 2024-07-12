<template>
  <div id="basicLayout" style="overflow-y: hidden">
    <div style="max-height: 40px; height: 40px">
      <div>
        <el-space direction="horizontal">
          <img src="../assets/logo.png" style="width: 40px; height: 40px" />
          <text style="font-weight: bolder; font-size: 20px"
            >乡村积分治理后端管理系统
          </text>
        </el-space>
      </div>
      <div style="text-align: right; margin-top: -25px">
        <el-space direction="horizontal" style="padding-left: 73%">
          <div
            style="margin-right: 5vw"
            v-if="store.state.user.loginUser.villager_id"
          >
            <!--            发布公告-->
            <publish-announcement-view />
          </div>
          <div
            style="margin-right: 5vw"
            v-if="store.state.user.loginUser.villager_id"
          >
            <!--            发布任务-->
            <publish-task-view />
          </div>
          <div
            style="margin-right: 5vw"
            v-if="store.state.user.loginUser.villager_id"
          >
            <!--            通知-->
            <notice-list-view />
          </div>
          <el-avatar
            :src="store.state.user.loginUser.avatar"
            style="cursor: pointer"
          />
          <span style="cursor: pointer; color: red" @click="logout"
            >退出登录
          </span>
        </el-space>
      </div>
    </div>
    <el-container style="max-height: 95vh">
      <el-aside :style="{ width: leftMenu }">
        <basic-menu
          :is-collapse="isCollapse"
          style="
            overflow-x: hidden;
            scrollbar-width: thin;
            scrollbar-color: transparent transparent;
          "
        />
      </el-aside>
      <el-container>
        <el-header>
          <el-button @click="onCollapse" circle>
            <el-icon v-if="!isCollapse">
              <ArrowLeft />
            </el-icon>
            <el-icon v-else>
              <ArrowRight />
            </el-icon>
          </el-button>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>by JKTeam 2024</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { onMounted, ref, watch } from "vue";
import BasicMenu from "@/components/basicComponent/basicMenu.vue";
import store from "@/store";
import router from "@/router";
import { OpenAPI, UserControllerService } from "../../generated";
import NoticeListView from "@/components/basicComponent/noticeListView.vue";
import PublishTaskView from "@/components/basicComponent/publishTaskView.vue";
import PublishAnnouncementView from "@/components/basicComponent/publishAnnouncementView.vue";

const loginUser = ref(store.state.user.loginUser);
const userName = ref(store.state.user.loginUser.villager_name);
const isCollapse = ref(false); //是否收起侧边栏
const leftMenu = ref("200px");
watch(
  () => isCollapse.value,
  () => {
    leftMenu.value = isCollapse.value ? "64px" : "200px";
  }
);
const onCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

const logout = async () => {
  const res = await UserControllerService.userLogoutUsingPost();
  if (res === 0) {
    await store.dispatch("user/getLoginUser");
    window.location.reload();
  }
  await router.push({
    path: "/user",
  });
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 98vh;
}

#basicLayout {
  min-height: 98vh;
  height: 98vh;
  max-height: 98vh;
}

/*通知栏展示更多的样式*/
.showMore {
  cursor: pointer;
  color: #111111;
}

.showMore:hover {
  color: #ab2a1a;
}

/*通知hover的交互背景色*/
.noticeHoverBg {
  background: #f8f8f8;
}

/*通知信息对话框中确认已读按钮交互样式*/
.noticeIsRead {
  cursor: pointer;
  border-radius: 5px;
  background-color: #37b5c1;
  border-color: #37b5c1;
  color: white;
  width: 100px;
  height: 38px;
}

.noticeIsRead:hover {
  box-shadow: 0 4px 5px rgba(37, 181, 193, 5);
}

/*更多通知栏的hover的交互背景色*/
.moreNoticeHoverBg {
  background: #f8f8f8;
}
</style>
