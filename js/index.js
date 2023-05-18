"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iyu3_1 = require("./iyu3");
/**
 * 获取文件列表
 * @param path 文件夹路径，以 `%` 开头
 */
function getFileList(path) {
    var listStr = iyu3_1.iyu3.runSync('api.get_file_list', [path], 'sss.file_list');
    return listStr ? listStr.split('\n') : [];
}
function listClick(event) {
    var fileName = event.target.innerText;
    nowPath += fileName + '/';
    loadFileList();
}
/** 加载文件列表 */
function loadFileList(path) {
    if (path === void 0) { path = nowPath; }
    var fileList = getFileList(path);
    listEle.innerHTML = '';
    fileList.forEach(function (fileName) {
        var listItem = document.createElement('div');
        listItem.classList.add('list-group-item', 'list-group-item-action');
        listItem.innerText = fileName;
        listItem.addEventListener('click', listClick);
        listEle.append(listItem);
    });
}
var listEle = document.querySelector('.file-list');
var aboutEle = document.querySelector('.about');
aboutEle.addEventListener('click', function () {
    iyu3_1.iyu3.run('api.about');
});
var nowPath = '%';
loadFileList();
