var path = require('path')
var fs = require('fs')
const chalk = require('chalk')

const wrapper = source => {
  return `_Rluy2.default.model(require("${source}"));\n`
}

module.exports = function(source) {
  this.cacheable(false)

  try {
    var appPath = path.resolve('src/model')
    const dirs = fs.readdirSync(appPath)
    this.addContextDependency(appPath)
    appPath = appPath + '/'
    var src = fs.readdirSync(appPath).reduce(function(pre, next, index) {
      const prePath = appPath + pre
      const nextPath = appPath + next
      if (index === 1) {
        return wrapper(prePath) + wrapper(nextPath)
      }
      return wrapper(prePath)
    })

    if (dirs.length === 1) {
      src = wrapper(appPath + src)
    }

    console.log(chalk.green('adding module...'))
    return source + '\n' + src
  } catch (e) {
    console.log(chalk.red('please create a module folder in `{your app}/src/`'))
    throw e
  }

  return source + '\n' + src
}
