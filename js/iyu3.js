"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iapp = exports.iyu3 = exports.Iyu3 = void 0;
/** 用于 JS 交互裕语言 3.0 的工具库 */
var Iyu3 = /** @class */ (function () {
    function Iyu3() {
        /** 回调函数 */
        this.callback = {
            get_res: function (data) {
                alert(data);
            }
        };
        console.log('Iyu3 - By 鹏优创');
        if (typeof window.iapp == 'undefined') {
            throw new Error('没有找到 iapp 对象，请确保处于裕语言环境，并开启语言交互功能');
        }
        window.iyu3 = this;
    }
    Iyu3.prototype.run = function (iyuFunName, b, c) {
        var argsStr;
        if (c != undefined)
            argsStr = this.makeArgsStr(b, c);
        else if (typeof b == 'string')
            argsStr = this.makeArgsStr([], c);
        else if (b != undefined)
            argsStr = this.makeArgsStr(b);
        else
            argsStr = this.makeArgsStr([]);
        exports.iapp.fn("".concat(iyuFunName, "(").concat(argsStr, ")"));
    };
    Iyu3.prototype.runSync = function (iyuFunName, b, c) {
        if (c == undefined) {
            return exports.iapp.fn2("".concat(iyuFunName, "()"), b);
        }
        else {
            var argsStr = this.makeArgsStr(b);
            return exports.iapp.fn2("".concat(iyuFunName, "(").concat(argsStr, ")"), c);
        }
    };
    /**
     * 生成参数列表字符串
     * @param args 参数列表
     * @param callbackName 回调函数名称
     * @returns 参数列表字符串，可直接填入函数括号
     */
    Iyu3.prototype.makeArgsStr = function (args, callbackName) {
        var list = [];
        args.forEach(function (arg) {
            if (typeof arg == 'string')
                list.push("\"".concat(arg, "\""));
            else
                list.push(arg.toString());
        });
        if (callbackName)
            list.push("\"iyu3.callback['".concat(callbackName, "']\""));
        return list.join();
    };
    /** 向裕语言控制台打印内容 */
    Iyu3.prototype.log = function (data) {
        this.run('util.log', [data]);
    };
    return Iyu3;
}());
exports.Iyu3 = Iyu3;
exports.iyu3 = new Iyu3();
exports.iapp = window.iapp;
