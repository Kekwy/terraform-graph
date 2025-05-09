module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "es", // 默认是 lib（旧版），es 是 ES Modules
        style: "css", // `true` 会加载 less，'css' 直接引入编译好的 CSS
      },
    ],
  ],
};
