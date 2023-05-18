# Iyu3

> 用于 JavaScript 交互裕语言的工具库

## 使用方法

1. 安装

    ```bash
    npm install iyu3
    ```
2. 导入 `iyu3`

    ```ts
    import { iyu3 } from 'iyu3'
    ````
3. 使用 `runSync` 方法执行裕语言模块方法，并设置返回值

    ```ts
    let data = iyu3.runSync('api.get_list', ['参数', '参数'], 'sss.data')
    iyu3.log(data) // 打印到 iApp 控制台
    ```

    也可以不传入参数：

    ```ts
    let data = iyu3.runSync('api.xxx', 'sss.data')
    iyu3.log(data)
    ```

    裕语言实现：

    ```java
    fn get_list(a, b)
    s(a + b, c)
    sss data = c
    end fn
    ```

    ```java
    fn xxx(a)
    sss data = a
    end fn
    ```
4. 使用 `run`  方法执行裕语言模块方法，并设置异步的回调函数

    ```ts
    // 挂载一个回调事件
    iyu3.callback.get_res = (data) => {
        alert(data)
    }
    // 执行裕语言方法
    iyu3.run('api.get_res', ['https://apee.top'], 'get_res')
    // 不设置回调
    iyu3.run('api.xxxx', ['https://apee.top'])
    // 不设置参数
    iyu3.run('api.xxxx', 'get_res')
    // 不设置参数和回调
    iyu3.run('api.xxxx')
    ```

    裕语言实现：

    ```java
    fn get_res(url, callback)
    t()
    {
        hs(url, ym)
        ufnsui()
        {
            fn util.run_back(callback, ym)
        }
    }
    end fn
    ```
5. 设置回调事件

    ```ts
    iyu3.callback.xxxx = (data) => {
        iyu3.log(data)
    }
    ```

## 使用示例

```ts
import { iyu3 } from 'iyu3'

for (let i = 0; i < 100; i++) {
    iyu3.log('你好呀 ' + i)
}
```

## 环境搭建

1. 安装所有依赖：`npm install`
1. 启动 HTTP 服务器：`npm server`
2. 启动 TypeScript 自动编译：`npm run build:tsc`
3. 每次修改 TS 代码，执行：`npm run build`

## 项目介绍

- 开发日期：2023 年 5 月 19 日
- 作者：欧阳鹏
- 公众号：代码十级（欢迎关注，大量精彩内容）
- 主页：https://apee.top