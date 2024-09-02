<template>
  <div id="infoCharts" ref="chartDom" style="width: 92vw; height: 750px"></div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  withDefaults,
  defineProps,
  onBeforeUnmount,
} from "vue";
import * as echarts from "echarts";

interface Props {
  /*任务部分*/
  taskAllNum: number; //任务总数(包括未审核，审核打回的任务)
  taskUnDoNum: number; //任务未做数量
  taskDoingNum: number; //正在执行的任务数量
  taskDoneNum: number; //任务完成数量
  waitExamineTaskNum: number; //等待审核通过的任务数
  waitReUploadTaskNum: number; //等待重新上传的任务（被打回的任务）
  /*积分部分*/
  //当天积分
  checkInCount: number; //签到获取积分数
  taskDoneCount: number; //任务完成获取积分数
  taskChargeCount: number; //任务发布消耗积分数
  productChargeCount: number; //商品交易消耗积分数
  //一周内积分
  checkInWeekCount: number;
  taskDoneWeekCount: number;
  taskChargeWeekCount: number;
  productChargeWeekCount: number;
}

const props = withDefaults(defineProps<Props>(), {
  /*任务部分*/
  taskAllNum: 0,
  taskUnDoNum: 0,
  taskDoingNum: 0,
  taskDoneNum: 0,
  waitExamineTaskNum: 0,
  waitReUploadTaskNum: 0,
  /*积分部分*/
  //当天积分
  checkInCount: 0,
  taskDoneCount: 0,
  taskChargeCount: 0,
  productChargeCount: 0,
  //一周内积分
  checkInWeekCount: 0,
  taskDoneWeekCount: 0,
  taskChargeWeekCount: 0,
  productChargeWeekCount: 0,
});

interface myDefaultStringJson {
  [key: string]: number;
}

const chartDom = ref();
const weekPointInfo: {
  all: number;
  weekPointData: { [item: string]: number };
} = {
  all:
    Math.max(
      props.checkInWeekCount,
      props.taskDoneWeekCount,
      props.taskChargeWeekCount,
      props.productChargeWeekCount
    ) +
    Math.min(
      props.checkInWeekCount,
      props.taskDoneWeekCount,
      props.taskChargeWeekCount,
      props.productChargeWeekCount
    ),
  weekPointData: {
    /*收入积分*/
    签到积分: props.checkInWeekCount,
    任务完成获取积分: props.taskDoneWeekCount,
    /*支出积分*/
    任务发布消耗积分: props.taskChargeWeekCount,
    商品交易消耗积分: props.productChargeWeekCount,
  },
};
const taskInfo: myDefaultStringJson = {
  未接取任务: props.taskUnDoNum,
  正在执行的任务: props.taskDoingNum,
  已完成任务: props.taskDoneNum,
  未审核任务: props.waitExamineTaskNum,
  打回任务: props.waitReUploadTaskNum,
};
const PointHistoryRecordInfo: myDefaultStringJson = {
  签到积分: props.checkInCount,
  任务完成获取积分: props.taskDoneCount,
  任务发布消耗积分: props.taskChargeCount,
  商品交易消耗积分: props.productChargeCount,
};

onMounted(() => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as any;
  canvas.width = canvas.height = 100;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.globalAlpha = 0.08;
  ctx.font = "20px Microsoft Yahei";
  ctx.translate(50, 50);
  ctx.rotate(-Math.PI / 4);

  //水印
  // ctx.fillText("JKTeam", 0, 0);

  const option = {
    backgroundColor: {
      type: "pattern",
      image: canvas,
      repeat: "repeat",
    },
    tooltip: {},
    title: [
      {
        text: "本周积分流动统计(次数)",
        subtext: "7天数据" + (!new Date().getDay() ? "（明天重置）" : ""),
        left: "25%",
        textAlign: "center",
      },
      {
        text: "任务数据统计",
        subtext: "总计 " + props.taskAllNum + " 项",
        left: "75%",
        textAlign: "center",
      },
      {
        text: "今日积分流动记录",
        subtext:
          "总计 " +
          Object.values(PointHistoryRecordInfo).reduce(
            (accumulator, currentValue) => accumulator + Number(currentValue),
            0
          ) +
          " 次",
        left: "75%",
        top: "50%",
        textAlign: "center",
      },
    ],
    //布局
    grid: [
      {
        top: 50,
        width: "50%",
        bottom: 0,
        left: "3%",
        containLabel: true,
      },
    ],
    //横轴
    xAxis: [
      {
        type: "category",
        data: Object.keys(weekPointInfo.weekPointData),
        axisLabel: {
          interval: 0,
          rotate: 30,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    //纵轴
    yAxis: [
      {
        type: "value",
        max: weekPointInfo.all,
        splitLine: {
          show: false,
        },
      },
    ],
    //系列列表,每个系列通过type决定自己的图表类型
    series: [
      //本周积分变动统计柱状图
      {
        type: "bar",
        stack: "chart",
        z: 3,
        label: {
          position: "right",
          show: true,
        },
        showBackground: true,
        itemStyle: {
          color: function (colors: any) {
            let colorList: any[] = ["#f9c956", "#228B22", "#5470c6", "#ef6567"];
            return colorList[colors.dataIndex];
          },
        },
        data: Object.keys(weekPointInfo.weekPointData).map(
          (key) => weekPointInfo.weekPointData[key]
        ),
      },
      //任务信息统计圆饼图
      {
        type: "pie",
        radius: [0, "30%"],
        center: ["75%", "25%"],
        selectedMode: "single",
        itemStyle: {
          color: function (colors: any) {
            let colorList: any[] = [
              "#ececec",
              "#f9c956",
              "#228B22",
              "#5470c6",
              "#ef6567",
              "#9A60B4",
            ];
            return colorList[colors.dataIndex];
          },
        },
        data: Object.keys(taskInfo).map((key) => ({
          name: key,
          value: taskInfo[key],
        })),
      },
      //今天积分变动统计圆饼图
      {
        type: "pie",
        radius: [0, "30%"],
        center: ["75%", "75%"],
        selectedMode: "single",
        itemStyle: {
          color: function (colors: any) {
            let colorList: any[] = ["#f9c956", "#228B22", "#5470c6", "#ef6567"];
            return colorList[colors.dataIndex];
          },
        },
        data: Object.keys(PointHistoryRecordInfo).map((key) => ({
          name: key,
          value: PointHistoryRecordInfo[key],
        })),
      },
    ],
  };

  //初始化
  const myChart = echarts.init(chartDom.value);
  myChart.setOption(option as any);

  // 增加监听事件 窗口变化，重新设置charts的大小。 重要代码
  window.addEventListener("resize", () => resizeCharts());
});

onBeforeUnmount(() => {
  // 组件销毁前 移除监听事件。 重要代码
  window.addEventListener("resize", () => resizeCharts());
});

//重新设置charts的大小
const resizeCharts = () => {
  const myChart = echarts.init(chartDom.value);
  myChart.resize();
};
</script>

<style scoped>
#infoCharts {
  width: 100%;
  height: 600px;
}
</style>
