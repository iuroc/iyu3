# `iyu3` 模块教程

## 什么是 `iyu3`

`iyu`，是裕语言源代码的文件后缀，且本项目面向裕语言 v3 开发，故命名为 `iyu3`。

它提供了统一的方法来调用裕语言模块函数、设置回调函数、访问裕语言变量等。

## 使用方法

1. 安装 `iyu3` 模块：`npm install iyu3`
2. 在 TypeScript 中使用 iyu3

    ```ts
    import { iyu3 } from 'iyu3'
    // 调用裕语言 api 模块中的 funName 方法
    iyu3.run('api.funName')
    ```
4. 创建 HTML 文件，将 JS 引用到页面
5. 启动 HTTP 服务器
6. 新建裕语言 v3 项目
7. 创建浏览器控件
8. 载入事件：[main.onload.iyu](myu/main.onload.iyu)
9. 键盘按下事件：[main.keydown.iyu](myu/main.keydown.iyu)
10. 创建 `util.myu` 核心模块：[util.myu](myu/util.myu)
11. 创建其他模块，例如：[api.myu](myu/api.myu)
12. 修改 `util.myu` 中 `getUrl()` 方法的 `url` 变量值为前端 HTTP 访问地址
13. 运行裕语言程序