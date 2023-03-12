const { defineConfig } = require("@vue/cli-service")
const { VantResolver } = require("unplugin-vue-components/resolvers")
const ComponentsPlugin = require("unplugin-vue-components/webpack")
// publicPath: "./" 打包app

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()]
      })
    ]
  },
  transpileDependencies: true
})
