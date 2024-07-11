<template>
  <!--  通知组件-->
  <div id="noticeListView">
    <el-popover :width="418" trigger="click">
      <el-space direction="horizontal" style="height: 5vh; white-space: nowrap">
        <el-icon size="20">
          <Message />
        </el-icon>
        <span style="font-size: 15px">站内信息</span>
        <div style="margin-left: 12vw" v-if="noticesSize">
          <el-tag type="success" round
            ><span style="font-size: 15px"> {{ noticesSize }}条未读 </span>
          </el-tag>
        </div>
      </el-space>
      <el-empty v-if="!noticesList.length" style="width: 418px">
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
          @click="openCurNotice(item)"
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
      <div style="text-align: right; margin-top: 1vh">
        <text class="showMore" @click="openMoreNotifications"
          >查看所有消息
        </text>
      </div>
      <template #reference>
        <el-badge :value="noticesSize" class="item" :hidden="!noticesSize">
          <el-icon style="cursor: pointer" size="25">
            <Message />
          </el-icon>
        </el-badge>
      </template>
    </el-popover>
  </div>

  <!--    单个消息对话框-->
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
        <text
          >&nbsp;&nbsp;{{
            moment(curShowNotice?.publish_date).format(
              "YYYY年MM月DD日 HH时mm分ss秒"
            )
          }}
        </text>
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
          v-if="!curShowNotice?.is_read"
          @click="setIsRead(curShowNotice.id)"
        >
          确认已读
        </button>
      </div>
    </template>
  </el-dialog>

  <!--    多个消息对话框-->
  <el-dialog v-model="openNoticeMore" width="600px" append-to-body>
    <template #title>
      <el-space direction="horizontal" style="color: #37b571">
        <el-icon>
          <Bell />
        </el-icon>
        <text>&nbsp;所有消息</text>
      </el-space>
    </template>
    <div style="height: 37.5vh; overflow: auto">
      <div v-for="(item, i) in allNotificationsList" :key="i">
        <div
          :style="{
            cursor: 'pointer',
            borderBottom: '1px solid #d5d5d5',
            borderTop: '1px solid #d5d5d5',
          }"
          :class="{ moreNoticeHoverBg: highlightedIndexNotice == i }"
          @mouseover="highlightedIndexNotice = i"
          @mouseout="highlightedIndexNotice = -1"
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
                <span style="font-size: 15px; font-weight: bolder">{{
                  item.title.length > 10
                    ? item.title.substring(0, 10) + "..."
                    : item.title
                }}</span>
                <div>
                  <el-tag type="success" v-if="item?.is_read">已读消息</el-tag>
                  <el-tag type="warning" v-else-if="!item?.is_read"
                    >未读消息
                  </el-tag>
                </div>
                <text style="font-size: 12px">
                  {{ moment(item?.publish_date).format("YYYY年MM月DD日") }}
                </text>
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
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="确定删除这条消息"
            @confirm="deleteNotification(item.id)"
          >
            <template #reference>
              <el-button type="text" style="margin-top: 2vh; margin-left: 1vw"
                >删除通知
              </el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
      <div
        style="cursor: pointer"
        @click="gainMoreNotifications"
        v-if="allNotificationsList.length < totalNotification"
      >
        点击显示更多
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <button
          type="primary"
          class="noticeIsRead"
          @click="openNoticeMore = false"
        >
          确认
        </button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {
  Bell,
  ChatDotRound,
  InfoFilled,
  Message,
} from "@element-plus/icons-vue";
import moment from "moment/moment";
import { NoticesControllerService } from "../../../generated/services/NoticesControllerService";
import { ElMessage, ElNotification } from "element-plus";
import { onMounted, ref } from "vue";
import store from "@/store";
import { OpenAPI } from "../../../generated";

/**
 * 连接websocket
 */
const wxSocket = ref(
  store.state.websocketMessageData.websocketMessage.noticeSocket
);
wxSocket.value.onmessage = function (message: any) {
  const meg = message.data;
  // console.log(meg);
  const notice = JSON.parse(meg);
  console.log(notice);
  ElNotification({
    title: notice.user + "： " + notice.title,
    message: notice.content,
    type: notice.image_url,
    duration: 2000,
    showClose: false,
  });
  loadMessageData();
  if (openNoticeMore.value) listAllNotifications();
};
/**
 * 消息面板
 */
//需要高亮的消息div下标
const highlightedIndex = ref(-1); //消息栏
const highlightedIndexNotice = ref(-1); //更多消息栏
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
 * 更多消息对话框
 */
const openNoticeMore = ref(false);
const openMoreNotifications = async () => {
  await listAllNotifications();
  openNoticeMore.value = true;
};
//获取所有消息请求中显示更多消息数量的增量
const addSizeNum = 5;
//获取所有消息请求
const queryMoreNotifications = ref({
  current: 1,
  pageSize: 5,
});
//查询到的所有消息总数
const totalNotification = ref(0);
//查询到的所有消息数据
const allNotificationsList = ref([]);
//获取所有消息
const listAllNotifications = async () => {
  const res = await NoticesControllerService.listNoticesVoByPageUsingPost({
    current: queryMoreNotifications.value.current,
    pageSize: queryMoreNotifications.value.pageSize,
    user_id: store.state.user.loginUser.villager_id,
    sortField: "update_date",
    sortOrder: "descend",
  });
  if (res.code === 0) {
    allNotificationsList.value = res.data.records;
    totalNotification.value = res.data.total;
  } else ElMessage.error("消息获取失败");
};
//再获取更多消息数据
const gainMoreNotifications = () => {
  queryMoreNotifications.value.pageSize += addSizeNum;
  listAllNotifications();
};
//删除通知信息
const deleteNotification = async (i: number) => {
  const res = await NoticesControllerService.deleteNoticeUsingPost({
    id: i,
  });
  if (res.code === 0) {
    ElMessage.success("通知删除成功");
    await listAllNotifications();
    await loadMessageData();
  } else ElMessage.error("通知删除失败，" + res.message);
};
</script>

<style scoped>
#noticeListView {
}
</style>
