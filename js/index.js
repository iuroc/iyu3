"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iyu3_1 = require("./iyu3");
iyu3_1.iyu3.callback.get_res = function (data) {
    alert(data);
};
// iyu3.run('api.get_res', ['https://apee.top'], 'get_res')
// let result = iyu3.runSync('api.get_file_list', [true], 'sss.file_list')
// alert(result)
for (var i = 0; i < 100; i++) {
    iyu3_1.iyu3.log('你好呀 ' + i);
}
