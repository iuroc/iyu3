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
    var classList = ['list-group-item', 'list-group-item-action', 'text-break'];
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
