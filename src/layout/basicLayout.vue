<template>
  <div id="basicLayout">
    <div style="max-height: 40px; height: 40px">
      <div>
        <text style="font-weight: bolder; font-size: 20px"
          >乡村积分治理后端管理系统
        </text>
      </div>
      <div style="text-align: right; margin-top: -25px">
        <el-space direction="horizontal" style="padding-left: 90%">
          <el-avatar :src="loginUser.avatar" style="cursor: pointer" />
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
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { ref, watch } from "vue";
import BasicMenu from "@/components/basicComponent/basicMenu.vue";
import store from "@/store";
import router from "@/router";
import { UserControllerService } from "../../generated";
import { ElMessage } from "element-plus";

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
  await router.push({
    path: "/user",
  });
  const res = await UserControllerService.userLogoutUsingPost();
  if (res === 0) {
    await store.dispatch("user/getLoginUser");
    window.location.reload();
  }
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
</style>
