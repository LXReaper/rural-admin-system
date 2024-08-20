const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false,
    },
    // proxy: {
    //   "/api": {
    //     target: "http://192.168.2.107:8020",
    //     ws: true,
    //     changeOrigin: true, // 设置成true：发送请求头中host会设置成target
    //     pathRewrite: {
    //       "^/api": "", // optional: 重写路径
    //     },
    //   },
    // },
  },
});
