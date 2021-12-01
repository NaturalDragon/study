(function () {
    var root = this;
    var d = function (obj) {
        if (obj instanceof d) return obj;
        if (!(this instanceof d)) return new d(obj);
    };
    if (typeof define === "function" && define.amd) {
        define("AppSetting", [], function () {
            return d;
        });
    }
    d.serverIp = "http://112.124.28.53:5008";//'http://127.0.0.1:5008'//
    root.AppSetting = d;
}.call(this));
