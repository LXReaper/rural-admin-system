<template>
  <template v-if="route.path.startsWith('/user')">
    <login-layout />
  </template>
  <template v-else>
    <basic-layout />
  </template>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layout/basicLayout.vue";
import { useStore } from "vuex";
import checkAuthority from "@/access/checkAuthority";
import AuthorityCtrl from "@/access/authorityCtrl";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { OpenAPI } from "../generated";
import LoginLayout from "@/layout/loginLayout.vue";

const route = useRoute();
const store = useStore();
const userExample = store.state.user.loginUser;
//连接后端
const initWebSocket = () => {
  store.dispatch(
    "websocketMessageData/setNoticeSocket",
    new WebSocket(
      `ws://${OpenAPI.BASE.substring(
        7,
        OpenAPI.BASE.lastIndexOf(":")
      )}:8021/api/user/sendNotices`
    )
  );
};
const diInit = () => {
  console.log("乡村积分治理平台后端系统");
  initWebSocket();
  store.dispatch("user/getLoginUserFromBackend").then((res) => {
    console.log();
  }); //拿到用户信息
};
onMounted(() => {
  diInit();
});
</script>
