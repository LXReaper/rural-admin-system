<template>
  <div id="VillagerInfoView">
    <el-row>
      <el-col :span="2">
        <el-scrollbar style="height: 80vh; width: 8vw">
          <user-menu-component />
        </el-scrollbar>
      </el-col>
      <el-col :span="22">
        <!--        设置窗口-->
        <div class="settingWin">
          <user-management v-if="curActive === 'userManagement'" />
          <online-user v-if="curActive === 'onlineUser'" />
          <user-setting v-if="curActive === 'userSetting'" />
          <!--          页脚-->
          <footer-layout />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import FooterLayout from "@/layout/footerLayout.vue";
import { ref, watch } from "vue";
import store from "@/store";
import UserManagement from "@/components/user/userManagement/userManagement.vue";
import UserMenuComponent from "@/components/user/userMenuComponent.vue";
import UserSetting from "@/components/user/userSetting/userSetting.vue";
import OnlineUser from "@/components/user/onlineUser/onlineUser.vue";

//实时获取到当前的页面
const curActive = ref(store.state.user.userMenuData.curActive);
watch(
  () => store.state.user.userMenuData.curActive,
  () => {
    curActive.value = store.state.user.userMenuData.curActive;
  }
);
</script>

<style scoped>
#VillagerInfoView {
}

.settingWin {
  background-color: #f0f2f5;
  width: 85vw;
  height: 83vh;
  padding: 1vh 1vw;
}
</style>
