/*
 * @Date: 2023-04-18 15:55:41
 * @Description: 表单案例
 */
import { RootState } from '@/store/index'
import dayjs from '@/lib/dayjs/index'
import { apply } from '@/components/base/m-button/index'
import { typeMode } from '@/config/index'

Page({
  useStore(state: RootState) {
    return {
    }
  },
  /**
     * 页面的初始数据
     */
  data: {
    // 机型推荐数据
    recommendList: [],
    // 机型选择的值
    machineValue: false,
  },

  async onLoad() {
    // 获取机型推荐数据
    const [data] = await $.request['GET/v2/mechanical/hots']({ mode: typeMode.hire, type: 1, limit: 6, source: 'XCX' })
    const { content } = data
    if (content) {
      this.setData({ recommendList: content.hots })
    }
    // 设置初始值
    this.selectComponent('#form').setValues({
      time: dayjs().format('YYYY-MM-DD'),
    })
  },

  // 按钮loading，防重复提交
  onSubmit: apply(async function () {
    const values = await this.selectComponent('#form').verify({
      time: [{ required: true, message: '请选择日期' }],
    })
    console.log(values)
    await $.wait(3000)
    // 接口请求
    // const [data] = await $.request['GET/index/get-time']({ source: 'XCX' })
    // console.log(data)
  }),

  // 点击机型推荐按钮Label
  onClickLabel(e) {
    const { item } = e.target.dataset
    if (this.data.machineValue && item.id == this.data.machineValue?.id) return
    // 设置值
    this.selectComponent('#form').setValues({
      machine: { id: item.id, name: item.name },
      brand: '', // 清空品牌
      model: '', // 清空型号
    })
    // 表示机型选择存在值
    this.setData({
      machineValue: { id: item.id, name: item.name },
    })
  },

  // 监听机型值的变化
  onMachineChange(e) {
    this.selectComponent('#form').setValues({
      brand: '', // 清空品牌
      model: '', // 清空型号
    })
    // 设置机械的值
    this.setData({
      machineValue: e.detail?.value || null,
    })
  },

  // 监听品牌值的变化
  onBrandChange() {
    this.selectComponent('#form').setValues({
      model: '', // 清空型号
    })
  },
})
