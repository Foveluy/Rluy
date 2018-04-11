var path = require('path')
var fs = require('fs')
const chalk = require('chalk')

const wrapper = source => {
  return `_Rluy2.default.model(require("${source}"));\n`
}

const wrapperLayout = (key, componentPath) => {
  return `\n _Rluy2.default.routingComponent[${key}]=require("${componentPath}");\n`
}

module.exports = function(source) {
  this.cacheable(false)

  console.log('先走到这里哦')
  try {
    var appPath = path.resolve('src/model')
    var layoutPath = path.resolve('src/page')
    const dirs = fs.readdirSync(appPath)
    this.addContextDependency(appPath)
    appPath = appPath + '/'
    layoutPath = layoutPath + '/'
    var src = fs.readdirSync(appPath).reduce(function(pre, next, index) {
      const prePath = appPath + pre
      const nextPath = appPath + next
      if (index === 1) {
        return wrapper(prePath) + wrapper(nextPath)
      }
      return wrapper(prePath)
    })

    var src2 = fs.readdirSync(layoutPath).reduce(function(pre, next, index) {
      const prePath = layoutPath + pre
      const nextPath = layoutPath + next
      if (index === 1) {
        return wrapperLayout(index, prePath) + wrapperLayout(index + '123', nextPath)
      }
      return pre+ wrapperLayout(index, nextPath)
    })

    if (dirs.length === 1) {
      src2 = wrapperLayout(1, layoutPath + src2)
      src = wrapper(appPath + src)
    }

    console.log(chalk.green(src2))

    console.log(chalk.green('adding module...'))
    return source + '\n' + src + src2
  } catch (e) {
    console.log(chalk.red('please create a module folder in `{your app}/src/`'))
    throw e
  }

  return source + '\n' + src
}
