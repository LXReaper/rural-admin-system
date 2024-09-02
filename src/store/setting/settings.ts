// initial state
/* eslint-disable */
import { StoreOptions } from "vuex";
import AuthorityCtrl from "../../access/authorityCtrl";

/**
 * 设置数据模块
 */
export const settings = {
  namespaced: true,
  state: () => ({
    theme: "#409EFF",
  }),
  actions: {
    // actions,触发mutations的修改
    setCurActive({ commit, state }, payload) {
      if (!payload) {
        commit("updateCurActive", "system");
        return;
      }
      commit("updateCurActive", payload);
    },
  },
  // mutations,修改状态变量
  mutations: {
    // 增删改查
    updateCurActive(state, payload) {
      state.settingsData.curActive = payload;
    },
  },
  getters: {
    //获取
    getCurActive(state) {
      return state.settingsData.curActive;
    },
  },
} as StoreOptions<any>;
