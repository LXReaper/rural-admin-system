import { createStore } from "vuex";
import user from "@/store/user";
import { websocketMessageData } from "@/store/websocketMessageData/websocketMessageData";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    websocketMessageData,
  },
});
