<template>
  <div id="settingMenuComponent">
    <el-row>
      <el-col :span="12">
        <el-space style="margin-left: 1vw" direction="horizontal">
          <el-icon>
            <Setting />
          </el-icon>
          <h4>Setting</h4>
        </el-space>
        <el-menu style="width: 8vw" :default-active="'system'">
          <el-menu-item @click="menuItemOnclick" :index="'system'">
            <template #title>系统设置</template>
          </el-menu-item>
          <el-menu-item @click="menuItemOnclick" :index="'notice'">
            <template #title>消息管理</template>
          </el-menu-item>
          <el-menu-item @click="menuItemOnclick" :index="'protocol'">
            <template #title>协议设置</template>
          </el-menu-item>
          <el-sub-menu :index="'adminAuthority'">
            <template #title>
              <text style="margin-left: 0.9vw">管理权限</text>
            </template>
            <el-menu-item-group style="background-color: white !important">
              <el-menu-item @click="menuItemOnclick" :index="'role'">
                <template #title>角色管理</template>
              </el-menu-item>
              <el-menu-item @click="menuItemOnclick" :index="'adminList'">
                <template #title>管理员列表</template>
              </el-menu-item>
              <el-menu-item
                @click="menuItemOnclick"
                :index="'authoritySetting'"
              >
                <template #title>权限设置</template>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { Setting } from "@element-plus/icons-vue";
import store from "@/store";

//菜单选项被选中后的事件
const menuItemOnclick = (item: any) => {
  store.dispatch("settingsData/setCurActive", item.index);
};
</script>

<style scoped>
#settingMenuComponent {
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
