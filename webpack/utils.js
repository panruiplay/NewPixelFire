const path = require("path")

module.exports = {
    rootPath:(...args) => path.resolve(__dirname, '../', ...args),
    distPath:(...args) => path.resolve(__dirname, '../dist', ...args),
    srcPath:(...args) => path.resolve(__dirname, '../src', ...args),
}
