import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "../src"),
      },
    ],
  },
  define: {
    "process.env": {},
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({}), // 自动添加样式兼容前缀
      ],
    },
  },
});
