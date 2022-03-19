module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",

  lintOnSave: false,

  // 注意：需根据项目情况确定上下文名称
  outputDir: "manage-dist",

  // 注意：把productionSourceMap值改为false。不然会导致源码暴露，安全测试不通过。
  productionSourceMap: false,

  devServer: {
    open: true,
    port: "8022",
    /*proxy: {
      "/api": {
        target: "http://d-adm.ethicall.cn", // 域名
        ws: false,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },*/
  },
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .use("url-loader")
      .tap(
        (options) => Object.assign(options, { limit: 5120 }) // 大于5kb的图片被处理成base64格式
      );
  },
};
