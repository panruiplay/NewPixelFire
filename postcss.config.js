module.exports = {
    sourceMap: true,
    plugins: {
        "autoprefixer": {
            browsers: ["Android >= 4", "Chrome >= 35", "iOS >= 7", "Safari >= 7.1"],
            remove: false,
            add: true,
        }
    }
}
