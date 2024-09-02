import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/home/HomeView.vue";
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
import { ElMessage } from "element-plus";
import store from "@/store";
import AuthorityCtrl from "@/access/authorityCtrl";
import checkAuthority from "@/access/checkAuthority";
import TaskExamineView from "@/views/Tasks/TaskExamineView.vue";
import AnnouncementsView from "@/views/Announcement/AnnouncementsView.vue";
import TaskCheckView from "@/views/Tasks/TaskCheckView.vue";
import loginLayout from "@/layout/loginLayout.vue";
import SettingView from "@/views/Setting/SettingView.vue";
import analysisView from "@/views/home/analysisView.vue";
import workplaceView from "@/views/home/workplaceView.vue";
import redirect from "@/views/redirect.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/redirect",
    meta: {
      hidden: true,
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: redirect,
      },
    ],
  },
  {
    path: "/user",
    name: "用户",
    component: loginLayout,
  },
  {
    path: "/admin",
    name: "管理员界面",
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: "",
        name: "控制面板",
        children: [
          {
            path: "/home/workplace",
            name: "工作台",
            component: workplaceView,
            meta: {
              title: "工作台",
              icon: "dashboard",
              affix: true, //在上方导航栏中是否固定住
            },
          },
          {
            path: "/home/analysis",
            name: "分析页",
            component: analysisView,
          },
        ],
      },
      {
        path: "/Info/user",
        name: "居民信息",
        component: VillagerInfoView,
      },
      {
        path: "/announcements/admin",
        name: "公告管理",
        component: AnnouncementsView,
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
            path: "/task/examine",
            name: "任务审核",
            component: TaskExamineView,
          },
          {
            path: "/task/check",
            name: "任务检查",
            component: TaskCheckView,
          },
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
      {
        path: "/setting",
        name: "设置",
        component: SettingView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//路由跳转前
router.beforeEach(async (to, from, next) => {
  if (to.path.endsWith("/")) next(`/user`);
  await store.dispatch("user/getLoginUser");
  const loginUser = store.state.user.loginUser; // 获取当前前端保存的登录用户信息
  //如果已经登录不给跳转到user登录界面,直接回到主页
  if (
    to.path.startsWith("/user") &&
    checkAuthority(loginUser, AuthorityCtrl.ADMIN)
  )
    next(`/home/workplace`);
  //如果是管理员界面并且不是管理员就不给跳转
  if (to.meta.requireAuth && !checkAuthority(loginUser, AuthorityCtrl.ADMIN)) {
    next(`/user`);
    ElMessage.warning("请先登录管理员账号!!!");
  }
  // ElMessage.warning("name:" + store.state.user.loginUser.villager_name);
  //是管理员给跳转
  next();
});
export default router;
