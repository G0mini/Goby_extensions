// i18next, v1.11.2
// Copyright (c)2015 Jan Mühlemann (jamuhl).
// Distributed under MIT license
// http://i18next.com
! function (a) {
    function b(a, b) {
        if (!b || "function" == typeof b) return a;
        for (var c in b) a[c] = b[c];
        return a
    }

    function c(a, b, d) {
        for (var e in b) e in a ? "string" == typeof a[e] || a[e] instanceof String || "string" == typeof b[e] || b[e] instanceof String ?
            d && (a[e] = b[e]) : c(a[e], b[e], d) : a[e] = b[e];
        return a
    }

    function d(a, b, c) {
        var d, e = 0,
            f = a.length,
            g = void 0 === f || "[object Array]" !== Object.prototype.toString.apply(a) || "function" == typeof a;
        if (c)
            if (g) {
                for (d in a)
                    if (b.apply(a[d], c) === !1) break
            } else
                for (; f > e && b.apply(a[e++], c) !== !1;);
        else if (g) {
            for (d in a)
                if (b.call(a[d], d, a[d]) === !1) break
        } else
            for (; f > e && b.call(a[e], e, a[e++]) !== !1;);
        return a
    }

    function e(a) {
        return "string" == typeof a ? a.replace(/[&<>"'\/]/g, function (a) {
            return V[a]
        }) : a
    }

    function f(a) {
        var b = function (a) {
                if (window.XMLHttpRequest) return a(null, new XMLHttpRequest);
                if (window.ActiveXObject) try {
                    return a(null, new ActiveXObject("Msxml2.XMLHTTP"))
                } catch (b) {
                    return a(null, new ActiveXObject("Microsoft.XMLHTTP"))
                }
                return a(new Error)
            },
            c = function (a) {
                if ("string" == typeof a) return a;
                var b = [];
                for (var c in a) a.hasOwnProperty(c) && b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
                return b.join("&")
            },
            d = function (a) {
                a = a.replace(/\r\n/g, "\n");
                for (var b = "", c = 0; c < a.length; c++) {
                    var d = a.charCodeAt(c);
                    128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 |
                        192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b +=
                        String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
                }
                return b
            },
            e = function (a) {
                var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                a = d(a);
                var c, e, f, g, h, i, j, k = "",
                    l = 0;
                do c = a.charCodeAt(l++), e = a.charCodeAt(l++), f = a.charCodeAt(l++), g = c >> 2, h = (3 & c) << 4 |
                    e >> 4, i = (15 & e) << 2 | f >> 6, j = 63 & f, isNaN(e) ? i = j = 64 : isNaN(f) && (j = 64), k +=
                    b.charAt(g) + b.charAt(h) + b.charAt(i) + b.charAt(j), c = e = f = "", g = h = i = j = ""; while (l <
                    a.length);
                return k
            },
            f = function () {
                for (var a = arguments[0], b = 1; b < arguments.length; b++) {
                    var c = arguments[b];
                    for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d])
                }
                return a
            },
            g = function (a, d, e, h) {
                "function" == typeof e && (h = e, e = {}), e.cache = e.cache || !1, e.data = e.data || {}, e.headers =
                    e.headers || {}, e.jsonp = e.jsonp || !1, e.async = void 0 === e.async ? !0 : e.async;
                var i, j = f({
                    accept: "*/*",
                    "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
                }, g.headers, e.headers);
                if (i = "application/json" === j["content-type"] ? JSON.stringify(e.data) : c(e.data), "GET" === a) {
                    var k = [];
                    if (i && (k.push(i), i = null), e.cache || k.push("_=" + (new Date).getTime()), e.jsonp && (k.push(
                            "callback=" + e.jsonp), k.push("jsonp=" + e.jsonp)), k = k.join("&"), k.length > 1 && (d +=
                            d.indexOf("?") > -1 ? "&" + k : "?" + k), e.jsonp) {
                        var l = document.getElementsByTagName("head")[0],
                            m = document.createElement("script");
                        return m.type = "text/javascript", m.src = d, void l.appendChild(m)
                    }
                }
                b(function (b, c) {
                    if (b) return h(b);
                    c.open(a, d, e.async);
                    for (var f in j) j.hasOwnProperty(f) && c.setRequestHeader(f, j[f]);
                    c.onreadystatechange = function () {
                        if (4 === c.readyState) {
                            var a = c.responseText || "";
                            if (!h) return;
                            h(c.status, {
                                text: function () {
                                    return a
                                },
                                json: function () {
                                    try {
                                        return JSON.parse(a)
                                    } catch (b) {
                                        return Y.error("Can not parse JSON. URL: " + d), {}
                                    }
                                }
                            })
                        }
                    }, c.send(i)
                })
            },
            h = {
                authBasic: function (a, b) {
                    g.headers.Authorization = "Basic " + e(a + ":" + b)
                },
                connect: function (a, b, c) {
                    return g("CONNECT", a, b, c)
                },
                del: function (a, b, c) {
                    return g("DELETE", a, b, c)
                },
                get: function (a, b, c) {
                    return g("GET", a, b, c)
                },
                head: function (a, b, c) {
                    return g("HEAD", a, b, c)
                },
                headers: function (a) {
                    g.headers = a || {}
                },
                isAllowed: function (a, b, c) {
                    this.options(a, function (a, d) {
                        c(-1 !== d.text().indexOf(b))
                    })
                },
                options: function (a, b, c) {
                    return g("OPTIONS", a, b, c)
                },
                patch: function (a, b, c) {
                    return g("PATCH", a, b, c)
                },
                post: function (a, b, c) {
                    return g("POST", a, b, c)
                },
                put: function (a, b, c) {
                    return g("PUT", a, b, c)
                },
                trace: function (a, b, c) {
                    return g("TRACE", a, b, c)
                }
            },
            i = a.type ? a.type.toLowerCase() : "get";
        h[i](a.url, a, function (b, c) {
            200 === b || 0 === b && c.text() ? a.success(c.json(), b, null) : a.error(c.text(), b, null)
        })
    }

    function g(a, b) {
        "function" == typeof a && (b = a, a = {}), a = a || {}, Y.extend(U, a), delete U.fixLng, U.functions && (delete U
                .functions, Y.extend(Y, a.functions)), "string" == typeof U.ns && (U.ns = {
                namespaces: [U.ns],
                defaultNs: U.ns
            }), "string" == typeof U.fallbackNS && (U.fallbackNS = [U.fallbackNS]), ("string" == typeof U.fallbackLng ||
                "boolean" == typeof U.fallbackLng) && (U.fallbackLng = [U.fallbackLng]), U.interpolationPrefixEscaped =
            Y.regexEscape(U.interpolationPrefix), U.interpolationSuffixEscaped = Y.regexEscape(U.interpolationSuffix),
            U.lng || (U.lng = Y.detectLanguage()), Q = Y.toLanguages(U.lng), L = Q[0], Y.log("currentLng set to: " + L),
            U.useCookie && Y.cookie.read(U.cookieName) !== L && Y.cookie.create(U.cookieName, L, U.cookieExpirationTime,
                U.cookieDomain), U.detectLngFromLocalStorage && "undefined" != typeof document && window.localStorage &&
            Y.localStorage.setItem("i18next_lng", L);
        var c = F;
        a.fixLng && (c = function (a, b) {
            return b = b || {}, b.lng = b.lng || c.lng, F(a, b)
        }, c.lng = L), _.setCurrentLng(L), M && U.setJqueryExt ? x && x() : y && y();
        var d;
        if (M && M.Deferred && (d = M.Deferred()), !U.resStore) {
            var e = Y.toLanguages(U.lng);
            "string" == typeof U.preload && (U.preload = [U.preload]);
            for (var f = 0, g = U.preload.length; g > f; f++)
                for (var h = Y.toLanguages(U.preload[f]), i = 0, j = h.length; j > i; i++) e.indexOf(h[i]) < 0 && e.push(
                    h[i]);
            return N.sync.load(e, U, function (a, e) {
                O = e, R = !0, b && b(a, c), d && (a ? d.reject : d.resolve)(a || c)
            }), d ? d.promise() : void 0
        }
        return O = U.resStore, R = !0, b && b(null, c), d && d.resolve(c), d ? d.promise() : void 0
    }

    function h() {
        return R
    }

    function i(a, b) {
        "string" == typeof a && (a = [a]);
        for (var c = 0, d = a.length; d > c; c++) U.preload.indexOf(a[c]) < 0 && U.preload.push(a[c]);
        return g(b)
    }

    function j(a, b, c, d, e) {
        "string" != typeof b ? (c = b, b = U.ns.defaultNs) : U.ns.namespaces.indexOf(b) < 0 && U.ns.namespaces.push(b),
            O[a] = O[a] || {}, O[a][b] = O[a][b] || {}, d ? Y.deepExtend(O[a][b], c, e) : Y.extend(O[a][b], c), U.useLocalStorage &&
            S._storeLocal(O)
    }

    function k(a, b) {
        "string" != typeof b && (b = U.ns.defaultNs), O[a] = O[a] || {};
        var c = O[a][b] || {},
            d = !1;
        for (var e in c) c.hasOwnProperty(e) && (d = !0);
        return d
    }

    function l(a, b) {
        return "string" != typeof b && (b = U.ns.defaultNs), O[a] = O[a] || {}, Y.extend({}, O[a][b])
    }

    function m(a, b) {
        "string" != typeof b && (b = U.ns.defaultNs), O[a] = O[a] || {}, O[a][b] = {}, U.useLocalStorage && S._storeLocal(
            O)
    }

    function n(a, b, c, d) {
        "string" != typeof b ? (resource = b, b = U.ns.defaultNs) : U.ns.namespaces.indexOf(b) < 0 && U.ns.namespaces.push(
            b), O[a] = O[a] || {}, O[a][b] = O[a][b] || {};
        for (var e = c.split(U.keyseparator), f = 0, g = O[a][b]; e[f];) f == e.length - 1 ? g[e[f]] = d : (null == g[e[
            f]] && (g[e[f]] = {}), g = g[e[f]]), f++;
        U.useLocalStorage && S._storeLocal(O)
    }

    function o(a, b, c) {
        "string" != typeof b ? (c = b, b = U.ns.defaultNs) : U.ns.namespaces.indexOf(b) < 0 && U.ns.namespaces.push(b);
        for (var d in c) "string" == typeof c[d] && n(a, b, d, c[d])
    }

    function p(a) {
        U.ns.defaultNs = a
    }

    function q(a, b) {
        r([a], b)
    }

    function r(a, b) {
        var c = {
                dynamicLoad: U.dynamicLoad,
                resGetPath: U.resGetPath,
                getAsync: U.getAsync,
                customLoad: U.customLoad,
                ns: {
                    namespaces: a,
                    defaultNs: ""
                }
            },
            d = Y.toLanguages(U.lng);
        "string" == typeof U.preload && (U.preload = [U.preload]);
        for (var e = 0, f = U.preload.length; f > e; e++)
            for (var g = Y.toLanguages(U.preload[e]), h = 0, i = g.length; i > h; h++) d.indexOf(g[h]) < 0 && d.push(g[
                h]);
        for (var j = [], k = 0, l = d.length; l > k; k++) {
            var m = !1,
                n = O[d[k]];
            if (n)
                for (var o = 0, p = a.length; p > o; o++) n[a[o]] || (m = !0);
            else m = !0;
            m && j.push(d[k])
        }
        j.length ? N.sync._fetch(j, c, function (c, d) {
            var e = a.length * j.length;
            Y.each(a, function (a, c) {
                U.ns.namespaces.indexOf(c) < 0 && U.ns.namespaces.push(c), Y.each(j, function (a, f) {
                    O[f] = O[f] || {}, O[f][c] = d[f][c], e--, 0 === e && b && (U.useLocalStorage &&
                        N.sync._storeLocal(O), b())
                })
            })
        }) : b && b()
    }

    function s(a, b, c) {
        return "function" == typeof b ? (c = b, b = {}) : b || (b = {}), b.lng = a, g(b, c)
    }

    function t() {
        return L
    }

    function u() {
        var a = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy",
            "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl",
            "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ur",
            "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam"];
        return a.some(function (a) {
            return new RegExp("^" + a).test(L)
        }) ? "rtl" : "ltr"
    }

    function v(a) {
        O = {}, s(L, a)
    }

    function w() {
        window.i18next = window.i18n, T ? window.i18n = T : delete window.i18n
    }

    function x() {
        function a(a, b, c) {
            if (0 !== b.length) {
                var d = "text";
                if (0 === b.indexOf("[")) {
                    var e = b.split("]");
                    b = e[1], d = e[0].substr(1, e[0].length - 1)
                }
                b.indexOf(";") === b.length - 1 && (b = b.substr(0, b.length - 2));
                var f;
                if ("html" === d) f = U.defaultValueFromContent ? M.extend({
                    defaultValue: a.html()
                }, c) : c, a.html(M.t(b, f));
                else if ("text" === d) f = U.defaultValueFromContent ? M.extend({
                    defaultValue: a.text()
                }, c) : c, a.text(M.t(b, f));
                else if ("prepend" === d) f = U.defaultValueFromContent ? M.extend({
                    defaultValue: a.html()
                }, c) : c, a.prepend(M.t(b, f));
                else if ("append" === d) f = U.defaultValueFromContent ? M.extend({
                    defaultValue: a.html()
                }, c) : c, a.append(M.t(b, f));
                else if (0 === d.indexOf("data-")) {
                    var g = d.substr("data-".length);
                    f = U.defaultValueFromContent ? M.extend({
                        defaultValue: a.data(g)
                    }, c) : c;
                    var h = M.t(b, f);
                    a.data(g, h), a.attr(d, h)
                } else f = U.defaultValueFromContent ? M.extend({
                    defaultValue: a.attr(d)
                }, c) : c, a.attr(d, M.t(b, f))
            }
        }

        function b(b, c) {
            var d = b.attr(U.selectorAttr);
            if (d || "undefined" == typeof d || d === !1 || (d = b.text() || b.val()), d) {
                var e = b,
                    f = b.data("i18n-target");
                if (f && (e = b.find(f) || b), c || U.useDataAttrOptions !== !0 || (c = b.data("i18n-options")), c = c ||
                    {}, d.indexOf(";") >= 0) {
                    var g = d.split(";");
                    M.each(g, function (b, d) {
                        "" !== d && a(e, d, c)
                    })
                } else a(e, d, c);
                if (U.useDataAttrOptions === !0) {
                    var h = M.extend({
                        lng: "non",
                        lngs: [],
                        _origLng: "non"
                    }, c);
                    delete h.lng, delete h.lngs, delete h._origLng, b.data("i18n-options", h)
                }
            }
        }
        M.t = M.t || F, M.fn.i18n = function (a) {
            return this.each(function () {
                b(M(this), a);
                var c = M(this).find("[" + U.selectorAttr + "]");
                c.each(function () {
                    b(M(this), a)
                })
            })
        }
    }

    function y() {
        function a(a, b, c) {
            if (0 !== b.length) {
                var d = "text";
                if (0 === b.indexOf("[")) {
                    var e = b.split("]");
                    b = e[1], d = e[0].substr(1, e[0].length - 1)
                }
                b.indexOf(";") === b.length - 1 && (b = b.substr(0, b.length - 2)), "html" === d ? a.innerHTML = F(b, c) :
                    "text" === d ? a.textContent = F(b, c) : "prepend" === d ? a.insertAdjacentHTML(F(b, c),
                        "afterbegin") : "append" === d ? a.insertAdjacentHTML(F(b, c), "beforeend") : a.setAttribute(d,
                        F(b, c))
            }
        }

        function b(b, c) {
            var d = b.getAttribute(U.selectorAttr);
            if (d || "undefined" == typeof d || d === !1 || (d = b.textContent || b.value), d) {
                var e = b,
                    f = b.getAttribute("i18n-target");
                if (f && (e = b.querySelector(f) || b), d.indexOf(";") >= 0)
                    for (var g = d.split(";"), h = 0, i = g.length; i > h; h++) "" !== g[h] && a(e, g[h], c);
                else a(e, d, c)
            }
        }
        N.translateObject = function (a, c) {
            for (var d = a.querySelectorAll("[" + U.selectorAttr + "]"), e = 0, f = d.length; f > e; e++) b(d[e], c)
        }
    }

    function z(a, b, c, d) {
        if (!a) return a;
        if (d = d || b, a.indexOf(d.interpolationPrefix || U.interpolationPrefix) < 0) return a;
        var e = d.interpolationPrefix ? Y.regexEscape(d.interpolationPrefix) : U.interpolationPrefixEscaped,
            f = d.interpolationSuffix ? Y.regexEscape(d.interpolationSuffix) : U.interpolationSuffixEscaped,
            g = d.keyseparator || U.keyseparator,
            h = b.replace && "object" == typeof b.replace ? b.replace : b,
            i = new RegExp([e, "(.+?)", "(HTML)?", f].join(""), "g"),
            j = d.escapeInterpolation || U.escapeInterpolation;
        return a.replace(i, function (a, b, c) {
            for (var d = h, e = b; e.indexOf(g) >= 0 && "object" == typeof d && d;) {
                var f = e.slice(0, e.indexOf(g));
                e = e.slice(e.indexOf(g) + 1), d = d[f]
            }
            if (d && "object" == typeof d && d.hasOwnProperty(e)) {
                {
                    d[e]
                }
                return j && !c ? Y.escape(d[e]) : d[e]
            }
            return a
        })
    }

    function A(a, b) {
        var c = ",",
            d = "{",
            e = "}",
            f = Y.extend({}, b);
        for (delete f.postProcess, delete f.isFallbackLookup; - 1 != a.indexOf(U.reusePrefix) && (P++, !(P > U.maxRecursion));) {
            var g = a.lastIndexOf(U.reusePrefix),
                h = a.indexOf(U.reuseSuffix, g) + U.reuseSuffix.length,
                i = a.substring(g, h),
                j = i.replace(U.reusePrefix, "").replace(U.reuseSuffix, "");
            if (g >= h) return Y.error("there is an missing closing in following translation value", a), "";
            if (-1 != j.indexOf(c)) {
                var k = j.indexOf(c);
                if (-1 != j.indexOf(d, k) && -1 != j.indexOf(e, k)) {
                    var l = j.indexOf(d, k),
                        m = j.indexOf(e, l) + e.length;
                    try {
                        f = Y.extend(f, JSON.parse(j.substring(l, m))), j = j.substring(0, k)
                    } catch (n) {}
                }
            }
            var o = I(j, f);
            a = a.replace(i, Y.regexReplacementEscape(o))
        }
        return a
    }

    function B(a) {
        return a.context && ("string" == typeof a.context || "number" == typeof a.context)
    }

    function C(a) {
        return void 0 !== a.count && "string" != typeof a.count
    }

    function D(a) {
        return void 0 !== a.indefinite_article && "string" != typeof a.indefinite_article && a.indefinite_article
    }

    function E(a, b) {
        b = b || {};
        var c = G(a, b),
            d = J(a, b);
        return void 0 !== d || d === c
    }

    function F(a, b) {
        return R ? (P = 0, I.apply(null, arguments)) : (Y.log(
            "i18next not finished initialization. you might have called t function before loading resources finished."
        ), b && b.defaultValue ? b.detaultValue : "")
    }

    function G(a, b) {
        return void 0 !== b.defaultValue ? b.defaultValue : a
    }

    function H() {
        for (var a = [], b = 1; b < arguments.length; b++) a.push(arguments[b]);
        return {
            postProcess: "sprintf",
            sprintf: a
        }
    }

    function I(a, b) {
        if ("undefined" != typeof b && "object" != typeof b ? "sprintf" === U.shortcutFunction ? b = H.apply(null,
                arguments) : "defaultValue" === U.shortcutFunction && (b = {
                defaultValue: b
            }) : b = b || {}, "object" == typeof U.defaultVariables && (b = Y.extend({}, U.defaultVariables, b)), void 0 ===
            a || null === a || "" === a) return "";
        "number" == typeof a && (a = String(a)), "string" == typeof a && (a = [a]);
        var c = a[0];
        if (a.length > 1)
            for (var d = 0; d < a.length && (c = a[d], !E(c, b)); d++);
        var e, f = G(c, b),
            g = J(c, b),
            h = b.nsseparator || U.nsseparator,
            i = b.lng ? Y.toLanguages(b.lng, b.fallbackLng) : Q,
            j = b.ns || U.ns.defaultNs;
        c.indexOf(h) > -1 && (e = c.split(h), j = e[0], c = e[1]), void 0 === g && U.sendMissing && "function" ==
            typeof U.missingKeyHandler && (b.lng ? U.missingKeyHandler(i[0], j, c, f, i) : U.missingKeyHandler(U.lng, j,
                c, f, i));
        var k, l, m;
        if (k = "string" == typeof U.postProcess && "" !== U.postProcess ? [U.postProcess] : "array" == typeof U.postProcess ||
            "object" == typeof U.postProcess ? U.postProcess : [], "string" == typeof b.postProcess && "" !== b.postProcess ?
            k = k.concat([b.postProcess]) : ("array" == typeof b.postProcess || "object" == typeof b.postProcess) && (k =
                k.concat(b.postProcess)), void 0 !== g && k.length)
            for (m = 0; m < k.length; m += 1) l = k[m], aa[l] && (g = aa[l](g, c, b));
        var n = f;
        if (f.indexOf(h) > -1 && (e = f.split(h), n = e[1]), n === c && U.parseMissingKey && (f = U.parseMissingKey(f)),
            void 0 === g && (f = z(f, b), f = A(f, b), k.length))
            for (g = G(c, b), m = 0; m < k.length; m += 1) l = k[m], aa[l] && (g = aa[l](g, c, b));
        return void 0 !== g ? g : f
    }

    function J(a, b) {
        b = b || {};
        var c, d, e = G(a, b),
            f = Q;
        if (!O) return e;
        if ("cimode" === f[0].toLowerCase()) return e;
        if (b.lngs && (f = b.lngs), b.lng && (f = Y.toLanguages(b.lng, b.fallbackLng), !O[f[0]])) {
            var g = U.getAsync;
            U.getAsync = !1, N.sync.load(f, U, function (a, b) {
                Y.extend(O, b), U.getAsync = g
            })
        }
        var h = b.ns || U.ns.defaultNs,
            i = b.nsseparator || U.nsseparator;
        if (a.indexOf(i) > -1) {
            var j = a.split(i);
            h = j[0], a = j[1]
        }
        if (B(b)) {
            c = Y.extend({}, b), delete c.context, c.defaultValue = U.contextNotFound;
            var k = h + i + a + "_" + b.context;
            if (d = F(k, c), d != U.contextNotFound) return z(d, {
                context: b.context
            })
        }
        if (C(b, f[0])) {
            c = Y.extend({
                lngs: [f[0]]
            }, b), delete c.count, c._origLng = c._origLng || c.lng || f[0], delete c.lng, c.defaultValue = U.pluralNotFound;
            var l;
            if (_.needsPlural(f[0], b.count)) {
                l = h + i + a + U.pluralSuffix;
                var m = _.get(f[0], b.count);
                m >= 0 ? l = l + "_" + m : 1 === m && (l = h + i + a)
            } else l = h + i + a;
            if (d = F(l, c), d != U.pluralNotFound) return z(d, {
                count: b.count,
                interpolationPrefix: b.interpolationPrefix,
                interpolationSuffix: b.interpolationSuffix
            });
            if (!(f.length > 1)) return c.lng = c._origLng, delete c._origLng, d = F(h + i + a, c), z(d, {
                count: b.count,
                interpolationPrefix: b.interpolationPrefix,
                interpolationSuffix: b.interpolationSuffix
            });
            var n = f.slice();
            if (n.shift(), b = Y.extend(b, {
                    lngs: n
                }), b._origLng = c._origLng, delete b.lng, d = F(h + i + a, b), d != U.pluralNotFound) return d
        }
        if (D(b)) {
            var o = Y.extend({}, b);
            delete o.indefinite_article, o.defaultValue = U.indefiniteNotFound;
            var p = h + i + a + (b.count && !C(b, f[0]) || !b.count ? U.indefiniteSuffix : "");
            if (d = F(p, o), d != U.indefiniteNotFound) return d
        }
        for (var q, r = b.keyseparator || U.keyseparator, s = a.split(r), t = 0, u = f.length; u > t && void 0 === q; t++) {
            for (var v = f[t], w = 0, x = O[v] && O[v][h]; s[w];) x = x && x[s[w]], w++;
            if (void 0 !== x && (!U.showKeyIfEmpty || "" !== x)) {
                var y = Object.prototype.toString.apply(x);
                if ("string" == typeof x) x = z(x, b), x = A(x, b);
                else if ("[object Array]" !== y || U.returnObjectTrees || b.returnObjectTrees) {
                    if (null === x && U.fallbackOnNull === !0) x = void 0;
                    else if (null !== x)
                        if (U.returnObjectTrees || b.returnObjectTrees) {
                            if ("[object Number]" !== y && "[object Function]" !== y && "[object RegExp]" !== y) {
                                var E = "[object Array]" === y ? [] : {};
                                Y.each(x, function (c) {
                                    E[c] = I(h + i + a + r + c, b)
                                }), x = E
                            }
                        } else U.objectTreeKeyHandler && "function" == typeof U.objectTreeKeyHandler ? x = U.objectTreeKeyHandler(
                            a, x, v, h, b) : (x = "key '" + h + ":" + a + " (" + v +
                            ")' returned an object instead of string.", Y.log(x))
                } else x = x.join("\n"), x = z(x, b), x = A(x, b);
                "string" == typeof x && "" === x.trim() && U.fallbackOnEmpty === !0 && (x = void 0), q = x
            }
        }
        if (void 0 === q && !b.isFallbackLookup && (U.fallbackToDefaultNS === !0 || U.fallbackNS && U.fallbackNS.length >
                0)) {
            if (b.isFallbackLookup = !0, U.fallbackNS.length) {
                for (var H = 0, K = U.fallbackNS.length; K > H; H++)
                    if (q = J(U.fallbackNS[H] + i + a, b), q || "" === q && U.fallbackOnEmpty === !1) {
                        var L = q.indexOf(i) > -1 ? q.split(i)[1] : q,
                            M = e.indexOf(i) > -1 ? e.split(i)[1] : e;
                        if (L !== M) break
                    }
            } else b.ns = U.ns.defaultNs, q = J(a, b);
            b.isFallbackLookup = !1
        }
        return q
    }

    function K() {
        var a, b = U.lngWhitelist || [],
            c = [];
        if ("undefined" != typeof window && ! function () {
                for (var a = window.location.search.substring(1), b = a.split("&"), d = 0; d < b.length; d++) {
                    var e = b[d].indexOf("=");
                    if (e > 0) {
                        var f = b[d].substring(0, e);
                        f == U.detectLngQS && c.push(b[d].substring(e + 1))
                    }
                }
            }(), U.useCookie && "undefined" != typeof document) {
            var d = Y.cookie.read(U.cookieName);
            d && c.push(d)
        }
        if (U.detectLngFromLocalStorage && "undefined" != typeof window && window.localStorage) {
            var e = Y.localStorage.getItem("i18next_lng");
            e && c.push(e)
        }
        if ("undefined" != typeof navigator) {
            if (navigator.languages)
                for (var f = 0; f < navigator.languages.length; f++) c.push(navigator.languages[f]);
            navigator.userLanguage && c.push(navigator.userLanguage), navigator.language && c.push(navigator.language)
        }
        return function () {
            for (var d = 0; d < c.length; d++) {
                var e = c[d];
                if (e.indexOf("-") > -1) {
                    var f = e.split("-");
                    e = U.lowerCaseLng ? f[0].toLowerCase() + "-" + f[1].toLowerCase() : f[0].toLowerCase() + "-" +
                        f[1].toUpperCase()
                }
                if (0 === b.length || b.indexOf(e) > -1) {
                    a = e;
                    break
                }
            }
        }(), a || (a = U.fallbackLng[0]), a
    }
    Array.prototype.indexOf || (Array.prototype.indexOf = function (a) {
        "use strict";
        if (null == this) throw new TypeError;
        var b = Object(this),
            c = b.length >>> 0;
        if (0 === c) return -1;
        var d = 0;
        if (arguments.length > 0 && (d = Number(arguments[1]), d != d ? d = 0 : 0 != d && d != 1 / 0 && d != -(
                1 / 0) && (d = (d > 0 || -1) * Math.floor(Math.abs(d)))), d >= c) return -1;
        for (var e = d >= 0 ? d : Math.max(c - Math.abs(d), 0); c > e; e++)
            if (e in b && b[e] === a) return e;
        return -1
    }), Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function (a) {
        "use strict";
        if (null == this) throw new TypeError;
        var b = Object(this),
            c = b.length >>> 0;
        if (0 === c) return -1;
        var d = c;
        arguments.length > 1 && (d = Number(arguments[1]), d != d ? d = 0 : 0 != d && d != 1 / 0 && d != -(1 /
            0) && (d = (d > 0 || -1) * Math.floor(Math.abs(d))));
        for (var e = d >= 0 ? Math.min(d, c - 1) : c - Math.abs(d); e >= 0; e--)
            if (e in b && b[e] === a) return e;
        return -1
    }), "function" != typeof String.prototype.trim && (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "")
    });
    var L, M = a.jQuery || a.Zepto,
        N = {},
        O = {},
        P = 0,
        Q = [],
        R = !1,
        S = {},
        T = null;
    "undefined" != typeof module && module.exports ? module.exports = N : (M && (M.i18n = M.i18n || N), a.i18n && (T =
        a.i18n), a.i18n = N), S = {
        load: function (a, b, c) {
            b.useLocalStorage ? S._loadLocal(a, b, function (d, e) {
                for (var f = [], g = 0, h = a.length; h > g; g++) e[a[g]] || f.push(a[g]);
                f.length > 0 ? S._fetch(f, b, function (a, b) {
                    Y.extend(e, b), S._storeLocal(b), c(a, e)
                }) : c(d, e)
            }) : S._fetch(a, b, function (a, b) {
                c(a, b)
            })
        },
        _loadLocal: function (a, b, c) {
            var d = {},
                e = (new Date).getTime();
            if (window.localStorage) {
                var f = a.length;
                Y.each(a, function (a, g) {
                    var h = Y.localStorage.getItem("res_" + g);
                    h && (h = JSON.parse(h), h.i18nStamp && h.i18nStamp + b.localStorageExpirationTime >
                        e && (d[g] = h)), f--, 0 === f && c(null, d)
                })
            }
        },
        _storeLocal: function (a) {
            if (window.localStorage)
                for (var b in a) a[b].i18nStamp = (new Date).getTime(), Y.localStorage.setItem("res_" + b, JSON
                    .stringify(a[b]))
        },
        _fetch: function (a, b, c) {
            var d = b.ns,
                e = {};
            if (b.dynamicLoad) {
                var f = function (a, b) {
                    c(a, b)
                };
                if ("function" == typeof b.customLoad) b.customLoad(a, d.namespaces, b, f);
                else {
                    var g = z(b.resGetPath, {
                        lng: a.join("+"),
                        ns: d.namespaces.join("+")
                    });
                    Y.ajax({
                        url: g,
                        cache: b.cache,
                        success: function (a) {
                            Y.log("loaded: " + g), f(null, a)
                        },
                        error: function (a, b, c) {
                            Y.log("failed loading: " + g), f("failed loading resource.json error: " +
                                c)
                        },
                        dataType: "json",
                        async: b.getAsync,
                        timeout: b.ajaxTimeout
                    })
                }
            } else {
                var h, i = d.namespaces.length * a.length;
                Y.each(d.namespaces, function (d, f) {
                    Y.each(a, function (a, d) {
                        var g = function (a, b) {
                            a && (h = h || [], h.push(a)), e[d] = e[d] || {}, e[d][f] = b,
                                i--, 0 === i && c(h, e)
                        };
                        "function" == typeof b.customLoad ? b.customLoad(d, f, b, g) : S._fetchOne(
                            d, f, b, g)
                    })
                })
            }
        },
        _fetchOne: function (a, b, c, d) {
            var e = z(c.resGetPath, {
                lng: a,
                ns: b
            });
            Y.ajax({
                url: e,
                cache: c.cache,
                success: function (a) {
                    Y.log("loaded: " + e), d(null, a)
                },
                error: function (a, b, c) {
                    if (b && 200 == b || a && a.status && 200 == a.status) Y.error(
                        "There is a typo in: " + e);
                    else if (b && 404 == b || a && a.status && 404 == a.status) Y.log(
                        "Does not exist: " + e);
                    else {
                        var f = b ? b : a && a.status ? a.status : null;
                        Y.log(f + " when loading " + e)
                    }
                    d(c, {})
                },
                dataType: "json",
                async: c.getAsync,
                timeout: c.ajaxTimeout,
                headers: c.headers
            })
        },
        postMissing: function (a, b, c, d, e) {
            var f = {};
            f[c] = d;
            var g = [];
            if ("fallback" === U.sendMissingTo && U.fallbackLng[0] !== !1)
                for (var h = 0; h < U.fallbackLng.length; h++) g.push({
                    lng: U.fallbackLng[h],
                    url: z(U.resPostPath, {
                        lng: U.fallbackLng[h],
                        ns: b
                    })
                });
            else if ("current" === U.sendMissingTo || "fallback" === U.sendMissingTo && U.fallbackLng[0] === !1)
                g.push({
                    lng: a,
                    url: z(U.resPostPath, {
                        lng: a,
                        ns: b
                    })
                });
            else if ("all" === U.sendMissingTo)
                for (var h = 0, i = e.length; i > h; h++) g.push({
                    lng: e[h],
                    url: z(U.resPostPath, {
                        lng: e[h],
                        ns: b
                    })
                });
            for (var j = 0, k = g.length; k > j; j++) {
                var l = g[j];
                Y.ajax({
                    url: l.url,
                    type: U.sendType,
                    data: f,
                    success: function () {
                        Y.log("posted missing key '" + c + "' to: " + l.url);
                        for (var a = c.split("."), e = 0, f = O[l.lng][b]; a[e];) f = f[a[e]] = e ===
                            a.length - 1 ? d : f[a[e]] || {}, e++
                    },
                    error: function () {
                        Y.log("failed posting missing key '" + c + "' to: " + l.url)
                    },
                    dataType: "json",
                    async: U.postAsync,
                    timeout: U.ajaxTimeout
                })
            }
        },
        reload: v
    };
    var U = {
            lng: void 0,
            load: "all",
            preload: [],
            lowerCaseLng: !1,
            returnObjectTrees: !1,
            fallbackLng: ["dev"],
            fallbackNS: [],
            detectLngQS: "setLng",
            detectLngFromLocalStorage: !1,
            ns: {
                namespaces: ["translation"],
                defaultNs: "translation"
            },
            fallbackOnNull: !0,
            fallbackOnEmpty: !1,
            fallbackToDefaultNS: !1,
            showKeyIfEmpty: !1,
            nsseparator: ":",
            keyseparator: ".",
            selectorAttr: "data-i18n",
            debug: !1,
            resGetPath: "locales/__lng__/__ns__.json",
            resPostPath: "locales/add/__lng__/__ns__",
            getAsync: !0,
            postAsync: !0,
            resStore: void 0,
            useLocalStorage: !1,
            localStorageExpirationTime: 6048e5,
            dynamicLoad: !1,
            sendMissing: !1,
            sendMissingTo: "fallback",
            sendType: "POST",
            interpolationPrefix: "__",
            interpolationSuffix: "__",
            defaultVariables: !1,
            reusePrefix: "$t(",
            reuseSuffix: ")",
            pluralSuffix: "_plural",
            pluralNotFound: ["plural_not_found", Math.random()].join(""),
            contextNotFound: ["context_not_found", Math.random()].join(""),
            escapeInterpolation: !1,
            indefiniteSuffix: "_indefinite",
            indefiniteNotFound: ["indefinite_not_found", Math.random()].join(""),
            setJqueryExt: !0,
            defaultValueFromContent: !0,
            useDataAttrOptions: !1,
            cookieExpirationTime: void 0,
            useCookie: !0,
            cookieName: "i18next",
            cookieDomain: void 0,
            objectTreeKeyHandler: void 0,
            postProcess: void 0,
            parseMissingKey: void 0,
            missingKeyHandler: S.postMissing,
            ajaxTimeout: 0,
            shortcutFunction: "sprintf"
        },
        V = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;"
        },
        W = {
            create: function (a, b, c, d) {
                var e;
                if (c) {
                    var f = new Date;
                    f.setTime(f.getTime() + 60 * c * 1e3), e = "; expires=" + f.toGMTString()
                } else e = "";
                d = d ? "domain=" + d + ";" : "", document.cookie = a + "=" + b + e + ";" + d + "path=/"
            },
            read: function (a) {
                for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
                    for (var e = c[d];
                        " " == e.charAt(0);) e = e.substring(1, e.length);
                    if (0 === e.indexOf(b)) return e.substring(b.length, e.length)
                }
                return null
            },
            remove: function (a) {
                this.create(a, "", -1)
            }
        },
        X = {
            create: function () {},
            read: function () {
                return null
            },
            remove: function () {}
        },
        Y = {
            extend: M ? M.extend : b,
            deepExtend: c,
            each: M ? M.each : d,
            ajax: M ? M.ajax : "undefined" != typeof document ? f : function () {},
            cookie: "undefined" != typeof document ? W : X,
            detectLanguage: K,
            escape: e,
            log: function (a) {
                U.debug && "undefined" != typeof console && console.log(a)
            },
            error: function (a) {
                "undefined" != typeof console && console.error(a)
            },
            getCountyIndexOfLng: function (a) {
                var b = 0;
                return ("nb-NO" === a || "nn-NO" === a || "nb-no" === a || "nn-no" === a) && (b = 1), b
            },
            toLanguages: function (a, b) {
                function c(a) {
                    var b = a;
                    if ("string" == typeof a && a.indexOf("-") > -1) {
                        var c = a.split("-");
                        b = U.lowerCaseLng ? c[0].toLowerCase() + "-" + c[1].toLowerCase() : c[0].toLowerCase() +
                            "-" + c[1].toUpperCase()
                    } else b = U.lowerCaseLng ? a.toLowerCase() : a;
                    return b
                }
                var d = this.log;
                b = b || U.fallbackLng, "string" == typeof b && (b = [b]);
                var e = [],
                    f = U.lngWhitelist || !1,
                    g = function (a) {
                        !f || f.indexOf(a) > -1 ? e.push(a) : d("rejecting non-whitelisted language: " + a)
                    };
                if ("string" == typeof a && a.indexOf("-") > -1) {
                    var h = a.split("-");
                    "unspecific" !== U.load && g(c(a)), "current" !== U.load && g(c(h[this.getCountyIndexOfLng(a)]))
                } else g(c(a));
                for (var i = 0; i < b.length; i++) - 1 === e.indexOf(b[i]) && b[i] && e.push(c(b[i]));
                return e
            },
            regexEscape: function (a) {
                return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            },
            regexReplacementEscape: function (a) {
                return "string" == typeof a ? a.replace(/\$/g, "$$$$") : a
            },
            localStorage: {
                setItem: function (a, b) {
                    if (window.localStorage) try {
                        window.localStorage.setItem(a, b)
                    } catch (c) {
                        Y.log('failed to set value for key "' + a + '" to localStorage.')
                    }
                },
                getItem: function (a, b) {
                    if (window.localStorage) try {
                        return window.localStorage.getItem(a, b)
                    } catch (c) {
                        return void Y.log('failed to get value for key "' + a + '" from localStorage.')
                    }
                }
            }
        };
    Y.applyReplacement = z;
    var Z = [["ach", "Acholi", [1, 2], 1], ["af", "Afrikaans", [1, 2], 2], ["ak", "Akan", [1, 2], 1], ["am", "Amharic",
                [1, 2], 1], ["an", "Aragonese", [1, 2], 2], ["ar", "Arabic", [0, 1, 2, 3, 11, 100], 5], ["arn",
                "Mapudungun", [1, 2], 1], ["ast", "Asturian", [1, 2], 2], ["ay", "Aymará", [1], 3], ["az",
                "Azerbaijani", [1, 2], 2], ["be", "Belarusian", [1, 2, 5], 4], ["bg", "Bulgarian", [1, 2], 2], ["bn",
                "Bengali", [1, 2], 2], ["bo", "Tibetan", [1], 3], ["br", "Breton", [1, 2], 1], ["bs", "Bosnian", [1, 2,
                5], 4], ["ca", "Catalan", [1, 2], 2], ["cgg", "Chiga", [1], 3], ["cs", "Czech", [1, 2, 5], 6], ["csb",
                "Kashubian", [1, 2, 5], 7], ["cy", "Welsh", [1, 2, 3, 8], 8], ["da", "Danish", [1, 2], 2], ["de",
                "German", [1, 2], 2], ["dev", "Development Fallback", [1, 2], 2], ["dz", "Dzongkha", [1], 3], ["el",
                "Greek", [1, 2], 2], ["en", "English", [1, 2], 2], ["eo", "Esperanto", [1, 2], 2], ["es", "Spanish", [1,
                2], 2], ["es_ar", "Argentinean Spanish", [1, 2], 2], ["et", "Estonian", [1, 2], 2], ["eu", "Basque", [1,
                2], 2], ["fa", "Persian", [1], 3], ["fi", "Finnish", [1, 2], 2], ["fil", "Filipino", [1, 2], 1], ["fo",
                "Faroese", [1, 2], 2], ["fr", "French", [1, 2], 9], ["fur", "Friulian", [1, 2], 2], ["fy", "Frisian", [
                1, 2], 2], ["ga", "Irish", [1, 2, 3, 7, 11], 10], ["gd", "Scottish Gaelic", [1, 2, 3, 20], 11], ["gl",
                "Galician", [1, 2], 2], ["gu", "Gujarati", [1, 2], 2], ["gun", "Gun", [1, 2], 1], ["ha", "Hausa", [1, 2],
                2], ["he", "Hebrew", [1, 2], 2], ["hi", "Hindi", [1, 2], 2], ["hr", "Croatian", [1, 2, 5], 4], ["hu",
                "Hungarian", [1, 2], 2], ["hy", "Armenian", [1, 2], 2], ["ia", "Interlingua", [1, 2], 2], ["id",
                "Indonesian", [1], 3], ["is", "Icelandic", [1, 2], 12], ["it", "Italian", [1, 2], 2], ["ja", "Japanese",
                [1], 3], ["jbo", "Lojban", [1], 3], ["jv", "Javanese", [0, 1], 13], ["ka", "Georgian", [1], 3], ["kk",
                "Kazakh", [1], 3], ["km", "Khmer", [1], 3], ["kn", "Kannada", [1, 2], 2], ["ko", "Korean", [1], 3], [
                "ku", "Kurdish", [1, 2], 2], ["kw", "Cornish", [1, 2, 3, 4], 14], ["ky", "Kyrgyz", [1], 3], ["lb",
                "Letzeburgesch", [1, 2], 2], ["ln", "Lingala", [1, 2], 1], ["lo", "Lao", [1], 3], ["lt", "Lithuanian",
                [1, 2, 10], 15], ["lv", "Latvian", [1, 2, 0], 16], ["mai", "Maithili", [1, 2], 2], ["mfe",
                "Mauritian Creole", [1, 2], 1], ["mg", "Malagasy", [1, 2], 1], ["mi", "Maori", [1, 2], 1], ["mk",
                "Macedonian", [1, 2], 17], ["ml", "Malayalam", [1, 2], 2], ["mn", "Mongolian", [1, 2], 2], ["mnk",
                "Mandinka", [0, 1, 2], 18], ["mr", "Marathi", [1, 2], 2], ["ms", "Malay", [1], 3], ["mt", "Maltese", [1,
                2, 11, 20], 19], ["nah", "Nahuatl", [1, 2], 2], ["nap", "Neapolitan", [1, 2], 2], ["nb",
                "Norwegian Bokmal", [1, 2], 2], ["ne", "Nepali", [1, 2], 2], ["nl", "Dutch", [1, 2], 2], ["nn",
                "Norwegian Nynorsk", [1, 2], 2], ["no", "Norwegian", [1, 2], 2], ["nso", "Northern Sotho", [1, 2], 2],
            ["oc", "Occitan", [1, 2], 1], ["or", "Oriya", [2, 1], 2], ["pa", "Punjabi", [1, 2], 2], ["pap",
                "Papiamento", [1, 2], 2], ["pl", "Polish", [1, 2, 5], 7], ["pms", "Piemontese", [1, 2], 2], ["ps",
                "Pashto", [1, 2], 2], ["pt", "Portuguese", [1, 2], 2], ["pt_br", "Brazilian Portuguese", [1, 2], 2], [
                "rm", "Romansh", [1, 2], 2], ["ro", "Romanian", [1, 2, 20], 20], ["ru", "Russian", [1, 2, 5], 4], [
                "sah", "Yakut", [1], 3], ["sco", "Scots", [1, 2], 2], ["se", "Northern Sami", [1, 2], 2], ["si",
                "Sinhala", [1, 2], 2], ["sk", "Slovak", [1, 2, 5], 6], ["sl", "Slovenian", [5, 1, 2, 3], 21], ["so",
                "Somali", [1, 2], 2], ["son", "Songhay", [1, 2], 2], ["sq", "Albanian", [1, 2], 2], ["sr", "Serbian", [
                1, 2, 5], 4], ["su", "Sundanese", [1], 3], ["sv", "Swedish", [1, 2], 2], ["sw", "Swahili", [1, 2], 2],
            ["ta", "Tamil", [1, 2], 2], ["te", "Telugu", [1, 2], 2], ["tg", "Tajik", [1, 2], 1], ["th", "Thai", [1], 3],
            ["ti", "Tigrinya", [1, 2], 1], ["tk", "Turkmen", [1, 2], 2], ["tr", "Turkish", [1, 2], 1], ["tt", "Tatar",
                [1], 3], ["ug", "Uyghur", [1], 3], ["uk", "Ukrainian", [1, 2, 5], 4], ["ur", "Urdu", [1, 2], 2], ["uz",
                "Uzbek", [1, 2], 1], ["vi", "Vietnamese", [1], 3], ["wa", "Walloon", [1, 2], 1], ["wo", "Wolof", [1], 3],
            ["yo", "Yoruba", [1, 2], 2], ["zh", "Chinese", [1], 3]],
        $ = {
            1: function (a) {
                return Number(a > 1)
            },
            2: function (a) {
                return Number(1 != a)
            },
            3: function () {
                return 0
            },
            4: function (a) {
                return Number(a % 10 == 1 && a % 100 != 11 ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a %
                    100 >= 20) ? 1 : 2)
            },
            5: function (a) {
                return Number(0 === a ? 0 : 1 == a ? 1 : 2 == a ? 2 : a % 100 >= 3 && 10 >= a % 100 ? 3 : a % 100 >=
                    11 ? 4 : 5)
            },
            6: function (a) {
                return Number(1 == a ? 0 : a >= 2 && 4 >= a ? 1 : 2)
            },
            7: function (a) {
                return Number(1 == a ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2)
            },
            8: function (a) {
                return Number(1 == a ? 0 : 2 == a ? 1 : 8 != a && 11 != a ? 2 : 3)
            },
            9: function (a) {
                return Number(a >= 2)
            },
            10: function (a) {
                return Number(1 == a ? 0 : 2 == a ? 1 : 7 > a ? 2 : 11 > a ? 3 : 4)
            },
            11: function (a) {
                return Number(1 == a || 11 == a ? 0 : 2 == a || 12 == a ? 1 : a > 2 && 20 > a ? 2 : 3)
            },
            12: function (a) {
                return Number(a % 10 != 1 || a % 100 == 11)
            },
            13: function (a) {
                return Number(0 !== a)
            },
            14: function (a) {
                return Number(1 == a ? 0 : 2 == a ? 1 : 3 == a ? 2 : 3)
            },
            15: function (a) {
                return Number(a % 10 == 1 && a % 100 != 11 ? 0 : a % 10 >= 2 && (10 > a % 100 || a % 100 >= 20) ? 1 :
                    2)
            },
            16: function (a) {
                return Number(a % 10 == 1 && a % 100 != 11 ? 0 : 0 !== a ? 1 : 2)
            },
            17: function (a) {
                return Number(1 == a || a % 10 == 1 ? 0 : 1)
            },
            18: function (a) {
                return Number(0 == a ? 0 : 1 == a ? 1 : 2)
            },
            19: function (a) {
                return Number(1 == a ? 0 : 0 === a || a % 100 > 1 && 11 > a % 100 ? 1 : a % 100 > 10 && 20 > a %
                    100 ? 2 : 3)
            },
            20: function (a) {
                return Number(1 == a ? 0 : 0 === a || a % 100 > 0 && 20 > a % 100 ? 1 : 2)
            },
            21: function (a) {
                return Number(a % 100 == 1 ? 1 : a % 100 == 2 ? 2 : a % 100 == 3 || a % 100 == 4 ? 3 : 0)
            }
        },
        _ = {
            rules: function () {
                var a, b = {};
                for (a = Z.length; a--;) b[Z[a][0]] = {
                    name: Z[a][1],
                    numbers: Z[a][2],
                    plurals: $[Z[a][3]]
                };
                return b
            }(),
            addRule: function (a, b) {
                _.rules[a] = b
            },
            setCurrentLng: function (a) {
                if (!_.currentRule || _.currentRule.lng !== a) {
                    var b = a.split("-");
                    _.currentRule = {
                        lng: a,
                        rule: _.rules[b[0]]
                    }
                }
            },
            needsPlural: function (a, b) {
                var c, d = a.split("-");
                return c = _.currentRule && _.currentRule.lng === a ? _.currentRule.rule : _.rules[d[Y.getCountyIndexOfLng(
                    a)]], c && c.numbers.length <= 1 ? !1 : 1 !== this.get(a, b)
            },
            get: function (a, b) {
                function c(b, c) {
                    var d;
                    if (d = _.currentRule && _.currentRule.lng === a ? _.currentRule.rule : _.rules[b]) {
                        var e;
                        e = d.plurals(d.noAbs ? c : Math.abs(c));
                        var f = d.numbers[e];
                        return 2 === d.numbers.length && 1 === d.numbers[0] && (2 === f ? f = -1 : 1 === f && (f =
                            1)), f
                    }
                    return 1 === c ? "1" : "-1"
                }
                var d = a.split("-");
                return c(d[Y.getCountyIndexOfLng(a)], b)
            }
        },
        aa = {},
        ba = function (a, b) {
            aa[a] = b
        },
        ca = function () {
            function a(a) {
                return Object.prototype.toString.call(a).slice(8, -1).toLowerCase()
            }

            function b(a, b) {
                for (var c = []; b > 0; c[--b] = a);
                return c.join("")
            }
            var c = function () {
                return c.cache.hasOwnProperty(arguments[0]) || (c.cache[arguments[0]] = c.parse(arguments[0])), c.format
                    .call(null, c.cache[arguments[0]], arguments)
            };
            return c.format = function (c, d) {
                var e, f, g, h, i, j, k, l = 1,
                    m = c.length,
                    n = "",
                    o = [];
                for (f = 0; m > f; f++)
                    if (n = a(c[f]), "string" === n) o.push(c[f]);
                    else if ("array" === n) {
                    if (h = c[f], h[2])
                        for (e = d[l], g = 0; g < h[2].length; g++) {
                            if (!e.hasOwnProperty(h[2][g])) throw ca('[sprintf] property "%s" does not exist', h[2]
                                [g]);
                            e = e[h[2][g]]
                        } else e = h[1] ? d[h[1]] : d[l++];
                    if (/[^s]/.test(h[8]) && "number" != a(e)) throw ca("[sprintf] expecting number but found %s",
                        a(e));
                    switch (h[8]) {
                        case "b":
                            e = e.toString(2);
                            break;
                        case "c":
                            e = String.fromCharCode(e);
                            break;
                        case "d":
                            e = parseInt(e, 10);
                            break;
                        case "e":
                            e = h[7] ? e.toExponential(h[7]) : e.toExponential();
                            break;
                        case "f":
                            e = h[7] ? parseFloat(e).toFixed(h[7]) : parseFloat(e);
                            break;
                        case "o":
                            e = e.toString(8);
                            break;
                        case "s":
                            e = (e = String(e)) && h[7] ? e.substring(0, h[7]) : e;
                            break;
                        case "u":
                            e = Math.abs(e);
                            break;
                        case "x":
                            e = e.toString(16);
                            break;
                        case "X":
                            e = e.toString(16).toUpperCase()
                    }
                    e = /[def]/.test(h[8]) && h[3] && e >= 0 ? "+" + e : e, j = h[4] ? "0" == h[4] ? "0" : h[4].charAt(
                        1) : " ", k = h[6] - String(e).length, i = h[6] ? b(j, k) : "", o.push(h[5] ? e + i : i +
                        e)
                }
                return o.join("")
            }, c.cache = {}, c.parse = function (a) {
                for (var b = a, c = [], d = [], e = 0; b;) {
                    if (null !== (c = /^[^\x25]+/.exec(b))) d.push(c[0]);
                    else if (null !== (c = /^\x25{2}/.exec(b))) d.push("%");
                    else {
                        if (null === (c =
                                /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/
                                .exec(b))) throw "[sprintf] huh?";

                        if (c[2]) {
                            e |= 1;
                            var f = [],
                                g = c[2],
                                h = [];
                            if (null === (h = /^([a-z_][a-z_\d]*)/i.exec(g))) throw "[sprintf] huh?";
                            for (f.push(h[1]);
                                "" !== (g = g.substring(h[0].length));)
                                if (null !== (h = /^\.([a-z_][a-z_\d]*)/i.exec(g))) f.push(h[1]);
                                else {
                                    if (null === (h = /^\[(\d+)\]/.exec(g))) throw "[sprintf] huh?";
                                    f.push(h[1])
                                } c[2] = f
                        } else e |= 2;
                        if (3 === e) throw "[sprintf] mixing positional and named placeholders is not (yet) supported";
                        d.push(c)
                    }
                    b = b.substring(c[0].length)
                }
                return d
            }, c
        }(),
        da = function (a, b) {
            return b.unshift(a), ca.apply(null, b)
        };
    ba("sprintf", function (a, b, c) {
            return c.sprintf ? "[object Array]" === Object.prototype.toString.apply(c.sprintf) ? da(a, c.sprintf) :
                "object" == typeof c.sprintf ? ca(a, c.sprintf) : a : a
        }), N.init = g, N.isInitialized = h, N.setLng = s, N.preload = i, N.addResourceBundle = j, N.hasResourceBundle =
        k, N.getResourceBundle = l, N.addResource = n, N.addResources = o, N.removeResourceBundle = m, N.loadNamespace =
        q, N.loadNamespaces = r, N.setDefaultNamespace = p, N.t = F, N.translate = F, N.exists = E, N.detectLanguage =
        Y.detectLanguage, N.pluralExtensions = _, N.sync = S, N.functions = Y, N.lng = t, N.dir = u, N.addPostProcessor =
        ba, N.applyReplacement = Y.applyReplacement, N.options = U, N.noConflict = w
}("undefined" == typeof exports ? window : exports);