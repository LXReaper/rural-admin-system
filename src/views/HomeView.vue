<template>
  <div class="home">
    <el-skeleton :rows="20" animated v-if="loading" />
    <div v-if="!loading">
      <info-stack-line-charts
        :day-point-record-list="pointRecordsDayInfoList"
        :week-point-record-list="pointRecordsWeekInfoList"
        :month-point-record-list="pointRecordsMonthInfoList"
        :year-point-record-list="pointRecordsYearInfoList"
      />
      <info-charts
        :task-all-num="taskCountInfo.taskAllNum"
        :task-un-do-num="taskCountInfo.taskUnDoNum"
        :task-doing-num="taskCountInfo.taskDoingNum"
        :task-done-num="taskCountInfo.taskDoneNum"
        :wait-examine-task-num="taskCountInfo.waitExamineTaskNum"
        :wait-re-upload-task-num="taskCountInfo.waitReUploadTaskNum"
        :check-in-count="pointRecordsInfo.checkInCount"
        :task-done-count="pointRecordsInfo.taskDoneCount"
        :task-charge-count="pointRecordsInfo.taskChargeCount"
        :product-charge-count="pointRecordsInfo.productChargeCount"
        :check-in-week-count="pointRecordsWeekInfo.checkInCount"
        :task-done-week-count="pointRecordsWeekInfo.taskDoneCount"
        :task-charge-week-count="pointRecordsWeekInfo.taskChargeCount"
        :product-charge-week-count="pointRecordsWeekInfo.productChargeCount"
        style="margin-top: 5vh"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import InfoCharts from "@/components/basicComponent/home/infoCharts.vue";
import {
  PointHistoryRecordControllerService,
  TasksControllerService,
} from "../../generated";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import moment from "moment";
import InfoStackLineCharts from "@/components/basicComponent/home/InfoStackLineCharts.vue";
///是否正在加载
const loading = ref(true);
//任务统计数据
const taskCountInfo = ref();
//积分历史记录统计数据(当天)
const pointRecordsInfo = ref();
//积分历史记录统计数据(一周)
const pointRecordsWeekInfo = ref();
/*积分变动数据集合*/
// 今天内的数据
const pointRecordsDayInfoList = ref();
// 一周内的数据
const pointRecordsWeekInfoList = ref();
// 一月内的数据
const pointRecordsMonthInfoList = ref();
// 一年内的数据
const pointRecordsYearInfoList = ref();

/*任务*/
//本周
const getCountTaskInfo = async () => {
  const res = await TasksControllerService.getTaskCountInfoUsingGet();
  if (res.code === 0) {
    taskCountInfo.value = res.data;
  } else ElMessage.error("任务统计数据加载失败");
};

/*积分*/
//当天总计
const getPointRecordInfo = async () => {
  const now = moment(new Date()).format("YYYY-MM-DD");
  const res = await PointHistoryRecordControllerService.getPointRecordTypeCount(
    {
      startDate: now + " 00:00:00",
      endDate: now + " 23:59:59",
    }
  );
  if (res.code === 0) {
    pointRecordsInfo.value = res.data;
  } else ElMessage.error("当天积分信息加载失败");
};

//一周内总计
const getPointWeekRecordInfo = async () => {
  const oneDayCount = 24 * 60 * 60; //一天多少秒

  const now = new Date(); //当前日期
  const day = now.getDay(); //当前星期几
  const weekFirstDay = new Date(
    (now as any) - ((!day ? 7 : day) - 1) * (oneDayCount * 1000)
  );
  const weekLastDay = new Date(
    ((weekFirstDay as any) / 1000 + 6 * oneDayCount) * 1000
  );
  const res = await PointHistoryRecordControllerService.getPointRecordTypeCount(
    {
      startDate: moment(weekFirstDay).format("YYYY-MM-DD") + " 00:00:00",
      endDate: moment(weekLastDay).format("YYYY-MM-DD") + " 23:59:59",
    }
  );
  if (res.code === 0) {
    pointRecordsWeekInfo.value = res.data;
  } else ElMessage.error("本周积分信息加载失败");
};

//获取一周内每天的数据
const getPointDayRecordInfoList = async () => {
  const res =
    await PointHistoryRecordControllerService.getPointDayRecordTypeCountList();
  if (res.code === 0) {
    pointRecordsDayInfoList.value = res.data;
  } else ElMessage.error("今天积分变动信息加载失败");
};
//获取一周内每天的数据
const getPointWeekRecordInfoList = async () => {
  const res =
    await PointHistoryRecordControllerService.getPointWeekRecordTypeCountList();
  if (res.code === 0) {
    pointRecordsWeekInfoList.value = res.data;
  } else ElMessage.error("本周积分变动信息加载失败");
};
//获取一月内每天的数据
const getPointMonthRecordInfoList = async () => {
  const res =
    await PointHistoryRecordControllerService.getPointMonthRecordTypeCountList();
  if (res.code === 0) {
    pointRecordsMonthInfoList.value = res.data;
  } else ElMessage.error("本月积分变动信息加载失败");
};
//获取一年内每天的数据
const getPointYearRecordInfoList = async () => {
  const res =
    await PointHistoryRecordControllerService.getPointYearRecordTypeCountList();
  if (res.code === 0) {
    pointRecordsYearInfoList.value = res.data;
  } else ElMessage.error("今年积分变动信息加载失败");
};

//综合查询
const onSearch = () => {
  loading.value = true;
  getCountTaskInfo().then(() => {
    getPointRecordInfo().then(() => {
      getPointWeekRecordInfo().then(() => {
        getPointDayRecordInfoList().then(() => {
          getPointWeekRecordInfoList().then(() => {
            getPointMonthRecordInfoList().then(() => {
              getPointYearRecordInfoList().then(() => {
                loading.value = false;
              });
            });
          });
        });
      });
    });
  });
};

onMounted(() => {
  onSearch();
});
</script>
<style></style>
