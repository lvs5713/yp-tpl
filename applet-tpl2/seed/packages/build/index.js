/*
 * @Date: 2022-07-26 09:21:11
 * @Description: 启动
 */

import inquirer from 'inquirer'
import { spawn } from 'cross-spawn'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import process from 'process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

checkList().then((runInfo) => {
  process.env.runInfo = JSON.stringify(runInfo)
  if (runInfo.mode === 'dev') {
    spawn('node', [path.join(__dirname, './webpack/webpack.dev.js')], {
      stdio: 'inherit',
    })
  }
  if (runInfo.mode === 'build') {
    spawn('node', [path.join(__dirname, './webpack/webpack.prod.js')], {
      stdio: 'inherit',
    })
  }
})

/** 确认用户的选项 */
function checkList() {
  const promptList = [
    {
      type: 'list',
      message: '请选择运行模式：',
      name: 'mode',
      choices: [
        {
          name: '调试',
          value: 'dev',
        },
        {
          name: '打包',
          value: 'build',
        },
      ],
    },
    {
      type: 'list',
      message: '请选择运行环境：',
      name: 'development',
      choices: [
        {
          name: '测试站',
          value: 'DEV',
        },
        {
          name: '预发布',
          value: 'PRE',
        },
        {
          name: '正式站',
          value: 'PRO',
        },
      ],
    },
  ]
  return inquirer.prompt(promptList)
}