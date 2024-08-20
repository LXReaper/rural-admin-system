<template>
  <div style="margin-bottom: 1vh">
    <el-radio-group v-model="dateState" aria-label="size control">
      <el-radio-button
        :label="'今天'"
        :value="0"
        @change="setOption(props.dayPointRecordList)"
      />
      <el-radio-button
        :label="'本周'"
        :value="1"
        @change="setOption(props.weekPointRecordList)"
      />
      <el-radio-button
        :label="'本月'"
        :value="2"
        @change="setOption(props.monthPointRecordList)"
      />
      <el-radio-button
        :label="'今年'"
        :value="3"
        @change="setOption(props.yearPointRecordList)"
      />
    </el-radio-group>
    <div style="margin-top: 1vh">
      <div style="user-select: none; white-space: nowrap">
        <h4 style="color: #aaaaaa">
          支出积分：
          <text style="color: #5e5e5e">{{ chargePointNum }}</text>
        </h4>
      </div>
      <div style="user-select: none; white-space: nowrap">
        <h4 style="color: #aaaaaa">
          收入积分：
          <text style="color: #5e5e5e">{{ gainPointNum }}</text>
        </h4>
      </div>
    </div>
  </div>
  <div ref="chartDom" style="width: 92vw; height: 650px" />
</template>
<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps } from "vue";
import * as echarts from "echarts";
import { PointRecordTypeCount } from "../../../../generated";

//图表的响应值
const chartDom = ref();
//图表配置
var option = {};
//展示的图表分别是日（0）、周（1）、月（2）、年（3）
const dateState = ref(0); //默认是日
//当前使用的是周，月还是年的链表
const curPointRecordsList = ref();
//当前图表中的总支出和收入积分
const chargePointNum = ref(0);
const gainPointNum = ref(0);
/*图表横坐标数据*/
const dayXData = ref(
  Array.from(
    {
      length: 24,
    },
    (_, i) => i
  )
);
const weekXData = ref(["周日", "周一", "周二", "周三", "周四", "周五", "周六"]);
const monthXData = ref(
  Array.from(
    {
      length: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        0
      ).getDate(),
    },
    (_, i) => i + 1
  )
);
const yearXData = ref([
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
]);

interface Props {
  dayPointRecordList: Array<PointRecordTypeCount>; //今天的积分记录信息集合
  weekPointRecordList: Array<PointRecordTypeCount>; //本周的积分记录信息集合
  monthPointRecordList: Array<PointRecordTypeCount>; //本月的积分记录信息集合
  yearPointRecordList: Array<PointRecordTypeCount>; //本年的积分记录信息集合
}

const props = withDefaults(defineProps<Props>(), {
  dayPointRecordList: [] as any,
  weekPointRecordList: [] as any,
  monthPointRecordList: [] as any,
  yearPointRecordList: [] as any,
});

