<template>
  <div id="basicLayout">
    <el-container>
      <el-aside :style="{ width: leftMenu }">
        <basic-menu :is-collapse="isCollapse" />
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
import {
  ArrowLeft,
  ArrowRight,
  Avatar,
  Checked,
  CircleCheckFilled,
  Comment,
  DataBoard,
  Document,
  GoodsFilled,
  House,
  List,
  Notebook,
  Reading,
  ShoppingCart,
  Stamp,
  Star,
  StarFilled,
  User,
} from "@element-plus/icons-vue";
import { ref, watch } from "vue";
import BasicMenu from "@/components/basicComponent/basicMenu.vue";

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
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 98vh;
}

#basicLayout {
  min-height: 98vh;
  height: 98vh;
}
</style>
