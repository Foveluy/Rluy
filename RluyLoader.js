var path = require('path')
var fs = require('fs')
const chalk = require('chalk')

const wrapperModel = (source, key, filename) => {
    return `_Rluy2.default.model(require("${source}"),"${filename}");\n`
}

const wrapperLayout = (source, key) => {
    return `\n _Rluy2.default.routingComponent["${key}"]=require("${source}").default;`
}

const CodeMerge = (path, wrapper) => {
    const dirs = fs.readdirSync(path)

    let src = dirs.reduce(function(pre, next, index) {
        const prePath = path + pre
        const nextPath = path + next
        const key = dirs[index]

        if (index === 1) {
            return wrapper(prePath, dirs[0], pre) + wrapper(nextPath, key, next)
        }
        return pre + wrapper(nextPath, key, next)
    })
    if (dirs.length === 1) {
        src = wrapper(path, dirs[0])
    }

    return src
}

module.exports = function(source) {
    this.cacheable(false)
    try {
        var appPath = path.resolve('src/model')
        var layoutPath = path.resolve('src/page')

        this.addContextDependency(appPath)
        this.addContextDependency(layoutPath)
        appPath = appPath + '/'
        layoutPath = layoutPath + '/'

        var src = CodeMerge(appPath, wrapperModel)
        var src2 = CodeMerge(layoutPath, wrapperLayout)

        console.log(chalk.green('adding pages...'))
        console.log(chalk.green('adding module...'))
        return source + '\n' + src + src2
    } catch (e) {
        console.log(chalk.red('please create a module folder in `{your app}/src/`'))
        throw e
    }

    return source + '\n' + src
}
