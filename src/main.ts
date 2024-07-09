import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//Element plus设置
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/theme-chalk/src/index.scss";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs"; //中文

createApp(App)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  .use(ElementPlus, { locale: zhCn })
  .use(store)
  .use(router)
  .mount("#app");
const app = createApp(App);
//处理网页显示报错信息
app.config.errorHandler = (err, vm, info) => {
  // 处理错误，记录错误信息到日志文件或控制台，而不将其显示在页面上
  console.error("错误" + err);
};
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
