const path = require("path")

const config = {
    // entry:"./src/index.js",
    entry:{ // 使用Object来配置多入口
        main:"./src/index.js",
        print:"./src/print.js"
    },
    output: {
        // filename:"main.min.js",
        filename:"[name].min.js",
        path:path.resolve(__dirname,"dist")
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
    }
}

module.exports = config