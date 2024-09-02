<template>
  <div id="userDetailDrawer">
    <el-drawer
      @close="props.handleCloseDrawer()"
      :model-value="props.isOpen"
      size="60%"
      destroy-on-close
    >
      <template #header>
        <span style="font-weight: bolder">{{ props.title }}</span>
      </template>
      <div style="display: inline-flex">
        <el-image
          :src="'https://thirdwx.qlogo.cn/mmopen/vi_32/dKtc6VAjUGHh7rMaiarIdSA70g7uU2pCQUV9c7Eu1K2jkom9Fw8cM0WlFB5TFFmeBh5TNBTlXqx1zOOG2Hmgic9g/132'"
          style="width: 5vw"
        />
        <div style="align-content: center; margin-left: 1vw">
          <div style="margin-bottom: 2vh">181****5242</div>
          <el-row style="width: 52vw">
            <el-col :span="5">总积分：</el-col>
            <el-col :span="6">总任务接取数：</el-col>
            <el-col :span="5">总获取积分：</el-col>
          </el-row>
          <el-row style="width: 52vw">
            <el-col :span="5">总经验：</el-col>
            <el-col :span="6">本月完成任务数：</el-col>
            <el-col :span="5">本月获取积分：</el-col>
          </el-row>
        </div>
      </div>
      <el-tabs style="height: 72vh; width: 57vw" v-model="activeName">
        <el-tab-pane :label="'用户信息'" name="user">
          <user-info-detail />
        </el-tab-pane>
        <el-tab-pane :label="'积分明细'" name="point">
          <point-info-detail />
        </el-tab-pane>
        <el-tab-pane :label="'签到记录'" name="checkIn"></el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { withDefaults, defineProps, ref } from "vue";
import UserInfoDetail from "@/components/user/userManagement/detailTabPane/userInfoDetail.vue";
import PointInfoDetail from "@/components/user/userManagement/detailTabPane/pointInfoDetail.vue";

interface Props {
  isOpen: boolean; //是否开启该抽屉
  title: string; //抽屉标题
  handleCloseDrawer: () => void; //触发关闭时传递信息
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  title: "用户详情",
  handleCloseDrawer: () => {
    console.log();
  },
});

//当前选中的tab
const activeName = ref("user");
</script>

<style scoped>
#userDetailDrawer {
}
</style>
