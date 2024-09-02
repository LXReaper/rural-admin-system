import { createStore } from "vuex";
import user from "@/store/user";
import { websocketMessageData } from "@/store/websocketMessageData/websocketMessageData";
import { settingsData } from "@/store/settingsData/settingsData";
import { tagsView } from "@/store/tagsView/tagsView";
import { settings } from "@/store/setting/settings";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    websocketMessageData,
    settingsData,
    tagsView,
    settings,
  },
});
