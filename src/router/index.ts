import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import userLayout from "@/layout/userLayout.vue";
import VillagerInfoView from "@/views/Villager/VillagerInfoView.vue";
import PointsRecordsView from "@/views/Points/PointsRecordsView.vue";
import PointsRulesView from "@/views/Points/PointsRulesView.vue";
import CheckInRecordsView from "@/views/Points/CheckInRecordsView.vue";
import TaskInfoView from "@/views/Tasks/TaskInfoView.vue";
import TaskRecordsView from "@/views/Tasks/TaskRecordsView.vue";
import StudyMaterialsView from "@/views/Study/StudyMaterialsView.vue";
import StudyStateView from "@/views/Study/StudyStateView.vue";
import StudyRecordsView from "@/views/Study/StudyRecordsView.vue";
import PointGoodsView from "@/views/Goods/PointGoodsView.vue";
import TransactionRecordsView from "@/views/Goods/TransactionRecordsView.vue";
import CommentInfoView from "@/views/Comments/CommentInfoView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: userLayout,
  },
  {
    path: "/home",
    name: "主页",
    component: HomeView,
  },
  {
    path: "/Info/user",
    name: "居民信息",
    component: VillagerInfoView,
  },
  {
    path: "/points",
    name: "积分中心",
    children: [
      {
        path: "/points/records",
        name: "积分记录",
        component: PointsRecordsView,
      },
      {
        path: "/points/rules",
        name: "积分规则",
        component: PointsRulesView,
      },
      {
        path: "/points/checkIn",
        name: "签到记录",
        component: CheckInRecordsView,
      },
    ],
  },
  {
    path: "/task",
    name: "任务中心",
    children: [
      {
        path: "/task/info",
        name: "任务信息",
        component: TaskInfoView,
      },
      {
        path: "/task/records",
        name: "任务记录",
        component: TaskRecordsView,
      },
    ],
  },
  {
    path: "/study",
    name: "学习中心",
    children: [
      {
        path: "/study/materials",
        name: "学习资料",
        component: StudyMaterialsView,
      },
      {
        path: "/study/state",
        name: "学习状态",
        component: StudyStateView,
      },
      {
        path: "/study/records",
        name: "学习记录",
        component: StudyRecordsView,
      },
    ],
  },
  {
    path: "/shop",
    name: "商品信息",
    children: [
      {
        path: "/shop/goods",
        name: "积分商品",
        component: PointGoodsView,
      },
      {
        path: "/shop/transaction",
        name: "交易记录",
        component: TransactionRecordsView,
      },
    ],
  },
  {
    path: "/comments",
    name: "评论信息",
    component: CommentInfoView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