const setOption = (curPointRecordList: Array<PointRecordTypeCount>) => {
  curPointRecordsList.value = curPointRecordList;
  chargePointNum.value = curPointRecordsList.value.reduce(
    (accumulator: any, curPointRecord: { chargePointNum: any }) =>
      accumulator + curPointRecord.chargePointNum,
    0
  );
  gainPointNum.value = curPointRecordsList.value.reduce(
    (accumulator: any, curPointRecord: { gainPointNum: any }) =>
      accumulator + curPointRecord.gainPointNum,
    0
  );
  option = {
    title: {
      text:
        (!dateState.value
          ? "今天"
          : dateState.value == 1
          ? "本周"
          : dateState.value === 2
          ? "本月"
          : "今年") + "积分流动统计",
      x: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      orient: "horizontal",
      x: "left",
      y: "top",
      data: [
        "签到积分",
        "任务完成获取积分",
        "任务发布消耗积分",
        "商品交易消耗积分",
      ],
    },
    grid: {
      top: "50%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        // saveAsImage: {},//下载
      },
    },
    xAxis: {
      name: !dateState.value
        ? "时"
        : dateState.value === 1
        ? "星期"
        : dateState.value === 2
        ? "月份"
        : "年份",
      type: "category",
      boundaryGap: false,
      data: !dateState.value
        ? dayXData.value
        : dateState.value === 1
        ? weekXData.value
        : dateState.value === 2
        ? monthXData.value
        : yearXData.value,
    },
    yAxis: {
      name: "次数",
      type: "value",
    },
    series: [
      {
        name: "签到积分",
        type: "line",
        smooth: true,
        seriesLayoutBy: "row",
        emphasis: {
          focus: "series", //高亮时聚焦整个系列
        },
        itemStyle: {
          color: "#f9c956",
        },
        data: Array.from(
          { length: curPointRecordsList.value.length },
          (_, i) => curPointRecordsList.value[i].checkInCount
        ),
      },
      {
        name: "任务完成获取积分",
        type: "line",
        smooth: true,
        seriesLayoutBy: "row",
        emphasis: {
          focus: "series", //高亮时聚焦整个系列
        },
        itemStyle: {
          color: "#228B22",
        },
        data: Array.from(
          { length: curPointRecordsList.value.length },
          (_, i) => curPointRecordsList.value[i].taskDoneCount
        ),
      },
      {
        name: "任务发布消耗积分",
        type: "line",
        smooth: true,
        seriesLayoutBy: "row",
        emphasis: {
          focus: "series", //高亮时聚焦整个系列
        },
        itemStyle: {
          color: "#5470c6",
        },
        data: Array.from(
          { length: curPointRecordsList.value.length },
          (_, i) => curPointRecordsList.value[i].taskChargeCount
        ),
      },
      {
        name: "商品交易消耗积分",
        type: "line",
        smooth: true,
        seriesLayoutBy: "row",
        emphasis: {
          focus: "series", //高亮时聚焦整个系列
        },
        itemStyle: {
          color: "#ef6567",
        },
        data: Array.from(
          { length: curPointRecordsList.value.length },
          (_, i) => curPointRecordsList.value[i].productChargeCount
        ),
      },
      //圆饼图
      {
        type: "pie",
        id: "pie",
        radius: ["0%", "40%"],
        center: ["50%", "25%"],
        emphasis: {
          focus: "self",
        },
        label: {
          formatter: "{b}: {@pie} ({d}%)",
        },
        itemStyle: {
          color: function (colors: any) {
            let colorList: any[] = ["#f9c956", "#228B22", "#5470c6", "#ef6567"];
            return colorList[colors.dataIndex];
          },
        },
        data: [
          {
            name: "签到积分",
            value: curPointRecordsList.value[0].checkInCount,
          },
          {
            name: "任务完成获取积分",
            value: curPointRecordsList.value[0].taskDoneCount,
          },
          {
            name: "任务发布消耗积分",
            value: curPointRecordsList.value[0].taskChargeCount,
          },
          {
            name: "商品交易消耗积分",
            value: curPointRecordsList.value[0].productChargeCount,
          },
        ],
      },
    ],
  };
  //初始化
  const myChart = echarts.init(chartDom.value);
  /*鼠标移入事件*/
  myChart.on("mouseover", function (params) {
    if (params.seriesType === "line") {
      // params.dataIndex表示x坐标的索引，从0开始
      myChart.setOption({
        series: [
          {
            id: "pie",
            data: [
              {
                name: "签到积分",
                value: curPointRecordsList.value[params.dataIndex].checkInCount,
              },
              {
                name: "任务完成获取积分",
                value:
                  curPointRecordsList.value[params.dataIndex].taskDoneCount,
              },
              {
                name: "任务发布消耗积分",
                value:
                  curPointRecordsList.value[params.dataIndex].taskChargeCount,
              },
              {
                name: "商品交易消耗积分",
                value:
                  curPointRecordsList.value[params.dataIndex]
                    .productChargeCount,
              },
            ],
          },
        ],
      });
    }
    setTimeout(function () {
      //设置鼠标移入的某个节点后，圆饼图中该节点表示的部分高亮
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 4,
        dataIndex: params.seriesIndex,
      });
    }, 300);
  });
  /*鼠标移出事件*/
  myChart.on("mouseout", function (params) {
    //设置鼠标移出的某个节点后，圆饼图中该节点表示的部分变暗
    myChart.dispatchAction({
      type: "downplay",
      seriesIndex: 4,
      dataIndex: params.seriesIndex,
    });
  });
  myChart.setOption(option as any);
};
onMounted(() => {
  curPointRecordsList.value = props.dayPointRecordList;
  setOption(props.dayPointRecordList);
});
</script>

<style scoped></style>
