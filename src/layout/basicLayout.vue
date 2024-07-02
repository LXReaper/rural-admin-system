<template>
  <div id="basicLayout">
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
        <el-space direction="horizontal" style="padding-left: 85%">
          <div
            style="margin-right: 4vw"
            v-if="store.state.user.loginUser.villager_id"
          >
            <el-popover :width="418" trigger="click">
              <el-space direction="horizontal" style="height: 5vh">
                <span style="font-size: 15px">站内信息</span>
                <div style="margin-left: 13vw" v-if="noticesSize">
                  <el-tag type="success" round
                    ><span style="font-size: 15px">
                      {{ noticesSize }}条未读
                    </span>
                  </el-tag>
                </div>
              </el-space>
              <!--              <el-collapse v-for="(item, i) in noticesList" :key="i">-->
              <!--                <el-collapse-item>-->
              <!--                  <template #title>-->
              <!--                    <el-icon>-->
              <!--                      <ChatDotRound />-->
              <!--                    </el-icon>-->
              <!--                    {{ item.title }}-->
              <!--                  </template>-->
              <!--                  {{ item.content }}-->
              <!--                </el-collapse-item>-->
              <!--              </el-collapse>-->
              <div v-for="(item, i) in noticesList" :key="i">
                <!--                v-if="i < 2"-->
                <div style="cursor: pointer">
                  <div style="height: 10px; border-bottom: 1px solid black" />
                  <el-space direction="horizontal" style="height: 66px">
                    <el-avatar style="background-color: #ffc107">
                      <el-icon>
                        <ChatDotRound />
                      </el-icon>
                    </el-avatar>
                    <el-space direction="vertical">
                      <el-space direction="horizontal">
                        <el-tag round color="#00cfe8" style="color: white"
                          >{{ item.user }}
                        </el-tag>
                        <span>{{ item.title }}</span>
                      </el-space>
                      <span>{{ item.content }}</span>
                    </el-space>
                  </el-space>
                </div>
              </div>
              <div style="height: 10px; border-bottom: 1px solid black" />
              <div>查看更多</div>
              <template #reference>
                <el-badge
                  :value="noticesSize"
                  class="item"
                  :hidden="!noticesSize"
                >
                  <el-icon style="cursor: pointer" size="25">
                    <Message />
                  </el-icon>
                </el-badge>
              </template>
            </el-popover>
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
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  ChatDotRound,
  Message,
} from "@element-plus/icons-vue";
import { onMounted, ref, watch } from "vue";
import BasicMenu from "@/components/basicComponent/basicMenu.vue";
import store from "@/store";
import router from "@/router";
import { OpenAPI, UserControllerService } from "../../generated";
import { ElMessage, ElNotification } from "element-plus";
import { NoticesControllerService } from "../../generated/services/NoticesControllerService";

/**
 * 连接websocket
 */
let wxSocket = new WebSocket(
  `ws://${OpenAPI.BASE.substring(7)}/api/sendNotices`
);
//webSocket连接成功
wxSocket.onopen = function () {
  console.log("WebSocket 连接成功");
};
//webSocket连接失败
wxSocket.onerror = function (ev) {
  console.log("WebSocket 连接失败," + ev);
};
wxSocket.onclose = function (ev) {
  console.log("WebSocket 连接关闭，" + ev);
};
wxSocket.onmessage = function (message) {
  const meg = message.data;
  console.log(meg);
  ElNotification.info("收到一份通知");
  loadMessageData();
};
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

/**
 * 未读通知信息
 */
//通知请求
const queryNotification = ref({
  current: 1,
  pageSize: 50,
  is_read: 0,
  user_id: -1,
});
//请求之后得到的信息
const noticesList = ref([]);
//查询到返回的总数
const noticesSize = ref(0);
//获取当前登录用户的消息
const loadMessageData = async () => {
  const res = await NoticesControllerService.listNoticesVoByPageUsingPost({
    current: queryNotification.value.current,
    pageSize: queryNotification.value.pageSize,
    is_read: queryNotification.value.is_read,
    user_id: store.state.user.loginUser.villager_id,
  });
  if (res.code === 0) {
    noticesList.value = res.data.records;
    noticesSize.value = res.data.records.length;
  } else console.log("用户通知信息获取失败，" + res.message);
};
onMounted(() => {
  store.dispatch("user/getLoginUser").then((res) => {
    loadMessageData();
  });
});
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
</style>
