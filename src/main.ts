import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/theme-chalk/src/index.scss";

createApp(App).use(ElementPlus).use(store).use(router).mount("#app");
const app = createApp(App);
//处理网页显示报错信息
app.config.errorHandler = (err, vm, info) => {
  // 处理错误，记录错误信息到日志文件或控制台，而不将其显示在页面上
  console.error("错误" + err);
};
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
