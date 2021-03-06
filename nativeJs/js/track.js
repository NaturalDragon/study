
! function (e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : e()
}(function () {
    function BatchSend() {
        this.sendingData = 0, this.sendingItemKeys = []
    }
    try {
        var sd = {};
        sd.modules = {};
        var _ = sd._ = {};
        "object" != typeof JSON && (JSON = {}),
            function () {
                "use strict";

                function f(e) {
                    return e < 10 ? "0" + e : e
                }

                function this_value() {
                    return this.valueOf()
                }

                function quote(e) {
                    return rx_escapable.lastIndex = 0, rx_escapable.test(e) ? '"' + e.replace(rx_escapable, function (e) {
                        var t = meta[e];
                        return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                    }) + '"' : '"' + e + '"'
                }

                function str(e, t) {
                    var r, s, a, n, i, o = gap,
                        d = t[e];
                    switch (d && "object" == typeof d && "function" == typeof d.toJSON && (d = d.toJSON(e)), "function" == typeof rep && (d = rep.call(t, e, d)), typeof d) {
                        case "string":
                            return quote(d);
                        case "number":
                            return isFinite(d) ? String(d) : "null";
                        case "boolean":
                        case "null":
                            return String(d);
                        case "object":
                            if (!d) return "null";
                            if (gap += indent, i = [], "[object Array]" === Object.prototype.toString.apply(d)) {
                                for (n = d.length, r = 0; r < n; r += 1) i[r] = str(r, d) || "null";
                                return a = 0 === i.length ? "[]" : gap ? "[\n" + gap + i.join(",\n" + gap) + "\n" + o + "]" : "[" + i.join(",") + "]", gap = o, a
                            }
                            if (rep && "object" == typeof rep)
                                for (n = rep.length, r = 0; r < n; r += 1) "string" == typeof rep[r] && (s = rep[r], a = str(s, d), a && i.push(quote(s) + (gap ? ": " : ":") + a));
                            else
                                for (s in d) Object.prototype.hasOwnProperty.call(d, s) && (a = str(s, d), a && i.push(quote(s) + (gap ? ": " : ":") + a));
                            return a = 0 === i.length ? "{}" : gap ? "{\n" + gap + i.join(",\n" + gap) + "\n" + o + "}" : "{" + i.join(",") + "}", gap = o, a
                    }
                }
                var rx_one = /^[\],:{}\s]*$/,
                    rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                    rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                    rx_four = /(?:^|:|,)(?:\s*\[)+/g,
                    rx_escapable = /[\\\"--??????-?????????????-??? -??????-?????????-???]/g,
                    rx_dangerous = /[????-?????????????-???-??????-?????????-???]/g;
                ction" != typeof Date.proto type.toJSON && (Date.prototype.toJSON = function() {
                    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
                }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value,  String.prototype.toJSON = this_value);
                var gap, indent, meta, rep;
                "function" != typeof JSON.stringify && (meta = {
                    "\b": "\\b",
                    "\t": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                }, JSON.stringify = function(e, t, r) {
                    var s;
                    if (gap = "", indent = " ", "number" == typeof r)
                        for (s = 0; s < r; s += 1) indent += " ";
                    else "string" == typeof r && (indent = r); if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
                    return str("", {
                        "": e
                    })
                }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
                    function walk(e, t) {
                        var r, s, a = e[t]; 
                        if (a && "object" == typeof a)
                            for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (s = walk(a, r), void 0 !== s ? a[r] = s : delete a[r]);
                        return reviver.call(e, t, a)
                    }
                    var j;
                    if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function(e) {
                        return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                    })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"),  "function" == typeof reviver ? walk({
                        "": j
                    }, "") : j;
                    throw new SyntaxError("JSON.parse")
                })
            }(),
            function(e, t) {
                t(e)
            }(window , function(e) {
                if (e.atob) try {
                    e.atob(" " )
                } catch (t) {
                    e.atob = function(e) {
                        var t = function(t) {
                            return e( String(t).replace(/[\t\n\f\r ]+/g, ""))
                        }; 
                        return t.original = e, t
                    }(e.atob)
                } else {
                    var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                        s = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
                    e.btoa = function(e) {
                        e = String(e);
                        for (var t, s , a, n, i = "", o = 0, d = e.length % 3; o < e.length;)((s = e.charCodeAt(o++)) > 255 || (a = e.charCodeAt(o++)) > 255 || (n = e.charCodeAt(o++)) > 255) && sd.log("Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range."), t = s << 16 | a << 8 | n, i += r.charAt(t >> 18 & 63) + r.charAt(t >> 12 & 63) + r.charAt(t >> 6 & 63) + r.charAt(63 & t);
                        return d ? i.slice(0, d - 3) + "===".substring(d) : i
                    }, e.atob = function(e) {
                        e = String(e).replace(/[\t\n\f\r ]+/g, ""), s.test(e) || sd.log("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded."), e += "==".slice(2 - (3 & e.length));
                        for (var t, a, n , i = "", o = 0; o < e.length;) t = r.indexOf(e.charAt(o++)) << 18 | r.indexOf(e.charAt(o++)) << 12 | (a = r.indexOf(e.charAt(o++))) << 6 | (n = r.indexOf(e.charAt(o++))), i += 64 === a ? String.fromCharCode(t >> 16 & 255) : 64 === n ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);
                        return i
                    }
                }
            }),
            function() {
                var e = Array.prototype,
                     t = Function.prototype,
                    r = Object.prototype,
                    s = e.slice,
                    a = r.toString,
                    n = r.hasOwnProperty,
                    i = (t.bind, e.forEach),
                    o = (e.indexOf, Array.isArray),
                    d = {},
                    c = _.each = function(e, t, r) {
                        if (null == e) return !1;
                        if (i && e.forEac h === i) e.forEach(t, r);
                        else if (_.isArray(e) && e.length === +e.length) {
                            for (var s = 0, a = e.length; s < a; s++)
                                if (s in e && t.call(r, e[s], s, e) === d) return !1
                        } else
                            for (var o in e)
                                if (n.call(e, o) && t.call(r, e[o], o, e) === d) return !1
                    };
                _.map = function(e, t) {
                    var r = [];
                    return null  == e ? r : Array.prototype.map && e.map === Array.prototype.map ? e.map(t) : (c(e, function(e, s, a) {
                        r.push(t(e, s, a))
                    }), r) 
                }, _.extend = function(e) {
                    return c(s.call(arguments, 1), function(t) {
                        for (var r in  t) n.call(t, r) && void 0 !== t[r] && (e[r] = t[r])
                    }), e 
                }, _.extend2Lev = function(e) {
                    return c(s.call(arguments, 1), function(t) {
                        for (var r in t) v oid 0 !== t[r] && (_.isObject(t[r]) && _.isObject(e[r]) ? _.extend(e[r], t[r]) : e[r] = t[r])
                    }), e 
                }, _.coverExtend = function(e) {
                    return c(s.call(arguments, 1), function(t) {
                        for (var r in t) vo id 0 !== t[r] && void 0 === e[r] && (e[r] = t[r])
                    }), e 
                }, _.isArray = o || function(e) {
                    return "[object Array]" === a.call(e)
                }, _.isFunction = function(e ) {
                    if (!e) return !1;
                    try { 
                        return /^\s*\bfunction\b/.test(e)
                    } catch (t) {
                        return !1
                    }
                }, _.isArguments = function(e) {
                    return !(!e || !n.call(e, "callee"))
                }, _.toArray = function(e)  {
                    return e ? e.toArray ? e.toArray() : _.isArray(e) ? s.call(e) : _.isArguments(e) ? s.call(e) : _.values(e) : []
                }, _.values = function( e) {
                    var t = [];
                    return null == e ?  t : (c(e, function(e) {
                        t[t.length] = e
                    }), t) 
                }, _.indexOf = function(e, t) {
                    var r = e.indexOf;
                    if (r) return r.cal l(e, t);
                    for (var s = 0; s < e.length; s++)
                        if (t === e[s]) return s;
                    return -1
                }, _.hasAttributes = function(e, t) {
                    if ("string" == typeof t) return _.hasAttribute(e, t);
                    if (_.isArray(t)) { 
                        for (var r = !1, s = 0; s < t.length; s++) {
                            var a = _.hasAttribute(e, t[s]);
                            if (a) {
                                r = !0;
                                break
                            }
                        }
                        return r
                    }
                }, _.hasAttribute = function(e, t) {
                    return e.hasAttribute ? e.hasAttribute(t) : !(!e.attributes[t] || !e.attributes[t].specified)
                }, _.filter = function(e, t,  r) {
                    var s = Object.prototype.hasOwnProperty;
                    if (e.filter) retu rn e.filter(t);
                    for (var a = [], n = 0; n < e.length; n++)
                        if (s.call(e, n)) {
                            var i = e[n];
                            t.call(r, i, n, e) && a.push(i)
                        }
                    return a
                }, _.inherit = function(e, t) {
                    return e.prototype = new t, e.prototype.constructor = e, e.superclass = t.prototype, e
                }, _.trim = function(e)  {
                    return e.replace(/^[\s?????]+|[\s?????]+$/g, "")
                }, _.isObject = func tion(e) {
                    return null != e && "[object Object]" == a.call(e)
                }, _.isEmptyObject = fun ction(e) {
                    if (_.isObject(e)) {
                        for (var t in e) 
                            if (n.call(e, t)) return !1;
                        return !0
                    }
                    return !1
                }, _.isUndefined = function(e) {
                    return void 0 === e
                }, _.isString = function(e)  {
                    return "[object String]" == a.call(e)
                }, _.isDate = function(e ) {
                    return "[object Date]" == a.call(e)
                }, _.isBoolean = funct ion(e) {
                    return "[object Boolean]" == a.call(e)
                }, _.isNumber = function( e) {
                    return "[object Number]" == a.call(e) && /[\d\.]+/.test(String(e))
                }, _.isElement = functio n(e) {
                    return !(!e || 1 !== e.nodeType)
                }, _.isJSONString = funct ion(e) {
                    try {
                        JSON.parse(e) 
                    } catch (t) {
                        return !1
                    }
                    return !0
                }, _.safeJSONParse = function(e) {
                    var t = null;
                    try { 
                        t = JSON.parse(e)
                    } catch (r) {
                        return !1
                    }
                    return t
                }, _.decodeURIComponent = function(e) {
                    var t = e;
                    try { 
                        t = decodeURIComponent(e)
                    } catch (r) {
                        t = e
                    }
                    return t
                }, _.encodeDates = function(e) {
                    return _.each(e, function(t, r) {
                        _.isDate(t) ? e[r]  = _.formatDate(t) : _.isObject(t) && (e[r] = _.encodeDates(t))
                    }), e 
                }, _.mediaQueriesSupported = function() {
                    return "undefined" != typeof window.matchMedia || "undefined" != typeof window.msMatchMedia
                }, _.getScreenOrientation = function( ) {
                    var e = screen.msOrientation || screen.mozOrientation || (screen.orientation || {}).type,
                        t = "????????????"; 
                    if (e) t = e.indexOf("landscape") > -1 ? "landscape" : "portrait";
                    else if (_.mediaQueriesSupported()) {
                        var r = window.matchMedia || window.msMatchMedia;
                        r("(orientation: landscape)").matches ? t = "landscape" : r("(orientation: portrait)").matches && (t = "portrait")
                    }
                    return t
                }, _.now = Date.now || function() {
                    return (new Date).getTime()
                }, _.throttle = function(e, t,  r) {
                    var s, a, n, i = null,
                        o = 0; 
                    r || (r = {});
                    var d = function() {
                        o = r.leading === !1 ? 0 : _.now(), i = null, n = e.apply(s, a), i || (s = a = null)
                    }; 
                    return function() {
                        var c = _.now();
                        o || r.lead ing !== !1 || (o = c);
                        var u = t - (c - o);
                        return s = this, a = arguments, u <= 0 || u > t ? (i && (clearTimeout(i), i = null), o = c, n = e.apply(s, a), i || (s = a = null)) : i || r.trailing === !1 || (i = setTimeout(d, u)), n
                    }
                }, _.hashCode = function(e) {
                    if ("string" != typeof e) return 0;
                    var t = 0, 
                        r = null;
                    if (0 == e.length) return t;
                    for (var s = 0; s < e.length; s++) r = e.charCodeAt(s), t = (t << 5) - t + r, t &= t;
                    return t
                }, _.formatDate = function(e) {
                    function t(e) {
                        return e < 10 ? "0 " + e : e
                    }
                    return e.getFullYear() + "-" + t(e.getMonth() + 1) + "-" + t(e.getDate()) + " " + t(e.getHours()) + ":" + t(e.getMinutes()) + ":" + t(e.getSeconds()) + "." + t(e.getMilliseconds())
                }, _.searchObjDate = function(e) {
                    _.isObject(e) && _.each(e, function(t, r) {
                        _.isObject(t) ? _.sea rchObjDate(e[r]) : _.isDate(t) && (e[r] = _.formatDate(t))
                    }) 
                }, _.searchZZAppStyle = function(e) {
                    "undefined" != typeof e.properties.$project && (e.project = e.properties.$project, delete e.properties.$project), "undefined" != typeof e.properties.$token && (e.token = e.properties.$token, delete e.properties.$token)
                }, _.formatJsonString = function (e) {
                    try {
                        return JSON.stringify(e,  null, "  ")
                    } catch (t) {
                        return JSON.stringify(e)
                    }
                }, _.formatString = function(e, t) {
                    return _.isNumber(t) && e.length > t ? (sd.log("?????????????????????????????????????????????--" + e), e.slice(0, t)) : e
                }, _.searchObjString = funct ion(e) {
                    _.isObject(e) && _.each(e, function(t, r) {
                        _.isObject(t) ? _.searc hObjString(e[r]) : _.isString(t) && (e[r] = _.formatString(t, "$element_selector" === r ? 1024 : sd.para.max_string_length))
                    }) 
                }, _.parseSuperProperties = function(e) {
                    _.isObject(e) && (_.each(e, function(t, r) {
                        if (_.isFunction(t)) try { 
                            e[r] = t(), _.isFunction(e[r ]) && (sd.log("????????????- " + r + " ????????????????????????????????????????????????"), delete e[r])
                        } catch (s) {
                            delete e[r], sd.log("????????????- " + r + " ??????????????????????????????????????????")
                        }
                    }), _.strip_sa_properties(e))
                }, _.filterReservedProperties = function(e) {
                    var t = ["distinct_id", "user_id", "id", "date", "datetime", "event", "events", "first_id", "original_id", "device_id", "properties", "second_id", "time", "users"];
                    _.isObject(e) && _.each(t, function( t, r) {
                        t in e && (r < 3 ? (delete e[t], sd.log("????????????- " + t + "??????????????????????????????????????????")) : sd.log("????????????- " + t + "?????????????????????????????????????????????"))
                    }) 
                }, _.searchConfigData = function(e) {
                    if ("object" == typeof e && e.$option) {
                        var t = e.$option; 
                        return delete e.$option, t
                    }
                    return {}
                }, _.unique = function(e) {
                    for (var t, r = [], s = {}, a = 0; a < e.length; a++) t = e[a], t in s || (s[t] = !0, r.push(t));
                    return r 
                }, _.strip_sa_properties = function(e) {
                    return _.isObject(e) ? (_.each(e, function(t, r) {
                        if (_.isArray(t)) { 
                            var s = []; 
                            _.each(t, function(e) {
                                _.isString(e) ? s.push(e) : sd.log("????????????-", r, t, "????????????????????????????????????,??????????????????")
                            }), 0 !== s.length  ? e[r] = s : (delete e[r], sd.log("????????????????????????"))
                        }
                        _.isString(t) || _.isNumber(t) || _.isDate(t) || _.isBoolean(t) || _.isArray(t) || _.isFunction(t) || "$option" === r || (sd.log("????????????-", r, t, "-????????????????????????????????????????????????"), delete e[r])
                    }), e) : e
                }, _.strip_empty_properties = function(e) {
                    var t = {};
                    return _.each(e, function(e, r) { 
                        null != e && (t[r] = e)
                    }), t 
                }, _.base64Encode = function(e) {
                    return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(e, t) {
                        return String.fromCh arCode("0x" + t)
                    })) 
                }, _.base64Decode = function(e) {
                    var t = _.map(atob(e).split(""), function(e) {
                        return "%" + ("00" +  e.charCodeAt(0).toString(16)).slice(-2)
                    }); 
                    return decodeURIComponent(t.join(""))
                }, _.UUID = function() {
                    var e = function() {
                            for (var  e = 1 * new Date, t = 0; e == 1 * new Date;) t++;
                            return e .toString(16) + t.toString(16)
                        
                        function() {
                        return Math.random().toString(16).replace(".", "")
                        }, 
                        r = function(e) {
                            function t(e, t) {
                                var  r, s = 0;
                                for (r = 0; r < t.length; r++) s |= n[r] << 8 * r;
                                return e ^ s
                            }
                            var r, s, a = navigator.userAgent,
                                n = [],
                                i = 0;
                            for (r = 0; r < a.length; r++) s = a.charCodeAt(r), n.unshift(255 & s), n.length >= 4 && (i = t(i, n), n = []);
                            return n.length > 0 && (i = t(i, n)), i.toString(16)
                        };
                    return function() {
                        var s = String(screen.height * screen.width);
                        s = s && /\ d{5,}/.test(s) ? s.toString(16) : String(31242 * Math.random()).replace(".", "").slice(0, 8);
                        var a = e() + "-" + t() + "-" + r() + "-" + s + "-" + e();
                        return a ? a : (String(Math.random()) + String(Math.random()) + String(Math.random())).slice(2, 15)
                    }
                }(), _.getQueryParam = function(e, t) {
                    t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"), e = _.decodeURIComponent(e);
                    var r = "[\\?&]" + t + "=([ ^&#]*)",
                        s = new RegExp(r),
                        a = s.exec(e);
                    return null === a || a && "string" != typeof a[1] && a[1].length ? "" : _.decodeURIComponent(a[1])
                }, _.urlParse = function(e) {
                    var t = function(e) {
                        this._fields = { 
                            Username : 4,
                            Password: 5,
                            Port: 7,
                            Protocol: 2,
                            Host: 6,
                            Path: 8,
                            URL: 0,
                            QueryString: 9,
                            Fragment: 10
                        }, this._values = {}, this._regex = null, this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/, "undefined" != typeof e && this._parse(e)
                    };
                    return t.prototype.setUrl = function(e) {
                        this._parse(e)
                    }, t.prototype._initValues = functio n() {
                        for (var e in this._fields) this._values[e] = ""
                    }, t.prototype.addQueryString = funct ion(e) {
                        if ("object" != typeof e) return !1;
                        var t = this._values.QueryString ||  "";
                        for (var r in e) t = new RegExp(r + "[^&]+").test(t) ? t.replace(new RegExp(r + "[^&]+"), r + "=" + e[r]) : "&" === t.slice(-1) ? t + r + "=" + e[r] : "" === t ? r + "=" + e[r] : t + "&" + r + "=" + e[r];
                        this._values.QueryString = t
                    }, t.prototype.getUrl = function() {
                        var e = "";
                        return e += this._values.Ori gin, e += this._values.Port ? ":" + this._values.Port : "", e += this._values.Path, e += this._values.QueryString ? "?" + this._values.QueryString : "", e += this._values.Fragment ? "#" + this._values.Fragment : ""
                    }, t.prototype.getUrl = function() {
                        var e = "";
                        return e += this._values.Ori gin, e += this._values.Port ? ":" + this._values.Port : "", e += this._values.Path, e += this._values.QueryString ? "?" + this._values.QueryString : ""
                    }, t.prototype._parse = function(e) {
                        this._initValues();
                        var t = this._regex.exec(e); 
                        t || sd.log("DPURLParser::_parse -> Invalid URL");
                        for (var r in this._fields) "undefined" != typeof t[this._fields[r]] && (this._values[r] = t[this._fields[r]]);
                        this._values.Hostname = this._values.Host.replace(/:\d+$/, ""), this._values.Origin = this._values.Protocol + "://" + this._values.Hostname
                    }, new t(e)
                }, _.addEvent = function() {
                    function e(t) {
                        return t && (t.p reventDefault = e.preventDefault, t.stopPropagation = e.stopPropagation, t._getPath = e._getPath), t
                    }

                    function t(t, r, s) {
                        var a = function(a) {
                            if (a = a || e(window.event)) {
                                a.target  = a.srcElement;
                                var n, i, o = !0;
                                return "function" == typeof s && (n = s(a)), i = r.call(t, a), !1 !== n && !1 !== i || (o = !1), o
                            }
                        };
                        return a
                    }
                    e._getPath = function() {
                        var e = this,
                            t = function( ) {
                                try {
                                    var  t = e.target,
                                        r = [t];
                                    if (null === t || null === t.parentElement) return [];
                                    for (; null !== t.parentElement;) t = t.parentElement, r.unshift(t);
                                    return r
                                } catch (s) {
                                    return []
                                }
                            };
                        return this.path || this.composedPath && this.composedPath() || t()
                    }, e.preventDefault = function() {
                        this.returnValue = !1
                    }, e.stopPropagation = functio n() {
                        this.cancelBubble = !0
                    }; 
                    var r = function(r, s, a) {
                        var n = !(!_.isObject(sd.para.heatmap) || !sd.para.heatmap.useCapture);
                        if (_.isObje ct(sd.para.heatmap) && "undefined" == typeof sd.para.heatmap.useCapture && "click" === s && (n = !0), r && r.addEventListener) r.addEventListener(s, function(t) {
                            t._getPath = e._getPath, a.call(this, t)
                        }, n); 
                        else {
                            var i = "on" + s,
                                o = r[i];
                            r[i] = t(r, a, o)
                        }
                    };
                    r.apply(null, arguments)
                }, _.addHashEvent = function(e) {
                    var t = "pushState" in window.history ? "popstate" : "hashchange";
                    _.addEvent(window, t, e) 
                }, _.addSinglePageEvent = function(e) {
                    var t = location.href,
                        r = window.history.pushSta te,
                        s = window.history.replaceState;
                    window.history.pushState = function() {
                        r.apply(window.history, arguments), e(t), t = location.href
                    }, window.history.replaceState = fu nction() {
                        s.apply(window.history, arguments), e(t), t = location.href
                    }; 
                    var a = r ? "popstate" : "hashchange";
                    _.addEvent(window, a, function() {
                        e(t), t = location.href
                    }) 
                }, _.cookie = {
                    get: function(e) {
                        for (var t = e + "=", r = document.cookie.split(";"), s = 0; s < r.length; s++) {
                            for ( var a = r[s];
                                " " == a.charAt(0);) a = a.substring(1, a.length);
                            if (0 == a.indexOf(t)) return _.decodeURIComponent(a.substring(t.length, a.length))
                        }
                        return null
                    },
                    set: function(e, t, r, s, a) {
                        s = "undefined" == typeof s ? sd.para.cross_subdomain : s;
                        var n = " ",
                            i = "",
                            o = "";
                        if (r = null == r ? 73e3 : r, s) {
                            var d = _.getCurrentDomain(location.href);
                            "url????????????" === d && (d = ""), n = d ? "; domain=" + d : ""
                        }
                        if (0 !== r) {
                            var c = new Date;
                            "s" === String(r).slice(-1) ? c.setTime(c.getTime() + 1e3 * Number(String(r).slice(0, -1))) : c.setTime(c.getTime() + 24 * r * 60 * 60 * 1e3), i = "; expires=" + c.toGMTString()
                        }
                        a && (o = "; secure"), document.cookie = e + "=" + encodeURIComponent(t) + i + "; path=/" + n + o
                    },
                    remove: function(e, t) {
                        t = "undefined" == typeof t ? sd.para.cross_subdomain : t, _.cookie.set(e, "", -1, t)
                    }, 
                    getCookieName: function(e, t) {
                        var r = "";
                        if (t = t || locati on.href, sd.para.cross_subdomain === !1) {
                            try {
                                r = _.URL(t).hostname
                            } catch (s) {
                                sd.log(s)
                            }
                            r = "string" == typeof r && "" !== r ? "sajssdk_2015_" + e + "_" + r.replace(/\./g, "_") : "sajssdk_2015_root_" + e
                        } else r = "sajssdk_2015_cross_" + e;
                        return r
                    },
                    getNewUser: function() {
                        var e = "new_user";
                        return null !==  this.get("sensorsdata_is_new_user") || null !== this.get(this.getCookieName(e))
                    }
                }, _.getElementContent = function(e, t) {
                    var r = "",
                        s = ""; 
                    return e.textContent ? r = _.trim(e.textContent) : e.innerText && (r = _.trim(e.innerText)), r && (r = r.replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255)), s = r || "", "input" !== t && "INPUT" !== t || ("button" === e.type || "submit" === e.type ? s = e.value || "" : sd.para.heatmap && "function" == typeof sd.para.heatmap.collect_input && sd.para.heatmap.collect_input(e) && (s = e.value || "")), s
                }, _.getEleInfo = function(e) {
                    if (!e.target) return !1;
                    var t = e.target, 
                        r = t.tagName.toLowerCase(),
                        s = {};
                    return s.$element_type = r, s.$element_name = t.getAttribute("name"), s.$element_id = t.getAttribute("id"), s.$element_class_name = "string" == typeof t.className ? t.className : null, s.$element_target_url = t.getAttribute("href"), s.$element_content = _.getElementContent(t, r), s = _.strip_empty_properties(s), s.$url = location.href, s.$url_path = location.pathname, s.$title = document.title, s.$viewport_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0, s
                }, _.localStorage = {
                    get: function(e) {
                        return window.localStorage.getItem(e)
                    }, 
                    parse: function(e) {
                        var t;
                        try { 
                            t = JSON.parse(_.localStorage.get(e)) || null
                        } catch (r) {
                            sd.log(r)
                        }
                        return t
                    },
                    set: function(e, t) {
                        window.localStorage.setItem(e, t)
                    }, 
                    remove: function(e) {
                        window.localStorage.removeItem(e)
                    }, 
                    isSupport: function() {
                        var e = !0;
                        try { 
                            var t = "__sensorsdatasupport__",
                                r = "testIsSupportStorage";
                            _.localStorage.set(t, r), _.localStorage.get(t) !== r && (e = !1), _.localStorage.remove(t)
                        } catch (s) {
                            e = !1
                        }
                        return e
                    }
                }, _.sessionStorage = {
                    isSupport: function() {
                        var e = !0,
                            t = "__sens orsdatasupport__",
                            r = "testIsSupportStorage";
                        try {
                            sessionStorage && sessionStorage.setItem ? (sessionStorage.setItem(t, r), sessionStorage.removeItem(t, r), e = !0) : e = !1
                        } catch (s) {
                            e = !1
                        }
                        return e
                    }
                }, _.isSupportCors = function() {
                    return "undefined" != typeof window.XMLHttpRequest && ("withCredentials" in new XMLHttpRequest || "undefined" != typeof XDomainRequest)
                }, _.xhr = function(e) { 
                    if (e) return "undefined" != typeof window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest ? new XMLHttpRequest : "undefined" != typeof XDomainRequest ? new XDomainRequest : null;
                    if ("undefined"  != typeof window.XMLHttpRequest) return new XMLHttpRequest;
                    if (window.ActiveXObject) try {
                        return new ActiveXObject("Msxml2.XMLHTTP")
                    } catch (t) {
                        try {
                            return new ActiveXObject("Microsoft.XMLHTTP")
                        } catch (t) {
                            sd.log(t)
                        }
                    }
                }, _.ajax = function(e) {
                    function t(e) {
                        if (!e) retu rn "";
                        try {
                            return JSON.parse(e)
                        } catch (t) {
                            return {}
                        }
                    }

                    function r() {
                        try {
                            _.isObject(s) && s.abort && s.abort()
                        } catch (t) {
                            sd.log(t)
                        }
                        a && (clearTimeout(a), a = null, e.error && e.error(), s.onreadystatechange = null, s.onload = null, s.onerror = null)
                    }
                    e.timeout = e.timeout || 2e4, e.credentials = "undefined" == typeof e.credentials || e.credentials;
                    var s = _.xhr(e.cors);
                    if (!s) return !1;
                    e.type || (e.type = e.data ? "POST" : "GET"), e = _.extend({
                        success: function() {},
                        error: function() {}
                    }, e), sd.debug.proto col. ajax(e.url);
                    var a, n = e.succes s, 
                        i = e.error;
                    e.success = function(e) {
                        n(e), a && (clearTimeout(a), a = null)
                    }, e.error = functio n(e) {
                        i(e), a && (clearTimeout(a), a = null)
                    }, a = setTimeout(fun ction() {
                        r()
                    }, e.timeout), "undefined"  != typeof XDomainRequest && s instanceof XDomainRequest && (s.onload = function() {
                        e.success && e.success(t(s.responseText)), s.onreadystatechange = null, s.onload = null, s.onerror = null
                    }, s.onerror = function() { 
                        e.error && e.error(t(s.responseText), s.status), s.onreadystatechange = null, s.onerror = null, s.onload = null
                    }), s.onreadystatechang e = function() {
                        try {
                            4 == s.readyState && (s.sta tus >= 200 && s.status < 300 || 304 == s.status ? e.success(t(s.responseText)) : e.error(t(s.responseText), s.status), s.onreadystatechange = null, s.onload = null)
                        } catch (r) {
                            s.onreadystatechange = null, s.onload = null
                        }
                    }, s.open(e.type, e.url, !0);
                    try {
                        e.credentials && (s.withCredentials = !0), _.isObject(e.header) && _.each(e.header, function(e, t) {
                            s.setRequestHeader && s.setRequestHeader(t, e)
                        }), e.data && (e.cors || s.setRequestHeader && s.setRequestHeader("X-Requested-With", "XMLHt tpRequest"), "application/json" === e.contentType ? s.setRequestHeader && s.setRequestHeader("Content-type", "application/json; charset=UTF-8") : s.setRequestHeader && s.setRequestHeader("Content-type", "application/x-www-form-urlencoded"))
                    } catch (o) {
                        sd.log(o)
                    }
                    s.send(e.data || null)
                }, _.loadScript = function(e) {
                    e = _.extend({
                        success: function( ) {},
                        error: function() {},
                        appendCall: funct ion( e) {
                            document.ge tEle mentsByTagName("head")[0].appendChild(e)
                        } 
                    }, e);
                    var t = null;
                    "css" === e.type && (t = document.createElement("link"), t.rel = "stylesheet", t.href = e.url), "js" === e.type && (t = document.createElement("script"), t.async = "async", t.setAttribute("charset", "UTF-8"), t.src = e.url, t.type = "text/javascript"), t.onload = t.onreadystatechange = function() {
                        this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (e.success(), t.onload = t.onreadystatechange = null)
                    }, t.onerror = function() { 
                        e.error(), t.onerror = null
                    }, e.appendCall(t) 
                }, _.getHostname = function(e, t) {
                    t && "string" == typeof t || (t = "hostname????????????");
                    var r = null; 
                    try {
                        r = _.URL(e).hostname
                    } catch (s) {
                        sd.log("getHostname?????????url??????????????????")
                    }
                    return r || t
                }, _.getQueryParamsFromUrl = function(e) {
                    var t = {},
                        r = e.split("?"), 
                        s = r[1] || "";
                    return s && (t = _.getURLSearchParams("?" + s)), t
                }, _.getURLSearchParams = function(e) {
                    e = e || "";
                    for (var t = function(e) { 
                        return decodeURIComponent(e)
                    }, r = {}, s = e.subs tring(1), a = s.split("&"), n = 0; n < a.length; n++) {
                        var i = a[n].indexOf("=");
                        if (i !== -1) {
                            var o = a[n].substring(0, i),
                                d = a[n].substring(i + 1);
                            o = t(o), d = t(d), r[o] = d
                        }
                    }
                    return r
                }, _.URL = function(e) {
                    var t = {},
                        r = ["hash" , "host", "hostname", "href", "origin", "password", "pathname", "port", "protocol", "search", "username"],
                        s = function() {
                            var e;
                            try { 
                                return e = new URL("http://modernizr.com/"), "http://modernizr.com/" === e.href
                            } catch (t) {
                                return !1
                            }
                        };
                    if ("function" == typeof window.URL && s()) t = new URL(e), t.searchParams || (t.searchParams = function() {
                        var e = _.getURLSearchParams(t.search);
                        return { 
                            get: function(t) {
                                return e[t]
                            } 
                        }
                    }());
                    else {
                        var a = /^https?:\/\/.+/;
                        a.test(e) === !1 && sd.log("Invalid URL");
                        var n = document.createElement("a");
                        n.href = e;
                        for (var i = r.length - 1; i >= 0; i--) {
                            var o = r[i];
                            t[o] = n[o]
                        }
                        t.hostname && "string" == typeof t.pathname && 0 !== t.pathname.indexOf("/") && (t.pathname = "/" + t.pathname), t.searchParams = function() {
                            var e = _.getURLSearchParams(t.search);
                            return { 
                                get: function(t) {
                                    return e[t]
                                } 
                            }
                        }()
                    }
                    return t
                }, _.getCurrentDomain = function(e) {
                    var t = sd.para.current_domain;
                    switch (typeof t) { 
                        case "function":
                            var r = t();
                            return "" === r || "" === _.trim(r) ? "url????????????" : r.indexOf(".") !== -1 ? r : "url????????????";
                        case "string":
                            return "" === t || "" === _.trim(t) ? "url????????????" : t.indexOf(".") !== -1 ? t : "url????????????";
                        default:
                            var s = _.getCookieTopLevelDomain();
                            return "" === e ? "url????????????" : "" === s ? "url????????????" : s
                    }
                }, _.getCookieTopLevelDomain = function(e) {
                    e = e || window.location.hostname;
                    var t = e.split("."); 
                    if (_.isArray(t) && t.length >= 2 && !/^(\d+\.)+\d+$/.test(e))
                        for (var r = "." + t.splice(t.length - 1, 1); t.length > 0;)
                            if (r = "." + t.splice(t.length - 1, 1) + r, document.cookie = "sensorsdata_domain_test=true; path=/; domain=" + r, document.cookie.indexOf("sensorsdata_domain_test=true") !== -1) {
                                var s = new Date;
                                return s.setTime(s.getTime() - 1e3), document.cookie = "sensorsdata_domain_test=true; expires=" + s.toGMTString() + "; path=/; domain=" + r, r
                            }
                    return ""
                }, _.isReferralTraffic = function(e) {
                    return e = e || document.referrer, "" === e || _.getCookieTopLevelDomain(_.getHostname(e)) !== _.getCookieTopLevelDomain()
                }, _.ry = function(e) { 
                    return new _.ry.init(e)
                }, _.ry.init = fun ction(e) {
                    this.ele = e
                }, _.ry.init.prototype  = {
                    addClass: function(e) {
                        var t = " " + this.ele.className + " ";
                        return t.index Of(" " + e + " ") === -1 && (this.ele.className = this.ele.className + ("" === this.ele.className ? "" : " ") + e), this
                    },
                    removeClass: function(e) {
                        var t = " " + this.ele.className + " ";
                        return t.indexOf( " " + e + " ") !== -1 && (this.ele.className = t.replace(" " + e + " ", " ").slice(1, -1)), this
                    },
                    hasClass: function(e) {
                        var t = " " + this.ele.className + " ";
                        return t.index Of(" " + e + " ") !== -1
                    },
                    attr: function(e, t) {
                        return "string" == typeof e && _.isUndefined(t) ? this.ele.getAttribute(e) : ("string" == typeof e && (t = String(t), this.ele.setAttribute(e, t)), this)
                    }, 
                    offset: function() {
                        var e = this.ele.getBoundingClientRect();
                        if (e.width  || e.height) {
                            var t = this.ele.ownerDocument,
                                r = t.documentElement;
                            return {
                                top: e.top + window.pageYOffset - r.clientTop,
                                left: e.left + window.pageXOffset - r.clientLeft
                            }
                        }
                        return {
                            top: 0,
                            left: 0
                        }
                    },
                    getSize: function() {
                        if (!window.getComputedStyle) return {
                            width: th is.ele.offsetWidth,
                            height: this.ele.offsetHeight
                        };
                        try {
                            var e = this.ele.getBoundingClientRect();
                            return {
                                width: e.width,
                                height: e.height
                            }
                        } catch (t) {
                            return {
                                width: 0,
                                height: 0
                            }
                        }
                    },
                    getStyle: function(e) {
                        return this.ele.currentStyle ? this.ele.currentStyle[e] : this.ele.ownerDocument.defaultView.getComputedStyle(this.ele, null).getPropertyValue(e)
                    }, 
                    wrap: function(e) {
                        var t = document.createElement(e);
                        return thi s.ele.parentNode.insertBefore(t, this.ele), t.appendChild(this.ele), _.ry(t)
                    },
                    getCssStyle: function(e) {
                        var t = this.ele.style.getPropertyValue(e);
                        if (t) return t; 
                        var r = null;
                        if ("function" == typeof window.getMatchedCSSRules && (r = getMatchedCSSRules(this.ele)), !r || !_.isArray(r)) return null;
                        for (var s = r.length - 1; s >= 0; s--) {
                            var a = r[s];
                            if (t = a.style.getPropertyValue(e)) return t
                        }
                    },
                    sibling: function(e, t) {
                        for (;
                            (e = e[t] ) && 1 !== e.nodeType;);
                        return e
                    },
                    next: function() {
                        return this.sibling(this.ele, "nextSibling")
                    }, 
                    prev: function(e) {
                        return this.sibling(this.ele, "previousSibling")
                    }, 
                    siblings: function(e) {
                        return this.siblings((this.ele.parentNode || {}).firstChild, this.ele)
                    }, 
                    children: function(e) {
                        return this.siblings(this.ele.firstChild)
                    }, 
                    parent: function() {
                        var e = this.ele.parentNode;
                        return e = e  && 11 !== e.nodeType ? e : null, _.ry(e)
                    },
                    previousElementSibling: function() {
                        var e = this.ele;
                        if ("previousElementSibling"  in document.documentElement) return _.ry(e.previousElementSibling);
                        for (; e = e.previousSibling;)
                            if (1 === e.nodeType) return _.ry(e);
                        return _.ry(null)
                    },
                    getSameTypeSiblings: function() {
                        for (var e = this.ele, t = e.parentNode, r = e.tagName.toLowerCase(), s = [], a = 0; a < t.children.length; a++) {
                            var n = t.children[a] ;
                            1 === n.nodeType && n.tagName.toLowerCase() === r && s.push(t.children[a])
                        }
                        return s
                    }
                }, _.strToUnicode = function(e) {
                    if ("string" != typeof e) return sd.log("??????unicode??????", e), e;
                    for (var t = "", r = 0;  r < e.length; r++) t += "\\" + e.charCodeAt(r).toString(16);
                    return t
                }, _.getReferrer = function(e) {
                    var e = e || document.referrer;
                    return "string" != type of e ? "????????????_referrer??????_" + String(e) : (0 === e.indexOf("https://www.baidu.com/") && (e = e.split("?")[0]), e = e.slice(0, sd.para.max_referrer_string_length), "string" == typeof e ? e : "")
                }, _.getKeywordFromReferrer = function(e) {
                    e = e || document.referrer;
                    var t = sd.para.source_type.keywor d;
                    if (document && "string" == typeof e) {
                        if (0 === e.indexOf("http")) {
                            var r = _.getReferSearchEngine(e),
                                s = _.getQueryParamsFromUrl(e);
                            if (_.isEmptyObject(s)) return "????????????";
                            var a = null;
                            for (var n in t)
                                if (r === n && "object" == typeof s)
                                    if (a = t[n], _.isArray(a))
                                        for (var n = 0; n < a.length; n++) {
                                            var i = s[a[n]];
                                            if (i) return i
                                        } else if (s[a]) return s[a];
                            return "????????????"
                        }
                        return "" === e ? "????????????_????????????" : "????????????_???http???url"
                    }
                    return "????????????_referrer??????_" + String(e)
                }, _.getWxAdIdFromUrl = function(e) {
                    var t = _.getQueryParam(e, "gdt_vid"),
                        r = _.getQueryParam(e, " hash_key"),
                        s = _.getQueryParam(e, "callbacks"),
                        a = {
                            click_id: "",
                            hash_key: "",
                            callbacks: ""
                        };
                    return _.isString(t) && t.length && (a.click_id = 16 == t.length || 18 == t.length ? t : "?????????????????????", _.isString(r) && r.length && (a.hash_key = r), _.isString(s) && s.length && (a.callbacks = s)), a
                }, _.getReferSearchEngine = function(e) {
                    var t = _.getHostname(e);
                    if (!t || "hostname????????????" === t)  return "";
                    var r = (sd.para.source_type.keyword, {
                        baidu: [/^.*\.baidu\.com$/],
                        bing: [/^.*\.bing\.com$/],
                        google: [/^www\.google\.com$/, /^www\.google\.com\.[a-z]{2}$/, /^www\.google\.[a-z]{2}$/],
                        sm: [/^m\.sm\.cn$/],
                        so: [/^.+\.so\.com$/],
                        sogou: [/^.*\.sogou\.com$/],
                        yahoo: [/^.*\.yahoo\.com$/]
                    });
                    for (var s in r)
                        for (var a = r[s], n = 0, i = a.length; n < i; n++)
                            if (a[n].test(t)) return s;
                    return "??????????????????"
                }, _.getSourceFromReferrer = function() {
                    function e(e, t) {
                        for (var r = 0; r < e.length;  r++)
                            if (t.split("?")[0].indexOf(e[r]) !== -1) return !0
                    }
                    var t = "(" + sd.para.source_type.utm.join("|") + ")\\=[^&]+",
                        r = sd.para.source_type.search,
                        s = sd.para.source_type.social,
                        a = document.referrer || "",
                        n = _.info.pageProp.url;
                    if (n) {
                        var i = n.match(new RegExp(t));
                        return i && i[0] ? "??????????????????" : e(r, a) ? "??????????????????" : e(s, a) ? "??????????????????" : "" === a ? "????????????" : "????????????"
                    }
                    return "??????url??????"
                }, _.info = {
                    initPage: function() {
                        var e = _.getReferrer(),
                            t = locati on.href,
                            r = _.getCurrentDomain(t);
                        r || sd.debug.jssdkDebug("url_domain??????_" + t + "_" + r), this.pageProp = {
                            referrer: e,
                            referrer_host: e ? _.getHostname(e) : "",
                            url: t,
                            url_host: _.getHostname(t, "url_host????????????"),
                            url_domain: r
                        }
                    },
                    pageProp: {},
                    campaignParams: function() {
                        var e = sd.source_channel_standard.split(" "),
                            t = "", 
                            r = {};
                        return _.isArray(sd.para.source_channel) && sd.para.source_channel.length > 0 && (e = e.concat(sd.para.source_channel), e = _.unique(e)), _.each(e, function(e) {
                            t = _.getQueryParam(location.href, e), t.length && (r[e] = t)
                        }), r 
                    },
                    campaignParamsStandard: function(e, t) {
                        e = e || "", t = t || "";
                        var r = _.info.campaignParam s(),
                            s = {},
                            a = {};
                        return _.each(r, function(r, n, i) {
                            (" " + sd.source_channel_standard + " ").indexOf(" " + n + " ") !== -1 ? s[e + n] = i[n] : a[t + n] = i[n]
                        }), { 
                            $utms: s,
                            otherUtms: a
                        }
                    },
                    properties: function() {
                        return {
                            $timezone_of fset: (new Date).getTimezoneOffset(),
                            $screen_height: Number(screen.height) || 0,
                            $screen_width: Number(screen.width) || 0,
                            $lib: "js",
                            $lib_version: String(sd.lib_version)
                        }
                    },
                    currentProps: {},
                    register: function(e) {
                        _.extend(_.info.currentProps, e)
                    } 
                }, _.autoExeQueue = function() {
                    var e = {
                        items: [], 
                        enqueue: function(e) {
                            this.items.push(e), this.start()
                        }, 
                        dequeue: function() {
                            return this.items.shift()
                        }, 
                        getCurrentItem: function() {
                            return this.items[0]
                        }, 
                        isRun: !1,
                        start: function() {
                            this.items.length > 0 && !this.isRun && (this.isRun = !0, this.getCurrentItem().start())
                        }, 
                        close: function() {
                            this.dequeue(), this.isRun = !1, this.start()
                        } 
                    };
                    return e
                }, _.trackLink = function(e, t, r) {
                    function s(e) {
                        function s() { 
                            n || (n = !0, location.href = a.href)
                        }
                        e.stopPropagation(), e.preventDefault();
                        var n = !1;
                        setTimeout(s, 1e3), sd.track(t, r, s)
                    }
                    e = e || {};
                    var a = null;
                    return e.ele && (a = e.ele), e.event && (a = e.target ? e.target : e.event.target), r = r || {}, !(!a || "object" != typeof a) && (!a.href || /^javascript/.test(a.href) || a.target || a.download || a.onclick ? (sd.track(t, r), !1) : (e.event && s(e.event), void(e.ele && _.addEvent(e.ele, "click", function(e) {
                        s(e)
                    }))))  
                }, _.eventEmitter = function() {
                    this._events = [], this.pendingEvents = []
                }, _.eventEmitter.prototype  = {
                    emit: function(e) {
                        var t = [].slice.call(arguments, 1);
                        _.each(thi s._events, function(r) {
                            r.type === e && r.callback.apply(r.context, t)
                        }) 
                    },
                    on: function(e, t, r) {
                        "function" == typeof t && this._events.push({
                            type : e,
                            callback: t,
                            context: r || this
                        })
                    },
                    tempAdd: function(e, t) {
                        t && e && (this.pendingEvents.push({
                            type: e, 
                            data: t
                        }), this.pendingEvents.length > 20 ? this.pendingEvents.shift() : null)
                    },
                    isReady: function() {
                        var e = this;
                        this.tempAdd  = this.emit, 0 !== this.pendingEvents.length && (_.each(this.pendingEvents, function(t) {
                            e.emit(t.type, t.data)
                        }), this.pendingEvents = []) 
                    }
                }, _.rot13obfs = function(e, t) {
                    e = String(e), t = "number" == typeof t ? t : 13;
                    for (var r = 126, s =  e.split(""), a = 0, n = s.length; a < n; a++) {
                        var i = s[a].charCodeAt(0);
                        i < r && (s[a] = String.fromCharCode((s[a].charCodeAt(0) + t) % r))
                    }
                    return s.join("")
                }, _.rot13defs = function(e) {
                    var t = 13,
                        r = 126, 
                        e = String(e);
                    return _.rot13obfs(e, r - t)
                }, _.urlSafeBase64 = function() {
                    var e = {
                            "+": "-", 
                            "/": "_",
                        "=": "."
                        
                        {
                        "-": "+",
                            _: "/",
                            ".": "="
                        },
                        r = function(t) {
                            return t.replace(/[+\/=]/g, function(t) {
                                retu rn e[t]
                            }) 
                        },
                        s = function(e) {
                            return e.replace(/[-_.]/g, function(e) {
                                retu rn t[e]
                            }) 
                        },
                        a = function(e) {
                            return e.replace(/[.=]{1,2}$/, "")
                        }, 
                        n = function(e) {
                            return /^[A-Za-z0-9+\/]*[=]{0,2}$/.test(e)
                        }, 
                        i = function(e) {
                            return /^[A-Za-z0-9_-]*[.]{0,2}$/.test(e)
                        }; 
                    return {
                        encode: r,
                        decode: s,
                        trim: a,
                        isBase64: n,
                        isUrlSafeBase64: i
                    }
                }(), _.setCssStyle = function(e) {
                    var t = document.createElement("style");
                    t.type = "text/css"; 
                    try {
                        t.appendChild(document.createTextNode(e))
                    } catch (r) {
                        t.styleSheet.cssText = e
                    }
                    var s = document.getElementsByTagName("head")[0],
                        a = document.getElementsByTagName("script")[0];
                    s ? s.children.length ? s.insertBefore(t, s.children[0]) : s.appendChild(t) : a.parentNode.insertBefore(t, a);
                }, _.isIOS = function() {
                    return !!navigator.userAgent.match(/iPhone|iPad|iPod/i)
                }, _.getIOSVersion =  function() {
                    try {
                        var e = navigator.app Version.match(/OS (\d+)[._](\d+)[._]?(\d+)?/);
                        return e && e[1] ? Number.parseInt(e[1], 10) : ""
                    } catch (t) {
                        return ""
                    }
                }, _.getUA = function() {
                    var e, t = {},
                        r = navigator .userAgent.toLowerCase();
                    return (e = r.match(/opera.([\d.]+)/)) ? t.opera = Number(e[1].split(".")[0]) : (e = r.match(/msie ([\d.]+)/)) ? t.ie = Number(e[1].split(".")[0]) : (e = r.match(/edge.([\d.]+)/)) ? t.edge = Number(e[1].split(".")[0]) : (e = r.match(/firefox\/([\d.]+)/)) ? t.firefox = Number(e[1].split(".")[0]) : (e = r.match(/chrome\/([\d.]+)/)) ? t.chrome = Number(e[1].split(".")[0]) : (e = r.match(/version\/([\d.]+).*safari/)) && (t.safari = Number(e[1].match(/^\d*.\d*/))), t
                }, _.isSupportBeaconSend = function() {
                    var e = _.getUA(),
                        t = !1, 
                        r = navigator.userAgent.toLowerCase();
                    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                        var s = /os [\d._]*/gi,
                            a = r.match(s),
                            n = (a + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, "."),
                            i = n.split(".");
                        i[0] && i[0] < 13 ? (e.chrome > 41 || e.firefox > 30 || e.opera > 25 || e.safari > 12) && (t = !0) : (e.chrome > 41 || e.firefox > 30 || e.opera > 25 || e.safari > 11.3) && (t = !0)
                    } else(e.chrome > 38 || e.edge > 13 || e.firefox > 30 || e.opera > 25 || e.safari > 11) && (t = !0);
                    return t
                } 
            }(), sd.para_default = {
                preset_properties: {
                    latest_utm: !0,
                    latest_traffic_source_type: !0,
                    latest_search_keyword: !0,
                    latest_referrer: !0,
                    latest_referrer_host: !1,
                    latest_landing_page: !1,
                    latest_wx_ad_click_id: !1,
                    url: !1,
                    title: !1
                },
                img_use_crossorigin: !1,
                name: "sa",
                max_referrer_string_length: 200,
                max_string_length: 500,
                cross_subdomain: !0,
                show_log: !0,
                is_debug: !1,
                debug_mode: !1,
                debug_mode_upload: !1,
                session_time: 0,
                use_client_time: !1,
                source_channel: [],
                send_type: "image",
                vtrack_ignore: {},
                auto_init: !0,
                is_track_single_page: !1,
                is_single_page: !1,
                batch_send: !1,
                source_type: {},
                callback_timeout: 200,
                datasend_timeout: 3e3,
                queue_timeout: 300,
                is_track_device_id: !1,
                ignore_oom: !0,
                app_js_bridge: !1
            }, sd.addReferrerHost = function(e) {
                var t = "????????????";
                _.isObject(e.properties) &&  (e.properties.$first_referrer && (e.properties.$first_referrer_host = _.getHostname(e.properties.$first_referrer, t)), "track" !== e.type && "track_signup" !== e.type || ("$referrer" in e.properties && (e.properties.$referrer_host = "" === e.properties.$referrer ? "" : _.getHostname(e.properties.$referrer, t)), sd.para.preset_properties.latest_referrer && sd.para.preset_properties.latest_referrer_host && (e.properties.$latest_referrer_host = "" === e.properties.$latest_referrer ? "" : _.getHostname(e.properties.$latest_referrer, t))))
            }, sd.addPropsHook = function(e) {
                sd.para.preset_properties && sd.para.preset_properties.url && ("track" === e.type || "track_signup" === e.type) && "undefined" == typeof e.properties.$url && (e.properties.$url = window.location.href), sd.para.preset_properties && sd.para.preset_properties.title && ("track" === e.type || "track_signup" === e.type) && "undefined" == typeof e.properties.$title && (e.properties.$title = document.title)
            }, sd.initPara = function(e)  {
                sd.para = e || sd.para || {};
                var t = {}; 
                if (_.isObject(sd.para.is_track_latest))
                    for (var r in sd.para.is_track_latest) t["latest_" + r] = sd.para.is_track_latest[r];
                sd.para.preset_properties = _.extend({}, sd.para_default.preset_properties, t, sd.para.preset_properties || {}), sd.para.preset_properties.latest_wx_ad_click_id && (sd.para.preset_properties.url = !0);
                var s;
                for (s in sd.para_default) void 0 === sd.para[s] && (sd.para[s] = sd.para_default[s]);
                "string" == typeof sd.para.server_url && "://" === sd.para.server_url.slice(0, 3) && (sd.para.server_url = location.protocol.slice(-1) + sd.para.server_url), "string" == typeof sd.para.web_url && "://" === sd.para.web_url.slice(0, 3) && (sd.para.web_url = location.protocol.slice(-1) + sd.para.web_url), "image" !== sd.para.send_type && "ajax" !== sd.para.send_type && "beacon" !== sd.para.send_type && (sd.para.send_type = "image"), sd.debug.protocol.serverUrl(), sd.bridge.initPara(), sd.bridge.initState();
                var a = {
                    datasend_timeout: 6e3,
                    send_interval: 6e3
                };
                _.localStorage.isSupport() && _.isSupportCors() && "object" == typeof localStorage ? sd.para.batch_send === !0 ? (sd.para.batch_send = _.extend({}, a), sd.para.use_client_time = !0) : "object" == typeof sd.para.batch_send && (sd.para.use_client_time = !0, sd.para.batch_send = _.extend({}, a, sd.para.batch_send)) : sd.para.batch_send = !1;
                var n = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"],
                    i = ["www.baidu.", "m.baidu.", "m.sm.cn", "so.com", "sogou.com", "youdao.com", "google.", "yahoo.com/", "bing.com/", "ask.com/"],
                    o = ["weibo.com", "renren.com", "kaixin001.com", "douban.com", "qzone.qq.com", "zhihu.com", "tieba.baidu.com", "weixin.qq.com"],
                    d = {
                        baidu: ["wd", "word", "kw", "keyword"],
                        google: "q",
                        bing: "q",
                        yahoo: "p",
                        sogou: ["query", "keyword"],
                        so: "q",
                        sm: "q"
                    };
                "object" == typeof sd.para.source_type && (sd.para.source_type.utm = _.isArray(sd.para.source_type.utm) ? sd.para.source_type.utm.concat(n) : n, sd.para.source_type.search = _.isArray(sd.para.source_type.search) ? sd.para.source_type.search.concat(i) : i, sd.para.source_type.social = _.isArray(sd.para.source_type.social) ? sd.para.source_type.social.concat(o) : o, sd.para.source_type.keyword = _.isObject(sd.para.source_type.keyword) ? _.extend(d, sd.para.source_type.keyword) : d);
                var c = {
                        div: !1
                    },
                    ["mark", "/mark", "strong", "b", "em", "i", "u", "abbr", "ins", "del", "s", "sup"];
                _.isObject(sd.para.heatmap)) {
                    sd.para.heatmap.clickmap = sd.para.heatmap.clickmap || "default", sd.para.heatmap.scroll_notice_map = sd.para.heatmap.scroll_notice_map || "default", sd.para.heatmap.scroll_delay_time = sd.para.heatmap.scroll_delay_time || 4e3, sd.para.heatmap.scroll_event_duration = sd.para.heatmap.scroll_event_duration || 18e3, sd.para.heatmap.renderRefreshTime = sd.para.heatmap.renderRefreshTime || 1e3, sd.para.heatmap.loadTimeout = sd.para.heatmap.loadTimeout || 1e3;
                    var l = _.isArray(sd.para.heatmap.track_attr) ? _.filter(sd.para.heatmap.track_attr, function(e) {
                        return e && "string" == typeof e
                    }) : []; 
                    l.push("data-sensors-click"), sd.para.heatmap.track_attr = l, _.isObject(sd.para.heatmap.collect_tags) ? sd.para.heatmap.collect_tags.div === !0 ? sd.para.heatmap.collect_tags.div = {
                        ignore_tags: u
                    } : _.isObject(sd.para.heatmap.collect_tags.div) ? sd.para.heatmap.collect_tags.div.ignore_tags ? _.isArray(sd.para.heatmap.collect_tags.div.ignore_tags) || (sd.log("ignore_tags ???????????????????????????"), sd.para.heatmap.collect_tags.div.ignore_tags = u) : sd.para.heatmap.collect_tags.div.ignore_tags = u : sd.para.heatmap.collect_tags.div = !1 : sd.para.heatmap.collect_tags = c
                }
                if (_.isArray(sd.para.server_url) && sd.para.server_url.length)
                    for (s = 0; s < sd.para.server_url.length; s++) /sa\.gif[^\/]*$/.test(sd.para.server_url[s]) || (sd.para.server_url[s] = sd.para.server_url[s].replace(/\/sa$/, "/sa.gif").replace(/(\/sa)(\?[^\/]+)$/, "/sa.gif$2"));
                else /sa\.gif[^\/]*$/.test(sd.para.server_url) || "string" != typeof sd.para.server_url || (sd.para.server_url = sd.para.server_url.replace(/\/sa$/, "/sa.gif").replace(/(\/sa)(\?[^\/]+)$/, "/sa.gif$2"));
                "string" == typeof sd.para.server_url && (sd.para.debug_mode_url = sd.para.debug_mode_url || sd.para.server_url.replace("sa.gif", "debug")), sd.para.noCache === !0 ? sd.para.noCache = "?" + (new Date).getTime() : sd.para.noCache = "", sd.para.callback_timeout > sd.para.datasend_timeout && (sd.para.datasend_timeout = sd.para.callback_timeout), sd.para.callback_timeout > sd.para.queue_timeout && (sd.para.queue_timeout = sd.para.callback_timeout), sd.para.queue_timeout > sd.para.datasend_timeout && (sd.para.datasend_timeout = sd.para.queue_timeout)
            }, sd.readyState = {
                state: 0,
                historyState: [],
                stateType: {
                    1: "1-init?????????",
                    2: "2-init??????",
                    3: "3-store??????"
                },
                getState: function() {
                    return this.historyState.join("\n")
                }, 
                setState: function(e) {
                    String(e) in this.stateType && (this.state = e), this.historyState.push(this.stateType[e])
                } 
            }, sd.setPreConfig = function(e) {
                sd.para = e.para, sd._q = e._q
            }, sd.setInitVar = function()  {
                sd._t = sd._t || 1 * new Date, sd.lib_version = "1.16.3", sd.is_first_visitor = !1, sd.source_channel_standard = "utm_source utm_medium utm_campaign utm_content utm_term"
            }, sd.log = function() { 
                if ((_.sessionStorage.isSupport() && "true" === sessionStorage.getItem("sensorsdata_jssdk_debug") || sd.para.show_log) && (!_.isObject(arguments[0]) || sd.para.show_log !== !0 && "string" !== sd.para.show_log && sd.para.show_log !== !1 || (arguments[0] = _.formatJsonString(arguments[0])), "object" == typeof console && console.log)) try {
                    return conso le.log.apply(console, arguments)
                } catch (e) {
                    console.log(arguments[0])
                }
            }, sd.enableLocalLog = function() {
                if (_.sessionStorage.isSupport()) try {
                    sessionStorage.setItem( "sensorsdata_jssdk_debug", "true")
                } catch (e) {
                    sd.log("enableLocalLog error: " + e.message)
                }
            }, sd.disableLocalLog = function() {
                _.sessionStorage.isSupport() && sessionStorage.removeItem("sensorsdata_jssdk_debug")
            }, sd.debug = { 
                distinct_id: function() {},
                jssdkDebug: function() {},
                _sendDebug: function( e) { 
                    sd.track("_senso rsda ta2019_debug", {
                        _jssdk_debug _info: e
                    })
                },
                apph5: function(e) {
                    var t = "app_h5????????????-",
                        r = { 
                            1: t + "use_app_track???false",
                            2: t + "Android??????iOS???????????????????????????",
                            3.1: t + "Android??????server_url??????",
                            3.2: t + "iOS??????server_url??????",
                            4.1: t + "H5 ?????? iOS server_url ??????",
                            4.2: t + "H5 ?????? Android server_url ??????"
                        },
                        s = e.output,
                        a = e.step,
                        n = e.data || "";
                    "all" !== s && "console" !== s || sd.log(r[a]), ("all" === s || "code" === s) && _.isObject(sd.para.is_debug) && sd.para.is_debug.apph5 && (n.type && "profile" === n.type.slice(0, 7) || (n.properties._jssdk_debug_info = "apph5-" + String(a)))
                },
                defineMode: function(e) {
                    var t = {
                        1: { 
                            title: "??????????????????????????????????????????",
                            message: "App SDK ??? Web JS SDK ?????????????????????????????????????????????????????? App SDK ??????????????????????????????????????????",
                            link_text: "????????????",
                            link_url: "https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html"
                        },
                        2: {
                            title: "??????????????????????????????????????????",
                            message: "App SDK ??? Web JS SDK ?????????????????????????????????????????????????????? Web JS SDK ??????????????????????????????????????????",
                            link_text: "????????????",
                            link_url: "https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html"
                        },
                        3: {
                            title: "??????????????????????????????????????????",
                            message: "Web JS SDK ??????????????????????????????????????????????????????????????? SDK ??????????????????????????????????????????",
                            link_text: "????????????",
                            link_url: "https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_web_all-1573964.html"
                        },
                        4: {
                            title: "??????????????????????????????????????????",
                            message: "Web JS SDK ?????????????????????????????? App SDK ???????????????????????????????????????????????????????????????????????? SDK ??????????????????????????????????????????",
                            link_text: "????????????",
                            link_url: "https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html"
                        }
                    };
                    return !(!e || !t[e]) && t[e]
                },
                protocol: {
                    protocolIsSame: function(e, t) {
                        try {
                            if (_.URL(e).pro tocol !== _.URL(t).protocol) return !1
                        } catch (r) {
                            return sd.log(r), !1
                        }
                        return !0
                    },
                    serverUrl: function() {
                        _.isString(sd.para.server_url) && "" !== sd.para.server_url && !this.protocolIsSame(sd.para.server_url, location.href) && sd.log("SDK ???????????????????????????????????????????????????????????????????????????????????????????????????????????????\n?????????1???https ???????????? http ???????????????????????????2???http ???????????? https + ajax ????????????????????? ie9 ???????????????????????????")
                    }, 
                    ajax: function(e) {
                        return e !== sd.para.server_url && void(_.isString(e) && "" !== e && !this.protocolIsSame(e, location.href) && sd.log("SDK ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? http ???????????? https + ajax ????????????????????? ie9 ???????????????????????????"))
                    } 
                } 
            };
        var commonWays = {
            setOnlineState: function(e) {
                if (e === !0 && _.isObject(sd.para.jsapp) && "function" == typeof sd.para.jsapp.getData) {
                    sd.para.jsapp.is Online = !0;
                    var t = sd.para.jsapp.getData();
                    _.isArray(t) && t.length > 0 && _.each(t, function(e) {
                        _.isJSONString(e) && sd.sendState.pushSend(JSON.parse(e))
                    }) 
                } else sd.para.jsapp.isOnline = !1
            },
            autoTrackIsUsed: !1,
            isReady: function(e) {
                e()
            }, 
            getUtm: function() {
                return _.info.campaignParams()
            }, 
            getStayTime: function() {
                return (new Date - sd._t) / 1e3
            }, 
            setProfileLocal: function(e) {
                if (!_.localStorage.isSupport()) return sd.setProfile(e), !1;
                if (!_.isObject(e) ||  _.isEmptyObject(e)) return !1;
                var t = _.localStorage.parse("sensorsdata_2015_jssdk_profile"),
                    r = !1;
                if (_.isObject(t) && !_.isEmptyObject(t)) {
                    for (var s in e)!(s in t && t[s] !== e[s]) && s in t || (t[s] = e[s], r = !0);
                    r && (_.localStorage.set("sensorsdata_2015_jssdk_profile", JSON.stringify(t)), sd.setProfile(e))
                } else _.localStorag e.set("sensorsdata_2015_jssdk_profile", JSON.stringify(e)), sd.setProfile(e)
            },
            setInitReferrer: function() {
                var e = _.getReferrer();
                sd.setOnceProfile({ 
                    _init_referrer: e,
                    _init_referrer_host: _.info.pageProp.referrer_host
                })
            },
            setSessionReferrer: function() {
                var e = _.getReferrer();
                store.setSessionPropsOnc e({
                    _session_referrer: e,
                    _session_referrer_host: _.info.pageProp.referrer_host
                })
            },
            setDefaultAttr: function() {
                _.info.register({
                    _current_url: lo cation.href,
                    _referrer: _.getReferrer(),
                    _referring_host: _.info.pageProp.referrer_host
                })
            },
            trackHeatMap: function(e, t, r) {
                if ("object" == typeof e && e.tagName) {
                    var s = e.tagN ame.toLowerCase(),
                        a = e.parentNode.tagName.toLowerCase(),
                        n = sd.para.heatmap && sd.para.heatmap.track_attr ? sd.para.heatmap.track_attr : ["data-sensors-click"];
                    "button" === s || "a" === s || "a" === a || "button" === a || "input" === s || "textarea" === s || _.hasAttributes(e, n) || heatmap.start(null, e, s, t, r)
                }
            },
            trackAllHeatMap: function(e, t, r) {
                if ("object" == typeof e && e.tagName) {
                    var s = e.tagName .toLowerCase();
                    heatmap.start(null, e, s, t, r)
                }
            },
            autoTrackSinglePage: function(e, t) {
                function r() {
                    var e = _.info.campai gnParams(),
                        t = {};
                    return _.each(e, function(e, r, s) {
                        (" " + sd.source_channel_standard + " ").indexOf(" " + r + " ") !== -1 ? t["$" + r] = s[r] : t[r] = s[r]
                    }), t 
                }

                function s(e, t) {
                    sd.track("$pageview", _.extend({
                        $referrer: a,
                        $url: location.href,
                        $url_path: location.pathname,
                        $title: document.title
                    }, e, r()), t), a = location.href
                }
                if (this.autoTrackIsUsed) var a = _.info.pageProp.url;
                else var a = _.info.pageProp.referrer;
                e = _.isObject(e) ? e : {}, e = _.isObject(e) ? e : {}, sd.is_first_visitor && !e.not_set_profile && (sd.setOnceProfile(_.extend({
                    $first_visit_time: new Date,
                    $first_referrer: _.getReferrer(),
                    $first_browser_language: navigator.language || "????????????",
                    $first_browser_charset: "string" == typeof document.charset ? document.charset.toUpperCase() : "????????????",
                    $first_traffic_source_type: _.getSourceFromReferrer(),
                    $first_search_keyword: _.getKeywordFromReferrer()
                }, r())), sd.is_first_visitor = !1), e.not_set_profile && delete e.not_set_profile, s(e, t), this.autoTrackSinglePage = s
            },
            autoTrackWithoutProfile: function(e, t) {
                e = _.isObject(e) ? e : {}, this.autoTrack(_.extend(e, {
                    not_set_profile: !0 
                }), t)
            },
            autoTrack: function(e, t) {
                e = _.isObject(e) ? e : {};
                var r = _.info. campaignParams(),
                    s = {};
                _.each(r, function(e, t, r) {
                    (" " + sd.source_channel_standard + " ").indexOf(" " + t + " ") !== -1 ? s["$" + t] = r[t] : s[t] = r[t]
                }), sd.is_first_vi sitor && !e.not_set_profile && (sd.setOnceProfile(_.extend({
                    $first_visit_time: new Date,
                    $first_referrer: _.getReferrer(),
                    $first_browser_language: navigator.language || "????????????",
                    $first_browser_charset: "string" == typeof document.charset ? document.charset.toUpperCase() : "????????????",
                    $first_traffic_source_type: _.getSourceFromReferrer(),
                    $first_search_keyword: _.getKeywordFromReferrer()
                }, s)), sd.is_first_visitor = !1), e.not_set_profile && delete e.not_set_profile;
                var a = location.href;
                sd.para.is_single_page && _.addHashEvent(function() {
                    var r = _.getReferrer(a);
                    sd.track("$pageview", _.extend({ 
                        $referrer: r,
                        $url: location.href,
                        $url_path: location.pathname,
                        $title: document.title
                    }, s, e), t), a = location.href
                }), sd.track("$pageview", _.extend({
                    $referrer: _.getReferrer(),
                    $url: location.href,
                    $url_path: location.pathname,
                    $title: document.title
                }, s, e), t), this.autoTrackIsUsed = !0
            },
            getAnonymousID: function() {
                return _.isEmptyObject(sd.store._state) ? "???????????????SDK" : sd.store._state._first_id || sd.store._state.first_id || sd.store._state._distinct_id || sd.store._state.distinct_id
            }, 
            setPlugin: function(e) {
                return !!_.isObject(e) && void _.each(e, function(e, t) {
                    _.isFunctio n(e) && (_.isObject(window.SensorsDataWebJSSDKPlugin) && window.SensorsDataWebJSSDKPlugin[t] ? e(window.SensorsDataWebJSSDKPlugin[t]) : sd.log(t + "???????????????,????????????????????????" + t + "??????????????????"))
                }) 
            },
            useModulePlugin: function() {
                sd.use.apply(sd, arguments)
            }, 
            useAppPlugin: function() {
                this.setPlugin.apply(this, arguments)
            } 
        };
        sd.quick = function() {
            var e = Array.prototype.slice.call(arguments),
                t = e[0], 
                r = e.slice(1);
            return "string" == typeof t && commonWays[t] ? commonWays[t].apply(commonWays, r) : void("function" == typeof t ? t.apply(sd, r) : sd.log("quick???????????????????????????" + e[0]))
        }, sd.use = function(e, t) {
            return _.isString(e) ? _.isObject(window.SensorsDataWebJSSDKPlugin) && _.isObject(window .SensorsDataWebJSSDKPlugin[e]) && _.isFunction(window.SensorsDataWebJSSDKPlugin[e].init) ? (window.SensorsDataWebJSSDKPlugin[e].init(sd, t), window.SensorsDataWebJSSDKPlugin[e]) : _.isObject(sd.modules) && _.isObject(sd.modules[e]) && _.isFunction(sd.modules[e].init) ? (sd.modules[e].init(sd, t), sd.modules[e]) : void sd.log(e + "???????????????,????????????????????????" + e + "??????????????????") : (sd.log("use?????????????????????????????????"), !1)
        }, sd.track = functi on(e, t, r) {
            saEvent.check({
                event: e, 
                properties: t
            }) && saEvent.send({
                type: "track",
                event: e,
                properties: t
            }, r)
        }, sd.trackLink = function(e, t, r) {
            "object" == typeof e && e.tagName ? _.trackLink({
                ele: e 
            }, t, r) : "object" == typeof e && e.target && e.event && _.trackLink(e, t, r)
        }, sd.trackLinks = function(e, t, r) {
            return r = r || {}, !(!e || "object" != typeof e) && (!(!e.href || /^javascript/.test(e.href) || e.target) && void _.addEvent(e, "click", function(s) {
                function a() { 
                    n || (n = !0, location.href = e.href) 
                }
                s.preventDefault();
                var n = !1;
                setTimeout(a, 1e3), sd.track(t, r, a)
            }))
        }, sd.setProfile = function(e, t) {
            saEvent.check({
                propertiesMust: e 
            }) && saEvent.send({
                type: "profile_set",
                properties: e
            }, t)
        }, sd.setOnceProfile = function(e, t) {
            saEvent.check({
                propertiesMust: e 
            }) && saEvent.send({
                type: "profile_set_once",
                properties: e
            }, t)
        }, sd.appendProfile = function(e, t) {
            saEvent.check({
                propertiesMust: e 
            }) && (_.each(e, function(t, r) {
                _.isString(t) ? e[r] = [t] : _.isArray(t) ? e[r] = t : (delete e[r], sd.log("appendProfile??????????????????????????????????????????"))
            }), _.isEmptyObject(e) ||  saEvent.send({
                type: "profile_append",
                properties: e
            }, t))
        }, sd.incrementProfile = function(e, t) {
            function r(e) {
                for (var t in e) 
                    if (Object.prototype.hasOwnProperty.call(e, t) && !/-*\d+/.test(String(e[t]))) return !1;
                return !0
            }
            var s = e;
            _.isString(e) && (e = {}, e[s] = 1), saEvent.check({
                propertiesMust: e
            }) && (r(e) ? saEvent.send({
                type: "profile_increment",
                properties: e
            }, t) : sd.log("profile_increment?????????????????????"))
        }, sd.deleteProfile = function(e) {
            saEvent.send({
                type: "profile_delete" 
            }, e), store.set("distinct_id", _.UUID()), store.set("first_id", "")
        }, sd.unsetProfile = function(e, t) {
            var r = e,
                s = {}; 
            _.isString(e) && (e = [], e.push(r)), _.isArray(e) ? (_.each(e, function(e) {
                _.isString(e) ? s[e] = !0 : sd.log("profile_unset?????????????????????????????????string,???????????????", e)
            }), saEvent.send({ 
                type: "profile_unset",
                properties: s
            }, t)) : sd.log("profile_unset??????????????????")
        }, sd.identify = function(e, t) {
            "number" == typeof e && (e = String(e));
            var r = store.getFirs tId();
            if ("undefined" == typeof e) {
                var s = _.UUID();
                r ? store.set("first_id", s) : store.set("distinct_id", s)
            } else saEvent.check({
                distinct_id: e
            }) ? t === !0 ? r ? store.set("first_id", e) : store.set("distinct_id", e) : r ? store.change("first_id", e) : store.change("distinct_id", e) : sd.log("identify???????????????????????????")
        }, sd.trackSignup = function(e, t, r, s) {
            if (saEvent.check({
                distinct_id: e, 
                event: t,
                properties: r
            })) {
                var a = store.getFirstId() || store.getDistinctId();
                store.set("distinct_id", e), saEvent.send({
                    original_id: a,
                    distinct_id: e,
                    type: "track_signup",
                    event: t,
                    properties: r
                }, s)
            }
        }, sd.registerPage = function(e) {
            saEvent.check({
                properties: e 
            }) ? _.extend(_.info.currentProps, e) : sd.log("register?????????????????????")
        }, sd.clearAllRegister = function(e) {
            store.clearAllProps(e)
        }, sd.register = function(e) { 
            saEvent.check({
                properties: e 
            }) ? store.setProps(e) : sd.log("register?????????????????????")
        }, sd.registerOnce = function(e) {
            saEvent.check({
                properties: e 
            }) ? store.setPropsOnce(e) : sd.log("registerOnce?????????????????????")
        }, sd.registerSession = function(e) {
            saEvent.check({
                properties: e 
            }) ? store.setSessionProps(e) : sd.log("registerSession?????????????????????")
        }, sd.registerSessionOnce = function(e) {
            saEvent.check({
                properties: e 
            }) ? store.setSessionPropsOnce(e) : sd.log("registerSessionOnce?????????????????????")
        }, sd.login = function(e, t) {
            if ("number" == typeof e && (e = String(e)), saEvent.check({
                distinct_id: e 
            })) {
                var r = store.getFirstId(),
                    s = store.getDistinctId();
                e !== s ? (r || store.set("first_id", s), sd.trackSignup(e, "$SignUp", {}, t)) : t && t()
            } else sd.log("login???????????????????????????"), t && t()
        }, sd.logout = function(e) {
            var t = store.getFirstId();
            if (t) 
                if (store.set("first_id", ""), e === !0) {
                    var r = _.UUID();
                    store.set("distinct_id", r)
                } else store.set("distinct_id", t);
            else sd.log("??????first_id???logout??????")
        }, sd.getPresetProperties = function() {
            function e() {
                var e = _.info.campaignParam s(),
                    t = {};
                return _.each(e, function(e, r, s) {
                    (" " + sd.source_channel_standard + " ").indexOf(" " + r + " ") !== -1 ? t["$" + r] = s[r] : t[r] = s[r]
                }), t 
            }
            var t = {
                    $is_first_day: _.cookie.getNewUser(),
                    $referrer: _.info.pageProp.referrer || "",
                $referrer_host: _.info.pageProp.referrer ? _.getHostname(_.info.pageProp.referrer) : "",
                $url: location.href,
                $url_path: location.pathname,
                $title: document.title || "",
                _distinct_id: store.getDistinctId()
                
                _.extend({}, _.info.properties(), sd.store.getProps(), e(), t);
            rn sd.para.preset_properties.latest_referrer && sd.para.preset_properties.latest_referrer_host && (r.$latest_referrer_host = "" === r.$latest_referrer ? "" : _.getHostname(r.$latest_referrer)), r
        }, sd.detectMode = function() {
            function e() {
                sd.readyState.setSt ate(3);
                new sd.JSBridge({
                    type: "visualized",
                    app_call_js: function() {
                        s("undefined" != typeof sa_jssdk_app_define_mode ? !0 : !1)
                    } 
                });
                s(!1), sd.bridge.app_js_bridge_v1(), _.info.initPage(), sd.para.is_track_single_page && _.addSinglePageEvent(function(e) {
                    var t = function(t) {
                        t = t || {}, e !== location.href && (_.info.pageProp.referrer = e, sd.quick("autoTrack", _.extend({ 
                            $url: lo cation.href,
                            $referrer: e
                        }, t)))
                    };
                    if ("boolean" == typeof sd.para.is_track_single_page) t();
                    else if ("function" == typeof sd.para.is_track_single_page) {
                        var r = sd.para.is_track_single_page();
                        _.isObject(r) ? t(r) : r === !0 && t()
                    }
                }), sd.para.batch_send && (_.addEvent(window, "onpagehide" in window ? "pagehide" : "unload", function(e) {
                    sd.batchSend.clearPendingStatus()
                }), sd.batchSend.batchInterval()), sd.store.init(), sd.readyState.setState(4), sd._q && _.isArray(sd._ q) && sd._q.length > 0 && _.each(sd._q, function(e) {
                    sd[e[0]].apply(sd, Array.prototype.slice.call(e[1]))
                }), _.isObject(sd.para.heatmap) && (heatmap.initHeatmap(), heatmap.initScrollmap()) 
            }
            var t = {
                    searchKeywordMatch: location.search.match(/sa-request-id=([^&#]+)/),
                    isSeachHasKeyword: function() {
                    var e = this.searchKeywordMatch;
                    return !!(e && e[0] &&  e[1]) && ("string" == typeof sessionStorage.getItem("sensors-visual-mode") && sessionStorage.removeItem("sensors-visual-mode"), !0)
                    
                    eywordHandle: function() {
                    var e = this.searchKeywordMatch,
                        t = location.searc h.match(/sa-request-type=([^&#]+)/),
                        r = location.search.match(/sa-request-url=([^&#]+)/);
                        map.setNotice(r), _.sessionStorage.isSupport() && (r && r[0] && r[1] && sessionStorage.setItem("sensors_heatmap_url", decodeURIComponent(r[1])), sessionStorage.setItem("sensors_heatmap_id", e[1]), t && t[0] && t[1] ? "1" === t[1] || "2" === t[1] || "3" === t[1] ? (t = t[1], sessionStorage.setItem("sensors_heatmap_type", t)) : t = null : t = null !== sessionStorage.getItem("sensors_heatmap_type") ? sessionStorage.getItem("sensors_heatmap_type") : null), this.isReady(e[1], t)
                        
                    ady: function(e, t, r) {
                    sd.para.heatmap_url ? _.loadScript({
                        success:  function() {
                            setTimeout(function() {
                                "undefine d" != typeof sa_jssdk_heatmap_render && (sa_jssdk_heatmap_render(sd, e, t, r), "object" == typeof console && "function" == typeof console.log && (sd.heatmap_version && sd.heatmap_version === sd.lib_version || console.log("heatmap.js???sensorsdata.js???????????????????????????????????????!")))
                            }, 0) 
                                
                            r: function() {},
                        type: "js",
                        url: sd.para.he atma p_url
                         sd.log("????????????heatmap_url?????????")
                        
                    orageHasKeyword: function() {
                    return _.sessionStorage.isSupport() && "string" == typeof sessionStorage.getItem("sensors_heatmap_id")
                }, 
                    ageHasKeywordHandle: function() {
                    heatmap.setNotice(), t.isReady(sessionStorage.getItem("sensors_heatmap_id"), sessionStorage.getItem("sensors_heatmap_type"), location.href)
                } 
                    
                {
                isStorageHasKeyword: function() {
                        return _.sessionStorage.isSupport() && "string" == typeof sessionStorage.getItem("sensors-visual-mode")
                    }, 
                    isSearchHasKeyword: function() {
                        return !!location.search.match(/sa-visual-mode=true/) && ("string" == typeof sessionStorage.getItem("sensors_heatmap_id") && sessionStorage.removeItem("sensors_heatmap_id"), !0)
                    }, 
                    loadVtrack: function() {
                        _.loadScript({
                            success: fun ction() {},
                            error: function() {},
                            type: "js",  
                            url: sd.para.vt rack _url ? sd.para.vtrack_url : location.protocol + "//static.sensorsdata.cn/sdk/" + sd.lib_version + "/vtrack.min.js"
                        })
                    },
                    messageListener: function(e) {
                        return "sa-fe" === e.data.source && void("v-track-mode" === e.data.type && (e.data.data && e.data.data.isVtrack && (_.sessionStorage.isSupport() && sessionStorage.setItem("sensors-visual-mode", "true"), e.data.data.userURL && location.search.match(/sa-visual-mode=true/) ? window.location.href = e.data.data.userURL : r.loadVtrack()), window.removeEventListener("message", r.messageListener, !1)))
                    }, 
                    removeMessageHandle: function() { 
                        window.removeEventListener && window.removeEventListener("message", r.messageListener, !1)
                    }, 
                    verifyVtrackMode: function() {
                        window.addEventListener && window.addEventListener("message", r.messageListener, !1), r.postMessage()
                    }, 
                    postMessage: function() {
                        window.parent && window.parent.postMessage && window.parent.postMessage({
                            source: "sa-w eb-sdk",
                            type: "v-is-vtrack",
                            data: {
                                sdkversion: "1.16.3"
                            }
                        }, "*")
                    },
                    notifyUser: function() {
                        var e = function(t) {
                            return "sa-f e" === t.data.source && void("v-track-mode" === t.data.type && (t.data.data && t.data.data.isVtrack && alert("?????????????????????????????????????????????????????????"), window.removeEventListener("message", e, !1)))
                        }; 
                        window.addEventListener && window.addEventLi stener("message", e, !1), r.postMessage()
                    }
                },
                s = function(e) {
                    function t() {
                        var  e = [];
                        r.touch_app_bridge || e.push(sd.debug.defineMode("1")), _.isObject(sd.para.app_js_bridge) || (e.push(sd.debug.defineMode("2")), r.verify_success = !1), _.isObject(sd.para.heatmap) && "default" == sd.para.heatmap.clickmap || e.push(sd.debug.defineMode("3")), "fail" === r.verify_success && e.push(sd.debug.defineMode("4"));
                        var t = {
                            callType: "app_alert",
                            data: e
                        };
                        SensorsData_App_Visual_Bridge && SensorsData_App_Visual_Bridge.sensorsdata_visualized_alert_info ? SensorsData_App_Visual_Bridge.sensorsdata_visualized_alert_info(JSON.stringify(t)) : window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify(t))
                    }
                    var r = sd.bridge.initDefineBridgeInfo();
                    if (_.isObject(window.SensorsData_App_Visual_Bridge) && window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode && (window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode === !0 || window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode()))
                        if (_.isObject(sd.para.heatmap) && "default" == sd.para.heatmap.clickmap)
                            if (_.isObject(sd.para.app_js_bridge) && "success" === r.verify_success)
                                if (e) sa_jssdk_app_define_mode(sd, e);
                                else {
                                    var s = location.protocol,
                                        a = ["http:", "https:"];
                                    s = _.indexOf(a, s) > -1 ? s : "https:", _.loadScript({
                                        success: function() {
                                            setTimeout(function() {
                                                "undefine d" != typeof sa_jssdk_app_define_mode && sa_jssdk_app_define_mode(sd, e)
                                            }, 0) 
                                        },
                                        error: function() {},
                                        type: "js",
                                        url: s + "//sta tic. sensorsdata.cn/sdk/" + sd.lib_version + "/vapph5define.min.js"
                                    })
                                } else t();
                    else t()
                };
                        hHasKeyword() ? t.hasKeywordHandle() : window.parent !== self && r.isSearchHasKeyword() ? r.verifyVtrackMode() : t.isStorageHasKeyword() ? t.storageHasKeywordHandle() : window.parent !== self && r.isStorageHasKeyword() ? r.verifyVtrackMode() : (e(), r.notifyUser())
        }, BatchSend.prototype = {
            add: function(e) {
                _.isObject(e) && (this.writeStore(e), "track_signup" !== e.type && "$pageview" !== e.event || this.sendStrategy())
            }, 
            clearPendingStatus: function() {
                this.sendingItemKeys.length && this.removePendingItems(this.sendingItemKeys)
            }, 
            remove: function(e) {
                this.sendingData > 0 && --this.sendingData, _.isArray(e) && e.length > 0 && _.each(e, function(e) {
                    _.localS torage.remove(e)
                }) 
            },
            send: function(e) {
                var t, r = this;
                return _.i sString(sd.para.server_url) && "" !== sd.para.server_url || _.isArray(sd.para.server_url) && sd.para.server_url.length ? (t = _.isArray(sd.para.server_url) ? sd.para.server_url[0] : sd.para.server_url, void _.ajax({
                    url: t,
                    type: "POST",
                    data: "data_list=" + encodeURIComponent(_.base64Encode(JSON.stringify(e.vals))),
                    credentials: !1,
                    timeout: sd.para.batch_send.datasend_timeout,
                    cors: !0,
                    success: function() {
                        r.remove(e.keys), r.removePendingItems(e.keys)
                    }, 
                    error: function() {
                        r.sendingData > 0 && --r.sendingData, r.removePendingItems(e.keys)
                    } 
                })) : void sd.log("?????? server_url ???????????????????????????????????????????????????network ??????????????????????????????????????? server_url???")
            },
            appendPendingItems: function(e) {
                if (_.isArray(e) !== !1) {
                    this.sendingItemKeys  = _.unique(this.sendingItemKeys.concat(e));
                    try {
                        var t = this.getPendingItems(),
                            r = _.unique(t.concat(e));
                        localStorage.setItem("sawebjssdk-sendingitems", JSON.stringify(r))
                    } catch (s) {}
                }
            }, 
            removePendingItems: function(e) {
                if (_.isArray(e) !== !1) {
                    this.sendingItemKeys .length && (this.sendingItemKeys = _.filter(this.sendingItemKeys, function(t) {
                        return _.indexOf(e, t) === -1
                    })); 
                    try {
                        var t = this.getPendingItems(),
                            r = _.filter(t, function(t) {
                                return _.indexOf(e, t) === -1
                            }); 
                        localStorage.setItem("sawebjssdk-sendingitems", JSON.stringify(r))
                    } catch (s) {}
                }
            }, 
            getPendingItems: function() {
                var e = [];
                try { 
                    var t = localStorage.getItem("sawebjssdk-sendingitems");
                    t && (e = JSON.parse(t))
                } catch (r) {}
                return e
            }, 
            sendPrepare: function(e) {
                this.appendPendingItems(e.keys);
                var t = e.vals, 
                    r = t.length;
                r > 0 && this.send({
                    keys: e.keys,
                    vals: t
                })
            },
            sendStrategy: function() {
                if (document.hasFocus() === !1) return !1;
                var e = this.readS tore();
                e.keys.length > 0 && 0 === this.sendingData && (this.sendingData = 1, this.sendPrepare(e))
            },
            batchInterval: function() {
                var e = this;
                setInterval(functio n() {
                    e.sendStrategy()
                }, sd.para.batch_sen d.send_interval)
            },
            readStore: function() {
                for (var e = [], t = [], r = null, s = (new Date).getTime(), a = localStorage.length, n = this.getPendingItems(), i = 0; i < a; i++) {
                    var o = loc alStorage.key(i);
                    if (0 === o.indexOf("sawebjssdk-") && /^sawebjssdk\-\d+$/.test(o)) {
                        if (n.length && _.indexOf(n, o) > -1) continue;
                        r = localStorage.getItem(o), r ? (r = _.safeJSONParse(r), r && _.isObject(r) ? (r._flush_time = s, e.push(o), t.push(r)) : (localStorage.removeItem(o), sd.log("localStorage-??????parse??????" + r))) : (localStorage.removeItem(o), sd.log("localStorage-??????????????????" + r))
                    }
                }
                return {
                    keys: e,
                    vals: t
                }
            },
            writeStore: function(e) {
                var t = String(Math.random()).slice(2, 5) + String(Math.random()).slice(2, 5) + String((new Date).getTime()).slice(3);
                localStorage.set Item("sawebjssdk-" + t, JSON.stringify(e))
            }
        }, sd.batchSend = new BatchSend;
        var dataSend = {};
        dataSend.getSendUrl = function(e, t) {
            var r = _.base64Encode(t),
                s = "crc=" + _.hashCod e(r);
            return e.indexOf("?") !== -1 ? e + "&data=" + encodeURIComponent(r) + "&ext=" + encodeURIComponent(s) : e + "?data=" + encodeURIComponent(r) + "&ext=" + encodeURIComponent(s)
        }, dataSend.getSendData = function(e) {
            var t = _.base64Encode(e),
                r = "crc=" + _.hashCode(t) ;
            return "data=" + encodeURIComponent(t) + "&ext=" + encodeURIComponent(r)
        }, dataSend.getInstance = function(e) {
            var t = this.getSendType(e),
                r = new this[t](e), 
                s = r.start;
            return r.start = function() {
                _.isObject(sd.para.is_debug) && sd.para.is_debug.storage && sd.store.requests && sd.store.requests.push({
                    name: this.server _url,
                    initiatorType: this.img ? "img" : "xmlhttprequest",
                    entryType: "resource",
                    requestData: this.data
                });
                var e = this;
                s.apply(this, arguments), setTimeout(function() {
                    e.isEnd(!0)
                }, sd.para.callback_timeout) 
            }, r.end = function() {
                this.callback && this.callback();
                var e = this; 
                setTimeout(function() {
                    e.lastClear && e.lastClear()
                }, sd.para.datasend _timeout - sd.para.callback_timeout)
            }, r.isEnd = function(e) {
                if (!this.received) {
                    this.received  = !0, this.end();
                    var t = this;
                    e ? sd.para.queue_timeout - sd.para.callback_timeout <= 0 ? t.close() : setTimeout(function() {
                        t.close()
                    }, sd.para.queue_timeout - sd.para.callback_timeout) : t.close() 
                }
            }, r
        }, dataSend.getRealtimeInstance = function(e) {
            var t = this.getSendType(e),
                r = new this[t](e); 
            r.defaultData = e;
            var s = r.start;
            return r.start = function() {
                var e = this;
                s.apply(this, argumen ts), setTimeout(function() {
                    e.isEnd(!0)
                }, sd.para.callback_timeout) 
            }, r.end = function() {
                this.callback && this.callback();
                var e = this; 
                setTimeout(function() {
                    e.lastClear && e.lastClear()
                }, sd.para.datasend _timeout - sd.para.callback_timeout)
            }, r.isEnd = function(e) {
                this.received || (this.received = !0, this.end())
            }, r 
        }, dataSend.getSendType = function(e) {
            var t = ["image", "ajax", "beacon"],
                r = t[0]; 
            return r = e.config && _.indexOf(t, e.config.send_type) > -1 ? e.config.send_type : sd.para.send_type, "beacon" === r && _.isSupportBeaconSend() === !1 && (r = "image"), "ajax" === r && _.isSupportCors() === !1 && (r = "image"), r
        }, dataSend.image = function(e) {
            this.callback = e.callback, this.img = document.createElement("img"), this.img.width = 1, this.img.height = 1, sd.para.img_use_crossorigin && (this.img.crossOrigin = "anonymous"), this.data = e.data, this.server_url = dataSend.getSendUrl(e.server_url, e.data)
        }, dataSend.image.prototype. start = function() {
            var e = this;
            sd.para.ignore_oom && (this.img.onload =  function() {
                this.onload = null, this.onerror = null, this.onabort = null, e.isEnd()
            }, this.img.onerror = function() { 
                this.onload = null, this.onerror = null, this.onabort = null, e.isEnd()
            }, this.img.onabort = function () {
                this.onload = null, this.onerror = null, this.onabort = null, e.isEnd()
            }), this.img.src = this.server _url
        }, dataSend.image.prototype.lastClear = function() {
            this.img.src = ""
        }, dataSend.ajax = function(e) { 
            this.callback = e.callback, this.server_url = e.server_url, this.data = dataSend.getSendData(e.data)
        }, dataSend.ajax.prototype. start = function() {
            var e = this;
            _.ajax({ 
                url: this.server_url,
                type: "POST",
                data: this.data,
                credentials: !1,
                timeout: sd.para.datasend_timeout,
                cors: !0,
                success: function() {
                    e.isEnd()
                }, 
                error: function() {
                    e.isEnd()
                } 
            })
        }, dataSend.beacon = function(e) {
            this.callback = e.callback, this.server_url = e.server_url, this.data = dataSend.getSendData(e.data);
        }, dataSend.beacon.prototype. start = function() {
            var e = this;
            "object" == typeof navigator && "function " == typeof navigator.sendBeacon && (navigator.sendBeacon(this.server_url, this.data) || (this.defaultData.config.send_type = "image", sendState.realtimeSend(this.defaultData))), setTimeout(function() {
                e.isEnd()
            }, 40) 
        };
        var sendState = {};
        sd.sendState = sendState, sd.events = new _.eventEmitter, sendState.queue = _.autoExeQueue(), sendState.requestData = null, sendState.getSendCall = function(e, t, r) {
            if (sd.is_heatmap_render_mode) return !1;
            if (sd.readyState.state < 3) return sd.log("?????????????????????"), !1; 
            e._track_id = Number(String(Math.random()).slice(2, 5) + String(Math.random()).slice(2, 4) + String((new Date).getTime()).slice(-4)), sd.para.use_client_time && (e._flush_time = (new Date).getTime());
            var s = e;
            return e = JSON.stringify(e), this.requestData = {
                data: s,
                config: t,
                callback: r
            }, sd.events.tempAdd("send", s), !sd.para.app_js_bridge && sd.para.batch_send && localStorage.length < 200 ? (sd.log(s), sd.batchSend.add(this.requestData.data), !1) : (sd.bridge.dataSend(s, this, r), void sd.log(s))
        }, sendState.prepareServerUrl = function() {
            if ("object" == typeof this.requestData.config && this.requestData.config.server_url) this.sendCall(this.requestData.config.server_url, this.requestData.callback);
            else if (_.isArray(sd.para.server_ur l) && sd.para.server_url.length)
                for (var e = 0; e < sd.para.server_url.length; e++) this.sendCall(sd.para.server_url[e]);
            else "string" == typeof sd.para.server_url && "" !== sd.para.server_url ? this.sendCall(sd.para.server_url, this.requestData.callback) : sd.log("?????? server_url ???????????????????????????????????????????????????network ??????????????????????????????????????? server_url???")
        }, sendState.sendCall = function(e, t) {
            var r = {
                server_url: e, 
                data: JSON.stringify(this.requestData.data),
                callback: t,
                config: this.requestData.config
            };
            _.isObject(sd.para.jsapp) && !sd.para.jsapp.isOnline && "function" == typeof sd.para.jsapp.setData ? (delete r.callback, r = JSON.stringify(r), sd.para.jsapp.setData(r)) : sd.para.use_client_time ? this.realtimeSend(r) : this.pushSend(r)
        }, sendState.pushSend = function(e) {
            var t = dataSend.getInstance(e),
                r = this; 
            t.close = function() {
                r.queue.close()
            }, this.queue.enqu eue(t)
        }, sendState.realtimeSend = function(e) {
            var t = dataSend.getRealtimeInstance(e);
            t.start() 
        };
        var saEvent = {};
        sd.saEvent = saEvent, saEvent.checkOption = {
            regChecks: {
                regName: /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i
            },
            checkPropertiesKey: function(e) {
                var t = this,
                    r = !0; 
                return _.each(e, function(e, s) {
                    t.regChecks.regName.test(s) || (r = !1)
                }), r 
            },
            check: function(e, t) {
                return "string" == typeof this[e] ? this[this[e]](t) : _.isFunction(this[e]) ? this[e](t) : void 0
            }, 
            str: function(e) {
                return !!_.isString(e) || (sd.log("?????????????????????,??????????????????"), !0)
            }, 
            properties: function(e) {
                return _.strip_sa_properties(e), !e || (_.isObject(e) ? !!this.checkPropertiesKey(e) || (sd.log("properties ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? $ ??????"), !0) : (sd.log("properties??????????????????????????????????????????"), !0))
            }, 
            propertiesMust: function(e) {
                return _.strip_sa_properties(e), void 0 === e || !_.isObject(e) || _.isEmptyObject(e) ? (sd.log("properties????????????????????????"), !0) : !!this.checkPropertiesKey(e) || (sd.log("properties ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? $ ??????"), !0)
            }, 
            event: function(e) {
                return !(!_.isString(e) || !this.regChecks.regName.test(e)) || (sd.log("????????????????????????eventName ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? $,????????? $ ???????????????????????????????????????????????????????????????????????? $ ??????"), !0)
            }, 
            test_id: "str",
            group_id: "str",
            distinct_id: function(e) {
                return !(!_.isString(e) || !/^.{1,255}$/.test(e)) || (sd.log("distinct_id?????????????????????????????????255???????????????"), !1)
            } 
        }, saEvent.check = function(e) {
            var t = !0;
            for (var r in e) 
                if (Object.prototype.hasOwnProperty.call(e, r) && !this.checkOption.check(r, e[r])) return !1;
            return t
        }, saEvent.send = function(e, t) {
            var r = {
                distinct_id: store .getDistinctId(),
                lib: {
                    $lib: "js",
                    $lib_method: "code",
                    $lib_version: String(sd.lib_version)
                },
                properties: {}
            };
            _.isObject(e) && _.isObject(e.properties) && !_.isEmptyObject(e.properties) && e.properties.$lib_detail && (r.lib.$lib_detail = e.properties.$lib_detail, delete e.properties.$lib_detail), _.extend(r, sd.store.getUnionId(), e), _.isObject(e.properties) && !_.isEmptyObject(e.properties) && _.extend(r.properties, e.properties), e.type && "profile" === e.type.slice(0, 7) || (r.properties = _.extend({}, _.info.properties(), store.getProps(), store.getSessionProps(), _.info.currentProps, r.properties), sd.para.preset_properties.latest_referrer && !_.isString(r.properties.$latest_referrer) && (r.properties.$latest_referrer = "????????????"), sd.para.preset_properties.latest_search_keyword && !_.isString(r.properties.$latest_search_keyword) && (r.properties.$latest_search_keyword = "????????????"), sd.para.preset_properties.latest_traffic_source_type && !_.isString(r.properties.$latest_traffic_source_type) && (r.properties.$latest_traffic_source_type = "????????????"), sd.para.preset_properties.latest_landing_page && !_.isString(r.properties.$latest_landing_page) && (r.properties.$latest_landing_page = "????????????"), sd.para.preset_properties.latest_wx_ad_click_id && !_.isString(r.properties._latest_wx_ad_click_id) && (r.properties._latest_wx_ad_click_id = "????????????", r.properties._latest_wx_ad_hash_key = "????????????", r.properties._latest_wx_ad_callbacks = "????????????")), r.properties.$time && _.isDate(r.properties.$time) ? (r.time = 1 * r.properties.$time, delete r.properties.$time) : sd.para.use_client_time && (r.time = 1 * new Date), _.parseSuperProperties(r.properties), _.filterReservedProperties(r.properties), _.searchObjDate(r), _.searchObjString(r), _.searchZZAppStyle(r);
            var s = _.searchConfigData(r.properties);
            saNewUser.checkIsAddSign(r), saNewUser.checkIsFirstTime(r), sd.addReferrerHost(r), sd.addPropsHook(r), sd.para.debug_mode === !0 ? (sd.log(r), this.debugPath(JSON.stringify(r), t)) : sd.sendState.getSendCall(r, s, t)
        }, saEvent.debugPath = function(e, t) {
            var r = e,
                s = ""; 
            s = sd.para.debug_mode_url.indexOf("?") !== -1 ? sd.para.debug_mode_url + "&data=" + encodeURIComponent(_.base64Encode(e)) : sd.para.debug_mode_url + "?data=" + encodeURIComponent(_.base64Encode(e)), _.ajax({
                url: s,
                type: "GET",
                cors: !0,
                header: {
                    "Dry-Run": String(sd.para.debug_mode_upload)
                },
                success: function(e) {
                    _.isEmptyObject(e) === !0 ? alert("debug??????????????????" + r) : alert("debug?????? ????????????" + JSON.stringify(e))
                } 
            })
        };
        var store = sd.store = {
                requests: [],
                _sessionState: {},
            _state: {
                distinct_id: "",
                first_id: "",
                props: {}
                
                rops: function() {
                return this._state.props || {}
            }, 
                essionProps: function() {
                return this._sessionState
            }, 
                istinctId: function() {
                return this._state._distinct_id || this._state.distinct_id
            }, 
                nionId: function() {
                var e = {},
                    t = this._st ate._first_id || this._state.first_id,
                    r = this._state._distinct_id || this._state.distinct_id;
                    rn t && r ? (e.login_id = r, e.anonymous_id = t) : e.anonymous_id = r, e
                    
                irstId: function() {
                return this._state._first_id || this._state.first_id
            }, 
                ate: function(e) {
                var t = null;
                if (null != e  && _.isJSONString(e))
                    if (t = JSON.parse(e), this._state = _.extend(t), t.distinct_id) {
                        if ("object" == typeof t.props) {
                            for (var r in t.props) "string" == typeof t.props[r] && (t.props[r] = t.props[r].slice(0, sd.para.max_referrer_string_length));
                            this.save()
                            
                            his.set("distinct_id", _.UUID()), sd.debug.distinct_id("1", e);
                        s.set("distinct_id", _.UUID()), sd.debug.distinct_id("2", e)
                    
                SessionState: function() {
                var e = _.cookie.get("sensorsdata2015session"),
                    t = null; 
                null !== e && "object" == typeof(t = JSON.parse(e)) && (this._sessionState = t || {})
                    
                nce: function(e, t) { 
                e in this._state || this.set(e, t)
            }, 
                 function(e, t) {
                this._state = this._state || {}, "distinct_id" === e && this._state.distinct_id && sd.events.tempAdd("changeDistinctId", t), this._state[e] = t, "first_id" === e ? delete this._state._first_id : "distinct_id" === e && delete this._state._distinct_id, this.save()
            }, 
                ge: function(e, t) {
                this._state["_" + e] = t
            }, 
                essionProps: function(e) {
                var t = this._sessionState;
                _.extend(t, e), this. sessionSave(t)
                
                essionPropsOnce: function(e) {
                var t = this._sessionState;
                _.coverExtend(t, e), this .sessionSave(t)
                
                rops: function(e, t) {
                var r = {};
                r = t ? e : _. extend(this._state.props || {}, e);
                for (var s in r) "string" == typeof r[s] && (r[s] = r[s].slice(0, sd.para.max_referrer_string_length));
                this.set("props", r)
                
                ropsOnce: function(e) {
                var t = this._state.props || {};
                _.coverExtend(t, e ), this.set("props", t)
                
                rAllProps: function(e) {
                if (this._sessionState = {}, _.isArray(e) && e.length > 0)
                    for (var t = 0;  t < e.length; t++) _.isString(e[t]) && e[t].indexOf("latest_") === -1 && e[t] in this._state.props && delete this._state.props[e[t]];
                else
                    for (var t in this._state.props) 1 !== t.indexOf("latest_") && delete this._state.props[t];
                this.sessionSave({}), this.save()
                    
                ionSave: function(e) {
                this._sessionState = e, _.cookie.set("sensorsdata2015session", JSON.stringify(this._sessionState), 0)
            }, 
                : function() {
                var e = JSON.parse(JSON.stringify(this._state));
                delete e._ first_id, delete e._distinct_id, _.cookie.set(this.getCookieName(), JSON.stringify(e), 73e3, sd.para.cross_subdomain)
                
                ookieName: function() {
                var e = "";
                if (sd.para.cross_s ubdomain === !1) {
                    try {
                        e = _.URL(location.href).hostname
                    } catch (t) {
                        sd.log(t)
                    }
                        "string" == typeof e && "" !== e ? "sa_jssdk_2015_" + e.replace(/\./g, "_") : "sa_jssdk_2015_root"
                    se e = "sensorsdata2015jssdkcross";
                    rn e
                
                : function() {
                this.initSessionState();
                var e = _. UUID(),
                    t = _.cookie.get(this.getCookieName());
                null === t ? (sd.is_first_visitor = !0, this.set("distinct_id", e)) : (_.isJSONString(t) && JSON.parse(t).distinct_id || (sd.is_first_visitor = !0), this.toState(t)), saNewUser.setDeviceId(e), saNewUser.storeInitCheck(), saNewUser.checkIsFirstLatest()
                    
                
            wUser = {
            checkIsAddSign: function(e) {
                    "track" === e.type && (_.cookie.getNewUser() ? e.properties.$is_first_day = !0 : e.properties.$is_first_day = !1)
                }, 
                is_first_visit_time: !1,
                checkIsFirstTime: function(e) {
                    "track" === e.type && "$pageview" === e.event && (this.is_first_visit_time ? (e.properties.$is_first_time = !0, this.is_first_visit_time = !1) : e.properties.$is_first_time = !1)
                }, 
                setDeviceId: function(e) {
                    var t = null,
                        r = _.cookie. get("sensorsdata2015jssdkcross"),
                        s = {};
                    null != r && _.isJSONString(r) && (s = JSON.parse(r), s.$device_id && (t = s.$device_id)), t = t || e, sd.para.cross_subdomain === !0 ? store.set("$device_id", t) : (s.$device_id = t, _.cookie.set("sensorsdata2015jssdkcross", JSON.stringify(s), null, !0)), sd.para.is_track_device_id && (_.info.currentProps.$device_id = t)
                },
                storeInitCheck: function() {
                    if (sd.is_first_visitor) {
                        var e = new Date ,
                            t = {
                                h: 23 - e.getHours(),
                                m: 59 - e.getMinutes(),
                                s: 59 - e.getSeconds()
                            };
                        _.cookie.set(_.cookie.getCookieName("new_user"), "1", 3600 * t.h + 60 * t.m + t.s + "s"), this.is_first_visit_time = !0
                    } else _.cookie.getNewUser() || (this.checkIsAddSign = function(e) {
                        "track" === e.type && (e.properties.$is_first_day = !1)
                    }), this.checkIsFirstTime = function(e) { 
                        "track" === e.type && "$pageview" === e.event && (e.properties.$is_first_time = !1)
                    } 
                },
                checkIsFirstLatest: function() {
                    for (var e = _.info.pageProp.url_domain, t = ["$utm_source", "$utm_medium", "$utm_campaign", "$utm_content", "$utm_term"], r = store.getProps(), s = 0; s < t.length; s++) t[s] in r && delete r[t[s]];
                    store.setProps(r, !0); 
                    var a = {};
                    if ("" === e && (e = "url????????????"), _.each(sd.para.preset_properties, function(t, r) {
                        if (r.indexOf("latest_") === -1) return !1;
                        if (r = r.slice(7), t) { 
                            if ("utm" !== r && "url????????????" === e) "wx_ad_click_id" === r ? (a._latest_wx_ad_click_id = "url???domain????????????", a._latest_wx_ad_hash_key = "url???domain????????????", a._latest_wx_ad_callbacks = "url???domain????????????") : a["$latest_" + r] = "url???domain????????????";
                            else if (_.isReferralTraffic(document.referrer)) switch (r) {
                                case "traffic_source_type":
                                    a.$latest_traffic_source_type = _.getSourceFromReferrer();
                                    break;
                                case "referrer":
                                    a.$latest_referrer = _.info.pageProp.referrer;
                                    break;
                                case "search_keyword":
                                    a.$latest_search_keyword = _.getKeywordFromReferrer();
                                    break;
                                case "landing_page":
                                    a.$latest_landing_page = location.href;
                                    break;
                                case "wx_ad_click_id":
                                    var s = _.getWxAdIdFromUrl(location.href);
                                    a._latest_wx_ad_click_id = s.click_id, a._latest_wx_ad_hash_key = s.hash_key, a._latest_wx_ad_callbacks = s.callbacks
                            }
                        } else if ("utm" === r && sd.store._state.props)
                            for (var n in sd.store._state.props)(0 === n.indexOf("$latest_utm") || 0 === n.indexOf("_latest_") && n.indexOf("_latest_wx_ad_") < 0) && delete sd.store._state.props[n];
                        else if (sd.store._state.props && "$latest_" + r in sd.store._state.props) delete sd.store._state.props["$latest_" + r];
                        else if ("wx_ad_click_id" == r && sd.sto re._state.props) {
                            var i = ["_latest_wx_ad_click_id", "_latest_wx_ad_hash_key", "_latest_wx_ad_callbacks"];
                            _.each(i, function(e) {
                                e in sd.store._state.props && delete sd.store._state.props[e]
                            }) 
                        }
                    }), sd.register(a), sd.para.preset_properties.latest_utm) {
                        var n = _.info.campaignParamsStandard("$latest_", "_latest_"),
                            i = n.$utms,
                            o = n.otherUtms;
                        _.isEmptyObject(i) || sd.register(i), _.isEmptyObject(o) || sd.register(o)
                    }
                }
            };
        sd.bridge = {
            is_verify_success: !1,
            initPara: function() {
                var e = {
                    is_send: ! 0,
                    white_list: [],
                    is_mui: !1
                };
                "object" == typeof sd.para.app_js_bridge ? sd.para.app_js_bridge = _.extend({}, e, sd.para.app_js_bridge) : sd.para.use_app_track === !0 || sd.para.app_js_bridge === !0 || "only" === sd.para.use_app_track ? (sd.para.use_app_track_is_send !== !1 && "only" !== sd.para.use_app_track || (e.is_send = !1), sd.para.app_js_bridge = _.extend({}, e)) : "mui" === sd.para.use_app_track && (e.is_mui = !0, sd.para.app_js_bridge = _.extend({}, e)), sd.para.app_js_bridge.is_send === !1 && sd.log("????????? is_send:false,??????????????????????????????????????????")
            },
            initState: function() {
                function e(e) {
                    function t( e) {
                        var t = {
                            hostname: "",
                            project: ""
                        };
                        try {
                            t.hostname = _.URL(e).hostname, t.project = _.URL(e).searchParams.get("project") || "default"
                        } catch (r) {
                            sd.log(r)
                        }
                        return t
                    }
                    var r = t(e),
                        s = t(sd.para.server_url);
                    if (r.hostname === s.hostname && r.project === s.project) return !0;
                    if (sd.para.app_js_bridge.white_list.length > 0)
                        for (var a = 0; a < sd.para.app_js_bridge.white_list.length; a++) {
                            var n = t(sd.para.app_js_bridge.white_list[a]);
                            if (n.hostname === r.hostname && n.project === r.project) return !0
                        }
                    return !1
                }
                if (_.isObject(sd.para.app_js_bridge) && !sd.para.app_js_bridge.is_mui)
                    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && _.isObject(window.SensorsData_iOS_JS_Bridge) && window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url) e(window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url) && (sd.bridge.is_verify_success = !0);
                    else if (_.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url && window.SensorsData_APP_New_H5_Bridge.sensorsdata_track) {
                    var t = window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url();
                    t && e(t) && (sd.bridge.is_verify_success = !0)
                        
                        
                    DefineBridgeInfo: function() {
                var e = {
                    touch_app_bridge: !0, 
                    verify_success: !1
                };
                return window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage && _.isObject(window.SensorsData_iOS_JS_Bridge) && window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url ? sd.bridge.is_verify_success ? e.verify_success = "success" : e.verify_success = "fail" : _.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url && window.SensorsData_APP_New_H5_Bridge.sensorsdata_track ? sd.bridge.is_verify_success ? e.verify_success = "success" : e.verify_success = "fail" : "object" == typeof SensorsData_APP_JS_Bridge && (SensorsData_APP_JS_Bridge.sensorsdata_verify && SensorsData_APP_JS_Bridge.sensorsdata_visual_verify || SensorsData_APP_JS_Bridge.sensorsdata_track) ? SensorsData_APP_JS_Bridge.sensorsdata_verify && SensorsData_APP_JS_Bridge.sensorsdata_visual_verify ? SensorsData_APP_JS_Bridge.sensorsdata_visual_verify(JSON.stringify({
                    server_url: sd.para.server_url
                })) ? e.verify_success = "success" : e.verify_success = "fail" : e.verify_success = "success" : !/sensors-verify/.test(navigator.userAgent) && !/sa-sdk-ios/.test(navigator.userAgent) || window.MSStream ? e.touch_app_bridge = !1 : sd.bridge.iOS_UA_bridge() ? e.verify_success = "success" : e.verify_success = "fail", e
            },
            iOS_UA_bridge: function() {
                if (/sensors-verify/.test(navigator.userAgent)) {
                    var e = navigat or.userAgent.match(/sensors-verify\/([^\s]+)/);
                    if (e && e[0] && "string" == typeof e[1] && 2 === e[1].split("?").length) {
                        e = e[1].split("?");
                        var t = null,
                            r = null;
                        try {
                            t = _.URL(sd.para.server_url).hostname, r = _.URL(sd.para.server_url).searchParams.get("project") || "default"
                        } catch (s) {
                            sd.log(s)
                        }
                        return !(!t || t !== e[0] || !r || r !== e[1])
                    }
                    return !1
                }
                return !!/sa-sdk-ios/.test(navigator.userAgent)
            },
            dataSend: function(e, t, r) {
                if (_.isObject(sd.para.app_js_bridge) && !sd.para.app_js_bridge.is_mui)
                    if (window .webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage && _.isObject(window.SensorsData_iOS_JS_Bridge) && window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url) sd.bridge.is_verify_success ? (window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify({
                        callType: "app_h5_track",
                        data: _.extend({
                            server_url: sd.para.server_url
                        }, e)
                    })), "function" == typeof r && r()) : sd.para.app_js_bridge.is_send ? (sd.debug.apph5({
                        data: e,
                        step: "4.1",
                        output: "all"
                    }), t.prepareServerUrl()) : "function" == typeof r && r();
                    else if (_.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url && window.SensorsData_APP_New_H5_Bridge.sensorsdata_track) sd.bridge.is_verify_success ? (SensorsData_APP_New_H5_Bridge.sensorsdata_track(JSON.stringify(_.extend({
                    server_url: sd.para.server_url
                }, e))), "function" == typeof r && r()) : sd.para.app_js_bridge.is_send ? (sd.debug.apph5({
                        data: e,
                        step: "4.2",
                        output: "all"
                        t.prepareServerUrl()) : "function" == typeof r && r();
                         if ("object" == typeof SensorsData_APP_JS_Bridge && (SensorsData_APP_JS_Bridge.sensorsdata_verify || SensorsData_APP_JS_Bridge.sensorsdata_track)) SensorsData_APP_JS_Bridge.sensorsdata_verify ? SensorsData_APP_JS_Bridge.sensorsdata_verify(JSON.stringify(_.extend({
                        server_url: sd.para.server_url
                    }, e))) ? "function" == typeof r && r() : sd.para.app_js_bridge.is_send ? (sd.debug.apph5({
                        data: e,
                        step: "3.1",
                        output: "all"
                        t.prepareServerUrl()) : "function" == typeof r && r() : (SensorsData_APP_JS_Bridge.sensorsdata_track(JSON.stringify(_.extend({
                        server_url: sd.para.server_url
                    }, e))), "function" == typeof r && r());
                         if (!/sensors-verify/.test(navigator.userAgent) && !/sa-sdk-ios/.test(navigator.userAgent) || window.MSStream) _.isObject(sd.para.app_js_bridge) && sd.para.app_js_bridge.is_send === !0 ? (sd.debug.apph5({
                        data: e,
                        step: "2",
                        output: "all"
                        t.prepareServerUrl()) : "function" == typeof r && r();
                         {
                        var s = null;
                        sd.bridge.iOS_UA_bridge() ? (s = document.createElement("iframe"), s.setAttribute("src", "sensorsanalytics://trackEvent?event=" + encodeURIComponent(JSON.stringify(_.extend({
                            server_url: sd.para.server_url
                        }, e)))), document.documentElement.appendChild(s), s.parentNode.removeChild(s), s = null, "function" == typeof r && r()) : sd.para.app_js_bridge.is_send ? (sd.debug.apph5({
                            data: e,
                            step: "3.2",
                            output: "all"
                            t.prepareServerUrl()) : "function" == typeof r && r()
                            .isObject(sd.para.app_js_bridge) && sd.para.app_js_bridge.is_mui ? _.isObject(window.plus) && window.plus.SDAnalytics && window.plus.SDAnalytics.trackH5Event ? (window.plus.SDAnalytics.trackH5Event(data), "function" == typeof r && r()) : _.isObject(sd.para.app_js_bridge) && sd.para.app_js_bridge.is_send === !0 ? t.prepareServerUrl() : "function" == typeof r && r() : (sd.debug.apph5({
                        data: e,
                        step: "1",
                        output: "code"
                        t.prepareServerUrl())
                        
                    js_bridge_v1: function() {
                function e(e) {
                    s = e, _.isJSONStr ing(s) && (s = JSON.parse(s)), a && (a(s), a = null, s = null)
                }

                function t() {
                    "object" == typeof window.SensorsData_APP_JS_Bridge && window.SensorsData_APP_JS_Bridge.sensorsdata_call_app && (s = SensorsData_APP_JS_Bridge.sensorsdata_call_app(), _.isJSONString(s) && (s = JSON.parse(s)))
                }

                function r() {
                    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                        var e = document.createElement("iframe");
                        e.setAttribute("src", "sensorsanalytics://getAppInfo"), document.documentElement.appendChild(e), e.parentNode.removeChild(e), e = null
                    }
                }
                var s = null,
                    a = null;
                window.sensorsdata_app_js_bridge_call_js = function(t) {
                    e(t)
                }, sd.getAppStatus = function(e) { 
                    return r(), t(), e ? void(null === s ? a = e : (e(s), s = null)) : s
                } 
            }, 
            supportAppCallJs: function() {
                window.sensorsdata_app_call_js = function(e, t) {
                    e in window.sensor sdata_app_call_js.modules && window.sensorsdata_app_call_js.modules[e](t)
                }, window.sensorsdata_app_call_js.modules  = {}
            }
        }, sd.JSBridge = function(e) {
            this.list = {}, this.type = e.type, this.app_call_js = _.isFunction(e.app_call_js) ? e.app_call_js : function() {}, this.init()
        }, sd.JSBridge.prototype. init = function() {
            var e = this;  
            window.sensorsdata_app_call_js.modul es[this.type] || (window.sensorsdata_app_call_js.modules[this.type] = function(t) {
                e.app_call_js(t)
            }) 
        }, sd.JSBridge.prototype.jsCallApp = function(e) {
            var t = {
                callType: this.type, 
                data: e
            };
            if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage) window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify(t));
            else {
                if (!_.isObject(window.SensorsData_APP_New_H5_Bridge) || !window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app) return sd.log("????????????App?????????App????????????bridge"), !1;
                window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app(JSON.stringify(t))
            }
        }, sd.JSBridge.prototype.hasAppBridge = function() {
            return window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage ? "ios" : _.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app ? "android" : (sd.log("App???bridge?????????"), !1)
        }, sd.JSBridge.prototype.requestToApp = function (e) {
            function t() {
                var e = (new Date).getTime().toString(16 ),
                    t = String(Math.random()).replace(".", "").slice(1, 8);
                return e + "-" + t
            }
            var r = this,
                s = _.isObject(e.data) ? e.data : {};
            _.isFunction(e.callback) || (e.callback = function() {}), _.isObject(e.timeout) && _.isNumber(e.timeout.time) && (_.isFunction(e.timeout.callback) || (e.timeout.callback = function() {}), e.timer = setTimeout(function() {
                e.timeout.callback(), delete r.list[a]
            }, e.timeout.time));     
            var a = t();
            this.list[a] = e;
            var n = {
                callType: this.type,
                data: s
            };
            if (n.data.message_id = a, window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage) window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify(n));
            else {
                if (!_.isObject(window.SensorsData_APP_New_H5_Bridge) || !window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app) return sd.log("????????????App?????????App????????????bridge"), !1;
                window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app(JSON.stringify(n))
            }
        }, sd.JSBridge.prototype["double"] = function(e) {
            if (e.message_id) {
                var t = this.list[e.message_id]; 
                t && (t.timer && clearTimeout(t.timer), t.callback(e), delete this.list[e.message_id])
            }
        };
        var heatmap = sd.heatmap = {
            getElementPath: function(e, t) {
                for (var r = []; e.parentNode;) {
                    if (e.id && !t & & /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(e.id)) {
                        r.unshift(e.tagName.toLowerCase() + "#" + e.id);
                        break
                    }
                    if (e === document.body) {
                        r.unshift("body");
                        break
                    }
                    r.unshift(e.tagName.toLowerCase()), e = e.parentNode
                }
                return r.join(" > ")
            },
            getClosestLi: function(e) {
                var t = function(e, t) {
                    for (; e && e  !== document && 1 === e.nodeType; e = e.parentNode)
                        if (e.ta gName.toLowerCase() === t) return e;
                    return null
                };
                return t(e, "li")
            },
            getElementPosition: function(e, t, r) {
                function s(e) {
                    var t = (e.tagName.t oLowerCase(), e.parentNode);
                    if (!t) return "";
                    var r = _.ry(e).getSameTypeSiblings(),
                        s = r.length;
                    if (1 === s) return 0;
                    for (var a = 0, n = e; _.ry(n).previousElementSibling().ele; n = _.ry(n).previousElementSibling().ele, a++);
                    return a
                }
                var a = sd.heatmap.getClosestLi(e);
                if (!a) return null;
                var n = e.tagName.toLowerCase(),
                    i = a.getElementsByTagName(n),
                    o = i.length,
                    d = [];
                if (o > 1) {
                    for (var c = 0; c < o; c++) {
                        var u = sd.heatmap.getElementPath(i[c], r);
                        u === t && d.push(i[c])
                    }
                    if (d.length > 1) return _.indexOf(d, e)
                }
                return s(a)
            },
            setNotice: function(e) {
                sd.is_heatmap_render_mode = !0, sd.para.heatmap || (sd.errorMsg = "???SDK???????????????????????????????????????????????????"), e && e[0] && e[1] && "http:" === e[1].slice(0, 5) && "https:" === location.protocol && (sd.errorMsg = "?????????????????????https??????????????????????????????????????????https???"), sd.para.heatmap_url || (sd.para.heatmap_url = location.protocol + "//static.sensorsdata.cn/sdk/" + sd.lib_version + "/heatmap.min.js")
            }, 
            getDomIndex: function(e) {
                if (!e.parentNode) return -1;
                for (var t = 0, r  = e.tagName, s = e.parentNode.children, a = 0; a < s.length; a++)
                    if (s[a].tagName === r) {
                        if (e === s[a]) return t;
                        t++
                    }
                return -1
            },
            selector: function(e) {
                var t = e.parentNode && 9 == e.parentNode.nodeType ? -1 : this.getDomIndex(e);
                return e.getAt tribute && e.getAttribute("id") && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(e.getAttribute("id")) && (!sd.para.heatmap || sd.para.heatmap && "not_use_id" !== sd.para.heatmap.element_selector) ? "#" + e.getAttribute("id") : e.tagName.toLowerCase() + (~t ? ":nth-of-type(" + (t + 1) + ")" : "")
            },
            getDomSelector: function(e, t) {
                if (!e || !e.parentNode || !e.parentNode.children) return !1;
                t = t && t.join ? t  : [];
                var r = e.nodeName.toLowerCase();
                return e && "body" !== r && 1 == e.nodeType ? (t.unshift(this.selector(e)), e.getAttribute && e.getAttribute("id") && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(e.getAttribute("id")) && sd.para.heatmap && "not_use_id" !== sd.para.heatmap.element_selector ? t.join(" > ") : this.getDomSelector(e.parentNode, t)) : (t.unshift("body"), t.join(" > "))
            },
            na: function() {
                var e = document.documentElement.scrollLeft || window.pageXOffset;
                return p arseInt(isNaN(e) ? 0 : e, 10)
            },
            i: function() {
                var e = 0;
                try { 
                    e = o.documentElement && o.documentElement.scrollTop || m.pageYOffset, e = isNaN(e) ? 0 : e
                } catch (t) {
                    e = 0
                }
                return parseInt(e, 10)
            },
            getBrowserWidth: function() {
                var e = window.innerWidth || document.body.clientWidth;
                return isNaN(e) ? 0 :  parseInt(e, 10)
            },
            getBrowserHeight: function() {
                var e = window.innerHeight || document.body.clientHeight;
                return isNaN(e) ? 0 :  parseInt(e, 10)
            },
            getScrollWidth: function() {
                var e = parseInt(document.body.scrollWidth, 10);
                return isNaN(e) ? 0  : e
            },
            W: function(e) {
                var t = parseInt(+e.clientX + +this.na(), 10),
                    e =  parseInt(+e.clientY + +this.i(), 10);
                return {
                    x: isNaN(t) ? 0 : t,
                    y: isNaN(e) ? 0 : e
                }
            },
            start: function(e, t, r, s, a) {
                var n = _.isObject(s) ? s : {},
                    i = _.i sFunction(a) ? a : _.isFunction(s) ? s : void 0;
                if (sd.para.heatmap && sd.para.heatmap.collect_element && !sd.para.heatmap.collect_element(t)) return !1;
                var o = this.getDomSelector(t),
                    d = _.getEleInfo({
                        target: t
                    });
                d.$element_selector = o ? o : "", d.$element_path = sd.heatmap.getElementPath(t, sd.para.heatmap && "not_use_id" === sd.para.heatmap.element_selector);
                var c = sd.heatmap.getElementPosition(t, d.$element_path, sd.para.heatmap && "not_use_id" === sd.para.heatmap.element_selector);
                if (_.isNumber(c) && (d.$element_position = c), sd.para.heatmap && sd.para.heatmap.custom_property) {
                    var u = sd.para.heatmap.custom_property(t);
                    _.isObject(u) && (d = _.extend(d, u))
                }
                d = _.extend(d, n), "a" === r && sd.para.heatmap && sd.para.heatmap.isTrackLink === !0 ? _.trackLink({
                    event: e,
                    target: t
                }, "$WebClick", d) : sd.track("$WebClick", d, i)
            },
            hasElement: function(e) {
                var t = e._getPath();
                if (_.isArray(t)  && t.length > 0)
                    for (var r = 0; r < t.length; r++)
                        if (t[r] && t[r].tagName && "a" === t[r].tagName.toLowerCase()) return t[r];
                return !1
            },
            isStyleTag: function(e, t) {
                var r = ["a", "div", "input", "button", "textarea"],
                    s = ["mark",  "/mark", "strong", "b", "em", "i", "u", "abbr", "ins", "del", "s", "sup"];
                return !(_.indexOf(r, e) > -1) && (!t || sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div ? !!(_.isObject(sd.para.heatmap) && _.isObject(sd.para.heatmap.collect_tags) && _.isObject(sd.para.heatmap.collect_tags.div) && _.indexOf(sd.para.heatmap.collect_tags.div.ignore_tags, e) > -1) : _.indexOf(s, e) > -1)
            },
            isCollectableDiv: function(e, t) {
                try {
                    if (0 === e.childr en.length) return !0;
                    for (var r = 0; r < e.children.length; r++)
                        if (1 === e.children[r].nodeType) {
                            var s = e.children[r].tagName.toLowerCase();
                            if (!this.isStyleTag(s, t)) return !1;
                            if (!this.isCollectableDiv(e.children[r], t)) return !1
                        }
                    return !0
                } catch (a) {
                    sd.log(a)
                }
                return !1
            },
            getCollectableParent: function(e, t) {
                try {
                    var r = e.parentNode, 
                        s = r ? r.tagName.toLowerCase() : "";
                    if ("body" === s) return !1;
                    if (s && "div" === s && this.isCollectableDiv(r, t)) return r;
                    if (r && this.isStyleTag(s, t)) return this.getCollectableParent(r, t)
                } catch (a) {
                    sd.log(a)
                }
                return !1
            },
            initScrollmap: function() {
                if (!_.isObject(sd.para.heatmap) || "default" !== sd.para.heatmap.scroll_notice_map) return !1;
                var e = function()  {
                        return !(sd.para.scrollmap && _.isFunction(sd.para.scrollmap.collect_url) && !sd.para.scrollmap.collect_url())
                    }, 
                    function(e) {
                    var t = {};
                        return t .timeout = e.timeout || 1e3, t.func = e.func, t.hasInit = !1, t.inter = null, t.main = function(e, t) {
                            this.func(e, t), this.inter = null
                        }, t.go = function(e) { 
                            var r = {};
                            this.inter ||  (r.$viewport_position = document.documentElement && document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0, r.$viewport_position = Math.round(r.$viewport_position) || 0, r.$viewport_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0, r.$viewport_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0, e ? t.main(r, !0) : this.inter = setTimeout(function() {
                                t.main(r)
                            }, this.timeout)) 
                        }, t
                    },
                    r = t({
                        timeout: 1e3,
                        func: function(e, t) {
                            var r = document.documentElement && document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0,
                                s = ne w Date,
                                a = s - this.current_time;
                            (a > sd.para.heatmap.scroll_delay_time && r - e.$viewport_position !== 0 || t) && (e.$url = location.href, e.$title = document.title, e.$url_path = location.pathname, e.event_duration = Math.min(sd.para.heatmap.scroll_event_duration, parseInt(a) / 1e3), sd.track("$WebStay", e)), this.current_time = s
                        }
                    });
                r.current_time = new Date, _.addEvent(window, "scroll", function() {
                    return !!e() && void r.go()
                }), _.addEvent(window, "unload", function() { 
                    return !!e() && void r.go("notime")
                }) 
            },
            initHeatmap: function() {
                var e = this;
                return !(!_.isObj ect(sd.para.heatmap) || "default" !== sd.para.heatmap.clickmap) && (!(_.isFunction(sd.para.heatmap.collect_url) && !sd.para.heatmap.collect_url()) && ("all" === sd.para.heatmap.collect_elements ? sd.para.heatmap.collect_elements = "all" : sd.para.heatmap.collect_elements = "interact", void("all" === sd.para.heatmap.collect_elements ? _.addEvent(document, "click", function(t) {
                    var r = t || window.event;
                    if (!r) return !1;  
                    var s = r.target || r.srcElement;
                    if ("object" != typeof s) return !1;
                    if ("string" != typeof s.tagName) return !1;
                    var a = s.tagName.toLowerCase();
                    if ("body" === a || "html" === a) return !1;
                    if (!s || !s.parentNode || !s.parentNode.children) return !1;
                    var n = s.parentNode.tagName.toLowerCase();
                    "a" === n || "button" === n ? e.start(r, s.parentNode, n) : e.start(r, s, a)
                }) : _.addEvent(document, "click", function(t) {
                    var r = t || window.event;
                    if (!r) return !1; 
                    var s = r.target || r.srcElement;
                    if ("object" != typeof s) return !1;
                    if ("string" != typeof s.tagName) return !1;
                    var a = s.tagName.toLowerCase();
                    if ("body" === a.toLowerCase() || "html" === a.toLowerCase()) return !1;
                    if (!s || !s.parentNode || !s.parentNode.children) return !1;
                    var n = s.parentNode,
                        i = e.hasElement(t),
                        o = sd.para.heatmap.track_attr;
                    if ("a" === a || "button" === a || "input" === a || "textarea" === a || _.hasAttributes(s, o)) e.start(r, s, a);
                    else if ("button" === n.tagName.toLowerCase() || "a" === n.tagName.toLowerCase() || _.hasAttributes(n, o)) e.start(r, n, s.parentNode.tagName.toLowerCase());
                    else if ("area" === a && "map" === n.tagName.toLowerCase() && _.ry(n).prev().tagName && "img" === _.ry(n).prev().tagName.toLowerCase()) e.start(r, _.ry(n).prev(), _.ry(n).prev().tagName.toLowerCase());
                    else if (i) e.start(r, i, i.tagName.toLowerCase());
                    else if ("div" === a && sd.para.heatmap.collect_tags.div && e.isCollectableDiv(s)) e.start(r, s, a);
                    else if (e.isStyleTag(a) && sd.para.heatmap.collect_tags.div) {
                        var d = e.getCollectableParent(s);
                        d && e.start(r, d, "div")
                    }
                }))))
            }
        };
        sd.init = function(e) {
            return !(sd.readyState && sd.readyState.state && sd.readyState.state >= 2) && (sd.setInitVar(), sd.readyState.setState(2), sd.initPara(e), sd.bridge.supportAppCallJs(), sd.detectMode(), void(sd._.isIOS() && sd._.getIOSVersion() && sd._.getIOSVersion() < 13 && (sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div && sd._.setCssStyle("div, [data-sensors-click] { cursor: pointer; -webkit-tap-highlight-color: rgba(0,0,0,0); }"), sd.para.heatmap && sd.para.heatmap.track_attr && sd._.setCssStyle("[" + sd.para.heatmap.track_attr.join("], [") + "] { cursor: pointer; -webkit-tap-highlight-color: rgba(0,0,0,0); }"))))
        }; 
        var methods = ["getAppStatus", "track", "quick", "register", "registerPage", "registerOnce", "trackSignup", "setProfile", "setOnceProfile", "appendProfile", "incrementProfile", "deleteProfile",  "unsetProfile", "identify", "login", "logout", "trackLink", "clearAllRegister"];
        if (_.each(methods, function(e) {
            var t = sd[e];
            sd[e] = function() { 
                if (sd.readyState.state < 3) return _.isArray(sd._q) || (sd._q = []), sd._q.push([e, arguments]), !1; {
                    if (sd.r eadyState.getState()) return t.apply(sd, arguments);
                    try {
                        console.error("?????????????????????JS SDK")
                    } catch (r) {
                        sd.log(r)
                    }
                }
            }
        }), "string" != typeof window.sensorsDataAnalytic201505) return "undefined" == typeof window.sensorsDataAnalytic201505 ? (window.sensorsDataAnalytic201505 = sd, sd) : window.sensorsDataAnalytic201505;
        sd.setPreConfig(window[sensorsDataAnalytic201505]), window[sensorsDataAnalytic201505] = sd, window.sensorsDataAnalytic201505 = sd, sd.init()
    } catch (err) {
        if ("object" == typeof console && console.log) try {
            console.log(err)
        } catch (e) {
            sd.log(e)
        }
    }
});