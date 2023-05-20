(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iyu3_1 = require("./iyu3");
/**
 * 获取文件列表
 * @param path 文件夹路径，以 `%` 开头
 */
function getFileList(path) {
    var listStr = iyu3_1.iyu3.runSync('api.getFileList', [path], 'sss.fileList');
    return listStr ? listStr.split('\n') : [];
}
function listClick(event) {
    var type = event.target.getAttribute('data-type');
    var fileName = event.target.innerText;
    if (type == 'dir') {
        nowPath += fileName + '/';
        loadFileList();
    }
    else {
        iyu3_1.iyu3.run('api.openFile', [nowPath + fileName]);
    }
}
/** 加载文件列表 */
function loadFileList(path) {
    var _a;
    if (path === void 0) { path = nowPath; }
    var fileList = getFileList(path);
    listEle.innerHTML = "";
    var classList = ['list-group-item', 'list-group-item-action'];
    if (nowPath != basePath) {
        var backBtn = document.createElement('div');
        (_a = backBtn.classList).add.apply(_a, classList);
        backBtn.innerText = '返回上一级';
        backBtn.addEventListener('click', function () {
            nowPath = nowPath.replace(/[^/]+\/$/, '');
            loadFileList();
        });
        listEle.append(backBtn);
    }
    fileList.forEach(function (fileInfo) {
        var _a;
        var info = fileInfo.split('|');
        var fileName = info[0];
        var listItem = document.createElement('div');
        (_a = listItem.classList).add.apply(_a, classList);
        listItem.innerText = fileName;
        listItem.setAttribute('data-type', info[1]);
        listItem.addEventListener('click', listClick);
        listEle.append(listItem);
    });
    window.scrollTo(0, 0);
}
var listEle = document.querySelector('.file-list');
var aboutEle = document.querySelector('.about');
aboutEle.addEventListener('click', function () {
    iyu3_1.iyu3.run('api.about');
});
var basePath = '/sdcard/';
var nowPath = basePath;
loadFileList();

},{"./iyu3":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iapp = exports.iyu3 = exports.Iyu3 = void 0;
/**
 * 用于 JS 交互裕语言 3.0 的工具库
 * @author 欧阳鹏
 * @link https://github/oyps/iyu3
 */
var Iyu3 = /** @class */ (function () {
    function Iyu3() {
        /** 回调函数 */
        this.callback = {
            get_res: function (data) {
                alert(data);
            }
        };
        console.log('Iyu3 - By 鹏优创');
        if (typeof window == 'undefined')
            throw new Error('请在浏览器中运行');
        if (typeof window.iapp == 'undefined')
            throw new Error('没有找到 iapp 对象，请确保处于裕语言环境，并开启语言交互功能');
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
/** 用于 JS 交互裕语言 3.0 的工具库 */
exports.iyu3 = new Iyu3();
/** iApp 根对象 */
exports.iapp = window.iapp;

},{}]},{},[1]);
