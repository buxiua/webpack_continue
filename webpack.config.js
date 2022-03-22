const path = require("path")

const config = {
    entry:"./src/index.js",
    output: {
        filename:"main.min.js",
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