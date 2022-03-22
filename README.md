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

---
#### 清理./dist文件夹

每次 **npm run build**,都会在 <b>./dist</b> 文件夹下面生成打包后的文件。这样多次打包后的 <b>./dist</b> 文件夹下面就会很混乱，或许还会存在我们不需要的文件。最佳实战是每次打包前都清除 <b>./dist</b> 文件夹下面的内容。在配置文件下添加以下内容即可实现。


```javascript
// webpack.config.js
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const config = {
    ...
    output: {
        // filename:"main.min.js",
        filename:"[name].min.js",
        path:path.resolve(__dirname,"dist"),
        clean:true // 简单的一句，即可实现每次打包前清除./dist文件夹下的文件。
    },
    ...
}

module.exports = config

```

可以在 <b>./dist</b> 文件夹下创建一些无关的文件，再次打包，可以看见 <b>./dist</b> 文件夹下创建的无关文件被删除了。


## 使用正确的姿势来进行开发

在开发环境中，常常需要做以下的一些配置以便于我们进行更好的开发。

---
#### 使用Source Map

> 当 webpack 打包源代码时，可能会很难追踪到 error(错误) 和 warning(警告) 在源代码中的原始位置。

虽然浏览器中会将错误（ **error** ）或者警告( **warning** )打印出来，但是仅显示错误出现在打包后的文件中的哪个位置，但对我们来说，对错误进行追踪是没有丝毫用处。

> 为了更容易地追踪 error 和 warning，JavaScript 提供了 source maps 功能，可以将编译后的代码映射回原始源代码.source map 会明确的告诉你错误出现在哪一个文件，哪一行。

手动引入一个错误
```javascript
// ./js/error.js
console.log("hello webpack")
conosle.error("something error") // 此处手动引入错误
```

打包后执行：
```
print.min.js:1 
    something error                       
905 @ print.min.js:1
```

仅显示打包后的错误位置，并不能准确定位错误文件。

在配置文件中使用 source map

```javascript
// webpack.config.js
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const config = {
    ... 
    devtool:"inline-source-map", // 使用source map，更好的定位错误
    ...
}

module.exports = config

```

打包后再次在浏览器中打开html

```
error.js:1     
       something error
905 @ error.js:1

```

浏览器控制台准确给出错误在哪个文件（error.js）以及在哪一行（1）。