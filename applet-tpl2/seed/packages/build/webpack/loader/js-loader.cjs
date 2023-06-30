/*
 * @Date: 2022-07-26 11:06:51
 * @Description: 对js添加一些辅助功能
 */

const { parse, traverse, types: t } = require('@babel/core')
const generate = require("@babel/generator").default
const { sep } = require('path')

const processCwd = process.cwd()

const getPath = (path) => path.slice(processCwd.length).slice(1).split(sep)

// 绝对路径转换为相对路径
const rootPathTransform = (path, context, root) => {
  if (path.node.source) {
    if (path.node.source.value.startsWith(root)) {
      const value = path.node.source.value
      const s = getPath(context)
      if (s.length === 1) {
        path.node.source.value = './' + value.slice(root.length)
      } else {
        path.node.source.value = Array(s.length - 1).fill('../').join('') + value.slice(root.length)
      }
    }
  }
}

// 路径转换
// @reduxjs/toolkit => ../lib/@reduxjs/toolkit/index
const pathTransform = (path, context, pathConversion) => {
  if (Object.hasOwnProperty.call(pathConversion, path.node.source.value)) {
    const value = pathConversion[path.node.source.value]
    const s = getPath(context)
    if (s.length === 1) {
      path.node.source.value = './' + value
    } else {
      path.node.source.value = Array(s.length - 1).fill('../').join('') + value
    }
  }
}

// 环境变量替换
const envTransform = (path, env) => {
  const { name } = path.node
  if (!Object.hasOwnProperty.call(env, name)) {
    return
  }

  // 如果是对象表达式 const a = { [ENV_DEVELOPMENT]: ENV_DEVELOPMENT }
  if (path.parentPath.type === 'ObjectProperty') {
    // 替换 key
    const keyName = path.parentPath.node.key.name
    if (path.parentPath.node.computed === true) {
      if (typeof env[keyName] === 'boolean') {
        path.parentPath.node.key = t.booleanLiteral(env[keyName])
      }
      if (typeof env[keyName] === 'string') {
        path.parentPath.node.key = t.stringLiteral(env[keyName])
      }
    }

    // 替换value
    const valueName = path.parentPath.node.value.name
    if (valueName === name) {
      if (typeof env[valueName] === 'boolean') {
        path.parentPath.node.value = t.booleanLiteral(env[valueName])
      }
      if (typeof env[valueName] === 'string') {
        path.parentPath.node.value = t.stringLiteral(env[valueName])
      }
    }
    return
  }
  // 如果是成员表达式 const value = a[ENV_DEVELOPMENT]
  if (path.parentPath.type === 'MemberExpression') {
    // 如果不是计算属性就不替换
    if (path.parentPath.node.computed === false) {
      return
    }
  }
  if (typeof env[name] === 'boolean') {
    path.replaceWith(t.booleanLiteral(env[name]))
    return
  }
  if (typeof env[name] === 'string') {
    // 替换会丢失 start 和 end信息
    path.replaceWith(t.stringLiteral(env[name]))
    return
  }
}

module.exports = function loader(source) {
  if (!source) {
    return source
  }
  const callback = this.async()
  const { context } = this
  const { root, env, pathConversion } = this.getOptions()
  const ast = parse(source, {
    filename: '',
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
  })
  traverse(ast, {
    Identifier(path) {
      envTransform(path, env)
    },
    ImportDeclaration(path) {
      pathTransform(path, context, pathConversion)
      rootPathTransform(path, context, root)
    },
    ExportNamedDeclaration(path) {
      rootPathTransform(path, context, root)
    },
  })

  const output = generate(ast)

  callback(null, output.code)
}
