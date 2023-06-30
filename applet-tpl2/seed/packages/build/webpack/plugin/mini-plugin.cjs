/*
 * @Date: 2023-04-28 11:28:51
 * @Description: 小程序插件
 */

const webpack = require('webpack')

class MiniPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    const { Compilation } = webpack
    compiler.hooks.compilation.tap('MiniPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'MiniPlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        (assets) => {
          if (!webpack.sources.RawSource) {
            return
          }
          const { RawSource } = webpack.sources
          // 处理 app.json.js => app.json 问题
          const appJson = assets['app.json.js']
          const code = appJson.source().toString()
          try {
            const config = new Function(code.replace('export default', 'return '))()
            compilation.deleteAsset('app.json.js')
            compilation.emitAsset('app.json', new RawSource(JSON.stringify(config, null, 2)))
          } catch (e) {
            console.log('app.json.js 文件内容错误')
          }
        },
      )
    })
  }
}

module.exports = MiniPlugin
