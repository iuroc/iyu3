# Iyu3

> JavaScript 交互裕语言工具库

## 使用方法

1. 安装

    ```bash
    npm install iyu3
    ```
2. 导入 `iyu3`

    ```ts
    import { iyu3 } from 'iyu3'
    ````
3. 使用 runSync 执行裕语言模块方法，并设置返回值

    ```ts
    let data = iyu3.runSync('api.get_list', ['参数', '参数'], 'sss.data')
    iyu3.run('util.log', [data])
    ```