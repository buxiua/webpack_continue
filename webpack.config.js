const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WebapckBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // 引入 clean-webpack-plugin

const config = {
    mode:"development",
    // entry:"./src/index.js",
    entry:{ // 使用Object来配置多入口
        main:"./src/index.js",
        print:"./src/print.js"
    },
    output: {
        // filename:"main.min.js",
        filename:"[name].min.js",
        path:path.resolve(__dirname,"dist"),
    },
    devtool:"inline-source-map", // 使用source map，更好的定位错误
    devServer:{
        static:"./dist", //devServer,将./dist文件作为静态文件部分发布出去。 
    },
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:[
                    "style-loader",
                    "css-loader",
                ]
            },
            {
                test:/\.(jpg|gif|png|webp|jpeg)/i,
                type:"asset/resource"
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:"hello webpack", // 对应于生成的html的标题
        }),
        new WebapckBundleAnalyzer(),
        new CleanWebpackPlugin(), // 在plugins中使用CleanWebpackPlugin
    ]
}

module.exports = config