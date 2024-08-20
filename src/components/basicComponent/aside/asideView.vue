<template>
  <!--  固定的侧边栏-->
  <div id="asideView">
    <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="true">
      <el-menu-item index="1">
        <el-icon>
          <House />
        </el-icon>
        <template #title>主页</template>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon>
          <User />
        </el-icon>
        <template #title>用户</template>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon>
          <List />
        </el-icon>
        <template #title>任务</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon>
          <Star />
        </el-icon>
        <template #title>积分</template>
      </el-menu-item>
      <el-menu-item index="5">
        <el-icon>
          <Shop />
        </el-icon>
        <template #title>商品</template>
      </el-menu-item>
      <el-menu-item index="6">
        <el-icon>
          <Reading />
        </el-icon>
        <template #title>学习</template>
      </el-menu-item>
      <el-menu-item index="7">
        <el-icon>
          <Bell />
        </el-icon>
        <template #title>客服</template>
      </el-menu-item>
      <el-menu-item index="8">
        <el-icon>
          <Setting />
        </el-icon>
        <template #title>设置</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {
  Bell,
  House,
  List,
  Reading,
  Setting,
  Shop,
  Star,
  User,
} from "@element-plus/icons-vue";
</script>

<style scoped>
#asideView {
}
</style>
