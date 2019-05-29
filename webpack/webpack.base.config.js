const utils = require("./utils")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const DefinePlugin = require("webpack/lib/DefinePlugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    mode: "development",
    entry: {
        main: utils.srcPath("index.js")
    },
    output: {
        filename: "index.js"
    },
    devServer: {
        contentBase: utils.rootPath("dist"),
        stats: "errors-only",
        hot: true,
        overlay: true,
        open: true,
    },
    devtool: "source-map",
    module: {
        rules: [{
            oneOf: [
                {
                    test: /(\.js)$/,
                    loader: "babel-loader"
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        {loader: "css-loader", options: {sourceMap: true}},
                        "postcss-loader",
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        {loader: "css-loader", options: {sourceMap: true}},
                        "postcss-loader",
                        {loader: "sass-loader", options: {sourceMap: true}},
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ogg)$/,
                    loader: "url-loader",
                    options: {
                        limit: 1024 * 4,
                        name: "static/media/[name].[hash:8].[ext]",
                    },
                },
            ]
        }]
    },
    plugins: [
        new CopyPlugin([{from: utils.srcPath("static"), to: utils.distPath("static")}]),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: utils.srcPath("index.html")
        }),
        new DefinePlugin({
            "process.env.BUILD_ENV": JSON.stringify("dev")
        })
    ]
}
