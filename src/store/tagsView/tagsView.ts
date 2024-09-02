// initial state
/* eslint-disable */
import { StoreOptions } from "vuex";
import AuthorityCtrl from "../../access/authorityCtrl";

/**
 * 页面数据模块
 */
export const tagsView = {
  namespaced: true,
  state: () => ({
    visitedViews: [], //访问过页面信息存放数组，即路由信息数组
    cachedViews: [],
    iframeViews: [],
  }),
  actions: {
    // actions,触发mutations的修改
    addView({ dispatch }, view) {
      dispatch("addVisitedView", view);
      dispatch("addCachedView", view);
    },
    addVisitedView({ commit }, view) {
      commit("ADD_VISITED_VIEW", view);
    },
    addCachedView({ commit }, view) {
      commit("ADD_CACHED_VIEW", view);
    },
    delView({ dispatch, state }, view) {
      return new Promise((resolve) => {
        dispatch("delVisitedView", view);
        dispatch("delCachedView", view);
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews],
        });
      });
    },
    delVisitedView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit("DEL_VISITED_VIEW", view);
        resolve([...state.visitedViews]);
      });
    },
    delCachedView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit("DEL_CACHED_VIEW", view);
        resolve([...state.cachedViews]);
      });
    },
    delAllVisitedViews({ commit, state }) {
      return new Promise((resolve) => {
        commit("DEL_ALL_VISITED_VIEWS");
        resolve([...state.visitedViews]);
      });
    },
    updateVisitedView({ commit }, view) {
      commit("UPDATE_VISITED_VIEW", view);
    },
  },
  // mutations,修改状态变量
  mutations: {
    /**
     * 添加访问过的页面
     * @param state
     * @param view 要添加的页面
     * @constructor
     */
    ADD_VISITED_VIEW: (state, view) => {
      if (state.visitedViews.some((v: any) => v.path === view.path)) return;
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.name || "no-name",
        })
      );
    },
    /**
     * 添加缓存
     * @param state
     * @param view
     * @constructor
     */
    ADD_CACHED_VIEW: (state, view) => {
      if (state.cachedViews.includes(view.name)) return;
      if (view.meta && !view.meta.noCache) {
        state.cachedViews.push(view.name);
      }
    },
    /**
     * 删除访问过的某个页面
     * @param state
     * @param view 要删除的页面
     * @constructor
     */
    DEL_VISITED_VIEW: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
      state.iframeViews = state.iframeViews.filter(
        (item: any) => item.path !== view.path
      );
    },
    /**
     * 删除缓存
     * @param state
     * @param view
     * @constructor
     */
    DEL_CACHED_VIEW: (state, view) => {
      const index = state.cachedViews.indexOf(view.name);
      index > -1 && state.cachedViews.splice(index, 1);
    },
    /**
     * 删除所有已经访问过的页面
     * @param state
     * @constructor
     */
    DEL_ALL_VISITED_VIEWS: (state) => {
      // keep affix tags
      const affixTags = state.visitedViews.filter((tag: any) => tag.meta.affix);
      state.visitedViews = affixTags;
      state.iframeViews = [];
    },
    /**
     * 更新访问过的某个页面的相关属性
     * @param state
     * @param view 更新后的页面
     * @constructor
     */
    UPDATE_VISITED_VIEW: (state, view) => {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
  },
  getters: {},
} as StoreOptions<any>;
