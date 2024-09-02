<template>
  <div id="userMenuComponent">
    <el-row>
      <el-col :span="12">
        <el-space style="margin-left: 1vw" direction="horizontal">
          <el-icon>
            <User />
          </el-icon>
          <h4>User</h4>
        </el-space>
        <el-menu style="width: 8vw" :default-active="'userCount'">
          <el-menu-item @click="menuItemOnclick" :index="'userCount'">
            <template #title>用户统计</template>
          </el-menu-item>
          <el-menu-item @click="menuItemOnclick" :index="'userManagement'">
            <template #title>用户管理</template>
          </el-menu-item>
          <el-menu-item @click="menuItemOnclick" :index="'onlineUser'">
            <template #title>在线用户</template>
          </el-menu-item>
          <el-menu-item @click="menuItemOnclick" :index="'userSetting'">
            <template #title>用户配置</template>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { User } from "@element-plus/icons-vue";
import store from "@/store";

//菜单选项被选中后的事件
const menuItemOnclick = (item: any) => {
  store.dispatch("user/setCurActive", item.index);
};
</script>

<style scoped>
#userMenuComponent {
}

.el-menu {
  margin-left: -1vw;
  padding: 0 1vw;
  width: 8.2vw !important;
  border: none;
}

.el-menu-item {
  width: 7.1vw;
  padding: 0 2vw !important;
}

.el-sub-menu {
  width: 7.1vw;
}
</style>
