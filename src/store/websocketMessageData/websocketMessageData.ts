// initial state
/* eslint-disable */
import { StoreOptions } from "vuex";
import AuthorityCtrl from "../../access/authorityCtrl";

/**
 * 后端数据模块
 */
export const websocketMessageData = {
  namespaced: true,
  state: () => ({
    websocketMessage: {
      noticeSocket: "",
    },
  }),
  actions: {
    // actions,触发mutations的修改
    setNoticeSocket({ commit, state }, payload) {
      if (!payload) {
        commit("updateNoticeSocket", "");
        return;
      }
      commit("updateNoticeSocket", payload);
    },
  },
  // mutations,修改状态变量
  mutations: {
    // 增删改查
    updateNoticeSocket(state, payload) {
      state.websocketMessage.noticeSocket = payload;
      state.websocketMessage.noticeSocket.onopen = function () {
        console.log("WebSocket 连接成功");
      };
      state.websocketMessage.noticeSocket.onerror = function (ev: any) {
        console.log("WebSocket 连接失败," + ev);
      };
      state.websocketMessage.noticeSocket.onclose = function (ev: any) {
        console.log("WebSocket 连接关闭，" + ev);
      };
    },
  },
  getters: {
    //获取
    getNoticeSocket(state) {
      return state.websocketMessage.noticeSocket;
    },
  },
} as StoreOptions<any>;
