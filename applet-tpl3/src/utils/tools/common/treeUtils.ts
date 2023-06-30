/*
 * @Date: 2023-05-17 14:06:41
 * @Description: file content
 */

/** 树结构数据相关方法 */
class TreeUtils {
  /**
 * @description: 回溯算法=> 通过叶子节点 id ，寻找包含该叶子节点的整条路径
 * 比如传递一个数组 [{id: 1, name: '哈哈', children: [{id: 2-1, name: '哈哈2'}] }] 传入ID 2-1，返回他的整个路径，包含他的父级
 * @param curKey 需要查询的ID
 * @param optionKeys 配置项
 * @param data 数据源
 * @return {result 路径数组}
 */
  static getTreePathKey<T extends Record<string, any>>(
    datas?: T[] | null,
    curKey?: string | number,
    /** parentKey：curKey对应在数组数据里面的字段， childrenKey：子节点对应在数组数据里面的字段 */
    optionKeys?: { childrenKey: string; parentKey: string },
  ): T[] {
    let result: T[] = [] // 记录路径结果
    /** 配置选项 */
    const childrenKey: string = optionKeys?.childrenKey || 'children'
    const parentKey: string = optionKeys?.parentKey || 'id'

    const traverse = (path: T[], curKey?: string | number, data?: T[] | null) => {
      if (!Array.isArray(data) || data.length === 0 || !curKey) {
        return
      }
      data.forEach((item) => {
        path.push(item)
        if (Number(item[parentKey]) === Number(curKey)) {
          result = JSON.parse(JSON.stringify(path))
          return
        }
        const children = Array.isArray(item[childrenKey]) ? item[childrenKey] : []
        traverse(path, curKey, children)
        path.pop()
      })
    }
    traverse([], curKey, datas)
    return result
  }

  /**
 * 通过 id 查找在树结构中的row
 * @param tree 查找的树
 * @param { number } id 需要查找的id
 * @returns {IArea} 查找到的信息
 */
  static getTreeById<D extends Record<string, any>>(
    tree?: D[] | null,
    id?: number | string,
    /** parentKey：curKey对应在数组数据里面的字段， childrenKey：子节点对应在数组数据里面的字段 */
    optionKeys?: { childrenKey: string; parentKey: string },
  ): D {
    let res = {} as D
    if (!Array.isArray(tree) || !tree.length || !id) return res
    /** 配置选项 */
    const childrenKey: string = optionKeys?.childrenKey || 'children'
    const parentKey: string = optionKeys?.parentKey || 'id'
    function treeQuery(data?: D[] | null) {
      data?.forEach((area) => {
        // area下面不存在子节点才算找到了，如果area存在子节点继续找
        const isflag = !area.children || !area.children?.length
        if (Number(area[parentKey]) === Number(id) && isflag) {
          res = area
        } else if (area[childrenKey]?.length) {
          const children = Array.isArray(area[childrenKey]) ? area[childrenKey] : []
          treeQuery(children)
        }
      })
    }
    treeQuery(tree)
    return res
  }
}

const { getTreePathKey, getTreeById } = TreeUtils

export { getTreePathKey, getTreeById }
