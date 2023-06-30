/*
 * @Date: 2022-10-05 10:47:05
 * @Description: 类型提示
 */

type AlertOptions = Partial<{
  title: string
  content: string | number
  confirmText: string
  showCloseBtn: boolean
}>

type Alert = (options?: AlertOptions) => Promise<void>

type ConfirmOptions = Partial<{
  title: string
  content: string | number
  confirmText: string
  cancelText: string
}>

type Confirm = (options?: ConfirmOptions) => Promise<void>

type jxAlertOptions = Partial<{
  title?: string
  content: string | number | array
  mode?: 'warn' | 'succ' | 'error' | 'confirm'
  confirmText?: String
  cancelText?: String
  hideClose?: Boolean
  contentImage?: String
}>

type jxAlert = (options?: jxAlertOptions) => Promise<void>
