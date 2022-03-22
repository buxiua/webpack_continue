## webpack continue

---
#### 多入口

有时候我们使用webpack打包并不只使用一个入口，而是使用多个入口，这个时候就需要进行相应的配置。

```javascript
// webpack.config.js
const path = require("path")

const config = {
    // entry:"./src/index.js",
    entry:{ // 使用Object来配置多入口
        main:"./index.js",
        print:"./print.js"
    },
    output: {
        // filename:"main.min.js",
        filename:"[name].min.js", // 使用占位符来配置输出文件的文件名
        path:path.resolve(__dirname,"dist")
    },
    ...
}

module.exports = config

```

如上进行配置，将**entry**改写为object，**filename**使用有占位符([name])的string,**[name]**在最终打包的时候，最终将被替换为对应于object的key值。

---
#### 使用HtmlWebpackPlugin

在上面的例子中，使用多入口文件来对js进行打包，同时我们还需要在<b>./dist/index.html</b>中将生成的js文件手动进行引入，这种方式极不方便，且过于耦合，一旦我们更改配置文件的输出文件名，就需要在<b>./dist/index.html</b>中同步进行修改，为了解决这个问题，我们可以使用HtmlWebpackPlugin。

1. 首先引入依赖 **html-webpack-plugin**
```bash
npm i html-webpack-plugin -S
```

2. 在配置文件 **webpack.config.js** 中进行相关的配置

```javascript
// webpack.config.js
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin") // 引入 HtmlWebpackPlugin

const config = {
    ...
    // 在plugins中使用HtmlWebpackPlugin
    plugins:[
        new HtmlWebpackPlugin({
            title:"hello webpack", // 对应于生成的html的标题
        })
    ]
}

module.exports = config
```
使用HtmlWebpackPlugin将会自动生成index.html文件，并将打包的资源（js,图片，css等）自动引入该html网页中。

#### 清理./dist文件夹



