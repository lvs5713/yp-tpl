/*
 * @Date: 2022-07-26 09:10:17
 * @Description: 通用配置
 */

import path from 'path'
import fs from 'fs'
import process from 'process'
import WebpackBar from 'webpackbar'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import DeleteAssetsWebpackPlugin from 'delete-assets-webpack-plugin'
import MiniPlugin from './plugin/mini-plugin.cjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pwd = process.cwd()

const root = path.join(pwd, 'src') // 入口文件

function getEntry(dir, list = []) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  files.forEach((item) => {
    const pathName = path.join(dir, item.name);
    if (item.isDirectory()) {
      getEntry(pathName, list);
    } else {
      list.push(pathName);
    }
  });
  return list;
}

export default (runInfo) => {
  return {
    context: root,
    entry: () => getEntry(root),
    output: {
      clean: {
        keep: /(node_modules)|(miniprogram_npm)|(project\.private\.config\.json)/,
      },
      filename: 'webpack-temp.js',
      path: path.join(pwd, 'dist')
    },
    plugins: [
      new DeleteAssetsWebpackPlugin(['webpack-temp.js']),
      new WebpackBar(), // 进度条
      new MiniPlugin(),
    ],
    resolve: {
      preferAbsolute: true,
      roots: [root],
    },
    module: {
      rules: [
        {
          test: /\.(less)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].wxss',
              },
            },
            {
              loader: 'less-loader',
            },
            {
              loader: 'style-resources-loader',
              options: {
                patterns: path.resolve(pwd, './src/assets/styles/index.less')
              }
            }
          ]
        },
        {
          type: 'javascript/auto',
          test: /\.json$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            }
          ],
        },
        {
          test: /\.(wxml)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].wxml',
              },
            },
            {
              loader: path.resolve(__dirname, './loader/html-loader.cjs'),
              options: {
                // wxml 自动插入内容
                usingComponentsInsert: [
                  {
                    test: (name) => /(pages|subpackage)/.test(name) && !name.includes('components'),
                    values: [
                      '<custom-modal />',
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          test: /\.(js|ts)$/i,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].js',
              },
            },
            {
              loader: path.resolve(__dirname, './loader/js-loader.cjs'),
              options: {
                root: '@/', // 根目录别名
                env: {
                  ENV_MODE: runInfo.mode,
                  ENV_DEVELOPMENT: runInfo.development,
                },
                // 路径编译时替换，例如写 @reduxjs/toolkit 会被编译时替换为 lib/@reduxjs/toolkit/index
                pathConversion: {
                  '@reduxjs/toolkit': 'lib/@reduxjs/toolkit/index',
                },
              },
            },
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        chrome: '90',
                      },
                    },
                  ],
                  '@babel/preset-typescript',
                ],
              }
            }
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|md|axml|acss|sjs|wxs|DS_Store|snap|txt|ttf|woff|woff2|wxss)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            }
          ]
        },
      ]
    }
  }
}