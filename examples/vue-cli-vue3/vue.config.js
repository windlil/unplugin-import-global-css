const { defineConfig } = require('@vue/cli-service')
const autocss = require('unplugin-import-global-css/webpack')


module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      autocss()
    ],
  },
})
