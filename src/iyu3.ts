/** 单个裕语言函数参数 */
type Arg = string | number | boolean

/** 裕语言参数列表 */
type Args = Arg[]

declare global {
    interface Window {
        iyu3: Iyu3,
        /** iApp 根对象 */
        iapp: {
            /** 执行裕语言代码，不带返回值 */
            fn(iyuCode: string): void,
            /** 执行裕语言代码，带返回值 */
            fn2(iyuCode: string, iyuVarName: string): string,
            /** 设置裕语言变量的值 */
            s(iyuVarName: string, value: any): void,
            /** 获取裕语言变量的值 */
            g(iyuVarName: string): string
        }
    }
}

/** 用于 JS 交互裕语言 3.0 的工具库 */
export class Iyu3 {
    public constructor() {
        console.log('Iyu3 - By 鹏优创')
        if (typeof window.iapp == 'undefined') {
            throw new Error('没有找到 iapp 对象，请确保处于裕语言环境，并开启语言交互功能');
        }
        window.iyu3 = this
    }
    /** 回调函数 */
    public callback: Record<string, (text: string) => void> = {
        get_res(data: string) {
            alert(data)
        }
    }

    /**
     * 执行裕语言方法
     * @param iyuFunName 裕语言方法，`模块名.方法名`
     */
    public run(iyuFunName: string): void
    /**
     * 执行裕语言方法，带参数
     * @param iyuFunName 裕语言方法，`模块名.方法名`
     * @param args 函数参数列表
     */
    public run(iyuFunName: string, args: Args): void
    /**
     * 执行裕语言方法，带回调事件
     * @param iyuFunName 裕语言方法，`模块名.方法名`
     * @param callbackName 回调函数名
     */
    public run(iyuFunName: string, callbackName: string): void
    /**
     * 执行裕语言方法，带参数，带回调事件
     * @param iyuFunName 裕语言方法，`模块名.方法名`
     * @param args 函数参数列表
     * @param callbackName 回调函数名
     */
    public run(iyuFunName: string, args: Args, callbackName: string): void
    public run(iyuFunName: string, b?: Args | string, c?: string) {
        let argsStr: string
        if (c != undefined) argsStr = this.makeArgsStr(b as Args, c)
        else if (typeof b == 'string') argsStr = this.makeArgsStr([], c)
        else if (b != undefined) argsStr = this.makeArgsStr(b)
        else argsStr = this.makeArgsStr([])
        iapp.fn(`${iyuFunName}(${argsStr})`)
    }

    /**
     * 同步执行裕语言方法，带返回值
     * @param iyuFunName 裕语言方法，`模块名.方法名`
     * @param iyuVarName 裕语言全局变量名，如 `sss.var_name`
     */
    public runSync(iyuFunName: string, iyuVarName: string): string
    /**
     * 同步执行裕语言方法，带参数，带返回值
     * @param iyuFunName 裕语言方法，`模块名.方法名`
     * @param args 函数参数列表
     * @param iyuVarName 裕语言全局变量名，如 `sss.var_name`
     */
    public runSync(iyuFunName: string, args: Args, iyuVarName: string): string
    public runSync(iyuFunName: string, b: Args | string, c?: string) {
        if (c == undefined) {
            return iapp.fn2(`${iyuFunName}()`, b as string)
        } else {
            let argsStr = this.makeArgsStr(b as Args)
            return iapp.fn2(`${iyuFunName}(${argsStr})`, c)
        }
    }
    /**
     * 生成参数列表字符串
     * @param args 参数列表
     * @param callbackName 回调函数名称
     * @returns 参数列表字符串，可直接填入函数括号
     */
    private makeArgsStr(args: Args, callbackName?: string): string {
        let list: string[] = []
        args.forEach(arg => {
            if (typeof arg == 'string')
                list.push(`"${arg}"`)
            else list.push(arg.toString())
        })
        if (callbackName) list.push(`"iyu3.callback['${callbackName}']"`)
        return list.join()
    }

    /** 向裕语言控制台打印内容 */
    public log(data: Arg) {
        this.run('util.log', [data])
    }
}

export const iyu3 = new Iyu3()
export const iapp = window.iapp