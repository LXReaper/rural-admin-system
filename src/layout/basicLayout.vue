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
              <el-empty v-if="!noticesList.length">
                <template #description>没有消息</template>
              </el-empty>
              <div v-for="(item, i) in noticesList" :key="i">
                <div
                  v-if="i < 3"
                  :style="{
                    cursor: 'pointer',
                    borderBottom: '1px solid #d5d5d5',
                    borderTop: '1px solid #d5d5d5',
                  }"
                  :class="{ noticeHoverBg: highlightedIndex == i }"
                  @mouseover="highlightedIndex = i"
                  @mouseout="highlightedIndex = -1"
                  @dblclick="openCurNotice(item)"
                >
                  <el-space direction="horizontal" style="height: 66px">
                    <el-avatar style="background-color: #ffc107">
                      <el-icon>
                        <ChatDotRound />
                      </el-icon>
                    </el-avatar>
                    <div>
                      <el-space direction="horizontal">
                        <!--                        发送人名字-->
                        <el-tag round color="#00cfe8" style="color: white"
                          >{{ item.user }}
                        </el-tag>
                        <!--                        标题-->
                        <span>{{ item.title }}</span>
                      </el-space>
                      <!--                      内容-->
                      <div>
                        {{
                          item.content.length > 20
                            ? item.content.substring(0, 20) + "..."
                            : item.content
                        }}
                      </div>
                    </div>
                  </el-space>
                </div>
              </div>
              <div
                style="text-align: right; margin-top: 1vh"
                v-if="noticesSize > 3"
              >
                <text class="showMore">查看更多</text>
              </div>
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

    <el-dialog v-model="openNotice" width="600px" append-to-body>
      <template #title>
        <text style="color: #37b571">站内信息</text>
      </template>
      <div style="border-top: 1px solid #1e1e1e">
        <h1>
          {{ curShowNotice?.title }}
        </h1>
        <el-space direction="horizontal">
          <text>发布人：{{ curShowNotice?.user }}</text>
          <text>&nbsp;&nbsp;{{ curShowNotice?.publish_date }}</text>
        </el-space>
        <div
          style="
            font-size: 17px;
            margin-top: 2vh;
            border-bottom: 1px solid #f6f6f6;
          "
        >
          {{ curShowNotice?.content }}
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <button
            type="primary"
            class="noticeIsRead"
            @click="setIsRead(curShowNotice.id)"
          >
            确认已读
          </button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  ChatDotRound,
  Discount,
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
  ElNotification({
    title: (meg.includes("系统") ? "系统" : "") + "通知",
    message:
      meg.includes("[内容]:确认已读") &&
      meg.split("[内容]:确认已读").length == 2
        ? "消息已读"
        : "收到一份通知",
    type: "info",
    duration: 1000,
    showClose: false,
  });
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
  pageSize: 100,
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
/**
 * 消息面板
 */
const highlightedIndex = ref(-1); //需要高亮的消息div下标
/**
 * 消息对话框
 */
const openNotice = ref(false);
const curShowNotice = ref();

//打开消息对话框
const openCurNotice = (item: any) => {
  curShowNotice.value = item;
  openNotice.value = true;
};
//标记通知已读
const setIsRead = async (id: number) => {
  const res = await NoticesControllerService.setReadNotificationsUsingPost(id);
  if (res.code !== 0) ElMessage.error("通知信息已读失败，" + res.message);
  openNotice.value = false;
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
</style>
