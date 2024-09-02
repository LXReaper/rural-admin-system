<template>
  <!--  协议预览-->
  <div
    :style="{
      width: props.width,
      height: props.height,
      border: '1px solid #dadada',
      borderRadius: '2vw',
      padding: '1vh 1vw',
    }"
  >
    <h4 class="Title">{{ props.title }}</h4>
    <el-scrollbar style="height: 62vh">
      <div style="overflow-wrap: break-word" v-html="props.content" />
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

interface Props {
  width: string;
  height: string;
  title: string;
  content: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: "344px",
  height: "52vh",
  title: "协议预览",
  content: "",
});
</script>

<style scoped>
.Title {
  user-select: none;
  height: 0;
  margin: 1px auto 30px auto;
  text-align: center;
  color: #707070;
}
</style>
