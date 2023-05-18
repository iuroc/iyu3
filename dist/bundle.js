(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
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
        if (typeof iapp == 'undefined') {
            throw new Error('没有找到 iapp 对象，请确保处于裕语言环境，并开启语言交互功能');
        }
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
        iapp.fn("".concat(iyuFunName, "(").concat(argsStr, ")"));
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
        document.write(list.join());
        return list.join();
    };
    return Iyu3;
}());
var iyu3Window = window;
var iyu3 = iyu3Window['iyu3'] = new Iyu3();
iyu3.callback.get_res = function (data) {
    alert(data);
};
iyu3.run('api.get_res', ['https://apee.top'], 'get_res');

},{}]},{},[1]);
