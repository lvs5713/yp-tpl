/*
 * @Date: 2022-07-26 19:42:16
 * @Description: 对wxml文件做功能增强
 */

const render = require("dom-serializer").default
const { Parser, DomHandler, DomUtils } = require("htmlparser2")
const { sep } = require('path')

// 创建元素
function createElement(html, cb) {
  const domHandler = new DomHandler(function(err, elem) {
    cb(elem[0])
  });
  const parser = new Parser(domHandler, {
    xmlMode: true,
  });
  parser.write(html);
  parser.end();
}
const processCwd = process.cwd()
const getPath = (path) => path.slice(processCwd.length).slice(1).split(sep)
// 自动插入组件到 html 中
function autoHtmlInsert(dom, context, usingComponentsInsert) {
  usingComponentsInsert.forEach((insertItem) => {
    if (insertItem.test(getPath(context))) {
      insertItem.values?.forEach(item => {
        createElement(item, (elem) => {
          DomUtils.append(dom[dom.length - 1], elem)
        })
      });
    }
  })
}

module.exports = function loader(source) {
  if (!source) {
    return source
  }
  const callback = this.async()
  const { usingComponentsInsert } = this.getOptions()
  const { context } = this

  const handler = new DomHandler((error, dom) => {
    if (error) {
      callback(null, source)
      return
    }
    if (usingComponentsInsert) {
      autoHtmlInsert(dom, context, usingComponentsInsert)
    }
    const code = render(dom, { 
      decodeEntities: false,
      selfClosingTags: true,
      emptyAttrs: false,
      xmlMode: false,
    })
    callback(null, code)
  }, {
    withStartIndices: true,
    withEndIndices: true,
    xmlMode: true,
  })

  const parser = new Parser(handler, {
    xmlMode: true,
  })

  parser.write(source)
  parser.end()
}
