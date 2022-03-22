## webpack continue

#### 多入口
---

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