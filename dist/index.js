/** 用于 JS 交互裕语言 3.0 的工具库 */
var Iyu3 = /** @class */ (function () {
    function Iyu3() {
        /** 回调函数 */
        this.callback = {
            get_res: function (data) {
                alert(data);
            }
        };
        if (typeof iapp == 'undefined') {
            throw new Error('没有找到 iapp 对象，请确保处于裕语言环境，并开启语言交互功能');
        }
    }
    Iyu3.prototype.run = function (iyuFunName, b, c) {
        if (c != undefined) {
            var args = b;
            var callbackName = c;
            var argsStr = this.makeArgsStr(args);
        }
    };
    Iyu3.prototype.makeArgsStr = function (args) {
        var list = [];
        args.forEach(function (arg) {
            if (typeof arg == 'string')
                list.push("\"".concat(arg, "\""));
            else
                list.push(arg.toString());
        });
        return list.join();
    };
    return Iyu3;
}());
var iyu3 = window['iyu3'] = new Iyu3();
iyu3.callback.get_res = function (data) {
    alert(data);
};
// iapp.fn('api.get_res("https://apee.top", "get_res")')
alert(123);
