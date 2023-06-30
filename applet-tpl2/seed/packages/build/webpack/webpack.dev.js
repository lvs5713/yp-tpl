/*
 * @Date: 2022-07-26 09:10:17
 * @Description: 开发环境配置
 */

import common from './webpack.common.js'
import { merge } from 'webpack-merge'
import webpack from 'webpack'

const runInfo = JSON.parse(process.env.runInfo)

const config = merge(common(runInfo), {
  mode: 'development',
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
  },
})

webpack(config).watch({
  // aggregateTimeout: 300,
  ignored: '**/node_modules',
  poll: undefined,
}, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  if (stats.hasErrors() || stats.hasWarnings()) {
    console.log(stats.toString('errors-warnings'));
  }
});
