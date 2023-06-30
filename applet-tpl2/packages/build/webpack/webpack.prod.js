/*
 * @Date: 2022-07-26 09:10:17
 * @Description: 开发环境配置
 */

import common from './webpack.common.js'
import { merge } from 'webpack-merge'
import webpack from 'webpack'

const runInfo = JSON.parse(process.env.runInfo)

const config = merge(common(runInfo), {
  mode: 'production',
})

const compiler = webpack(config);

compiler.run((err, stats) => { // [Stats Object](#stats-object)
  if (err) {
    console.error(err);
    return;
  }
  if (stats.hasErrors() || stats.hasWarnings()) {
    console.log(stats.toString('errors-warnings'));
  }
  compiler.close((closeErr) => {
    console.log(closeErr)
  });
});
