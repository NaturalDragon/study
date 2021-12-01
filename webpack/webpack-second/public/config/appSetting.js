(function () {
    var root = this;
    var d = function (obj) {
        if (obj instanceof d) return obj;
        if (!(this instanceof d)) return new d(obj);
    };
    if (typeof define === 'function' && define.amd) {
        define('AppSetting', [], function () {
            return d;
        });
    }

    d.componentAppid ='wxfeb7849d6d0664c6';
    d.wxJDKappId = 'wx46cd21dc7a58c497';
    d.sdkDebug=false;
    d.talkCorpId ='ding7bce156885aef6e235c2f4657eb6378f';
    d.serverIp= 'http://cd.sysdsoft.cn:21862';
    d.fileServerIp='http://171.221.227.116:21865';
    d.defaultColor='#1994F3';
    d.pubilcPath='weixin';
    d.authorDomain='https://open.weixin.qq.com';
    root.AppSetting = d;
}).call(this)
