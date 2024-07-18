<template>
  <vue3VideoPlay
    :width="props.width"
    :ref="videoPlayer"
    v-bind="options"
    @play="onPlay"
    @pause="onPause"
    @timeupdate="onTimeupdate"
    @canplay="onCanplay"
  />
</template>

<script setup lang="ts">
import {
  reactive,
  withDefaults,
  defineProps,
  ref,
  onUnmounted,
  watch,
} from "vue";
import { ElMessage } from "element-plus";

//父组件传值
interface Props {
  title: string; //视频名称
  src: string; //视频源
  poster: string; //封面
  type: string; //视频类型
  width: string; //视频播放器的宽度
}

const props = withDefaults(defineProps<Props>(), {
  title: "钢铁侠",
  src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
  poster: "", //封面
  type: "video/mp4", //视频类型
  width: "800px",
});

//播放器实例
const videoPlayer = ref();

//基本配置
const options = reactive({
  width: "800px", //播放器高度
  height: "450px", //播放器高度
  color: "#409eff", //主题色
  title: props.title, //视频名称
  src: props.src, //视频源
  poster: props.poster, //封面
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  lightOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ], //显示所有按钮
  type: "video/mp4", //video/mp4 | m3u8 | video/avi | video/mov
});
const onPlay = (ev: any) => {
  console.log("播放");
};
const onPause = (ev: any) => {
  console.log(ev, "暂停");
};

const onTimeupdate = (ev: any) => {
  console.log(ev, "时间更新");
};
const onCanplay = (ev: any) => {
  console.log(ev, "可以播放");
};
</script>

<style scoped></style>
