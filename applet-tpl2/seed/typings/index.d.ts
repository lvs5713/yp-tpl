/*
 * @Date: 2021-12-31 16:03:32
 * @Description: ts 类型定义
 */

/// <reference path="./ComponentOptions.d.ts" />
/// <reference path="./PageOptions.d.ts" />
/// <reference path="./wx/index.d.ts" />
/// <reference path="./ComponentOptions.d.ts" />
/// <reference path="./PageOptions.d.ts" />
/// <reference path="../src/core/index.d.ts" />

declare const App: (options: Record<string, any>) => void
declare let Page: (options: PageOptions) => void
declare const getApp: () => any
declare let Component:(options: ComponentOptions) => void
declare const getCurrentPages: () => any

declare namespace WechatMiniprogram {
  interface Wx {
    $: $type
  }
}

/** 全局变量 */
declare let $: $type

declare let globalThis: any

/** 调试 | 打包 */
declare const ENV_MODE: 'dev' | 'build'

/** 测试站 | 预发布 | 预发布正式站 | 正式站 */
declare const ENV_DEVELOPMENT: 'DEV' | 'PRE' | 'REL' | 'PRO'

