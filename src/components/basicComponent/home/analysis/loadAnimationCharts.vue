<template>
  <!--  加载动画-->
  <div
    ref="chartDom"
    :style="{ width: props.width, height: props.height }"
    v-if="props.open"
  />
</template>
<script setup lang="ts">
import { ref, withDefaults, defineProps, onMounted } from "vue";
import * as echarts from "echarts";

interface Props {
  open: boolean; //是否启用加载动画
  width: string; //加载动画所在画布宽度
  height: string; //加载动画所在画布高度
  /*加载动画配置*/
  lineNum: number; //加载动画线条数量
  lineWidth: number; //加载动画线条宽度
  lineHeight: number; //加载动画线条长度
  lineColor: string; //加载动画线条颜色
}

const props = withDefaults(defineProps<Props>(), {
  open: true,
  width: "20vw",
  height: "650px",
  /*加载动画配置*/
  lineNum: 8,
  lineWidth: 10,
  lineHeight: 100,
  lineColor: "#5470c6",
});

const chartDom = ref();
//配置
var option = {};

const setOption = () => {
  option = {
    graphic: {
      elements: [
        {
          type: "group",
          left: "center",
          top: "center",
          children: new Array(props.lineNum).fill(0).map((val, i) => ({
            type: "rect",
            x: i * 20,
            shape: {
              x: 0,
              y: -40,
              width: props.lineWidth,
              height: props.lineHeight,
            },
            style: {
              fill: props.lineColor,
              opacity: 0.8, //每个矩形的背景色透明度
              stroke: "#aaaaaa", //每个矩形的边框颜色
              lineWidth: 1, //每个矩形的边框线条宽度
            },
            keyframeAnimation: {
              duration: 1000,
              delay: i * 200,
              loop: true,
              keyframes: [
                {
                  percent: 0.5,
                  scaleY: 0.5,
                  easing: "cubicIn",
                },
                {
                  percent: 1,
                  scaleY: 1,
                  easing: "cubicOut",
                },
              ],
            },
          })),
        },
      ],
    },
  };
  //初始化
  const myChart = echarts.init(chartDom.value);
  myChart.setOption(option as any);
};

onMounted(() => {
  setOption();
});
</script>

<style scoped></style>
