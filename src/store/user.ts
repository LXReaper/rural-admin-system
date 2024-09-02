// initial state
/* eslint-disable */
import { StoreOptions } from "vuex";
import { UserControllerService } from "../../generated";
import AuthorityCtrl from "../access/authorityCtrl";
import { ElMessage } from "element-plus";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      villager_name: "登录 注册",
    },
    userMenuData: {
      curActive: "userCount",
    },
  }),
  actions: {
    // actions,执行异步操作,并触发mutations的修改
    async getLoginUser({ commit, state }, payload) {
      //从远程(即后端)获取用户信息
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: AuthorityCtrl.NOT_LOGIN,
        });
      }
    },
    async getLoginUserFromBackend({ commit, state }, payload) {
      //从远程(即后端)获取用户信息
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) commit("updateUser", res.data);
      else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: AuthorityCtrl.NOT_LOGIN,
        });
      }
    },
    //设置用户页面中的菜单名称
    setCurActive({ commit, state }, payload) {
      if (!payload) {
        commit("updateCurActive", "userCount");
        return;
      }
      commit("updateCurActive", payload);
    },
  },
  // mutations,修改状态变量
  mutations: {
    // 增删改查
    updateUser(state, payload) {
      state.loginUser = payload;
    },
    //更新用户页面中的当前菜单名称
    updateCurActive(state, payload) {
      state.userMenuData.curActive = payload;
    },
  },
} as StoreOptions<any>;
