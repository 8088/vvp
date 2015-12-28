/**
 * 外部接口入口
 * Copyright 2015, vvp.js
 * MIT Licensed
 * @since 2015/9/24.
 * @modify 2015/10/25.
 * @author zhengzk
 **/


//避免已有的 vvp 被重写
var _vvp = window.vvp,
//避免已有的 vvp 被重写
    _vvp = window.vvp,

    vvp = function (selector, options) {
        return new vvp.fn.init(selector, options);
    };

vvp.fn = {
    constructor: vvp,
    length:0,
    init: function (selector, options) {
        var own = this;
        if (verge.isFunction(selector)) {
            //ready 时执行
        } else {
            var targets = vQ(selector);
            //if(targets.length == 0){
            //    return this;
            //}
            targets.each(function (i, target) {
                own[i] = new vvp.Player(target,options);
                own.length++;
            });
            return this;
        }
    },
    /**
     * 遍历
     * @param fn
     * @returns {vvp.fn}
     */
    each: function (fn) {
        var i = 0, length = this.length;
        for (; i < length; i += 1) {
            fn.call(this[i], i, this[i]);
        }
        return this;
    }
};
vvp.fn.init.prototype = vvp.fn;

vvp.extend = vvp.fn.extend = function () {
    verge.extend.apply(this, arguments);
}

vvp.extend({
    version: '@VERSION',
    //解决命名冲突
    /**
     * vvp加载完成
     */
    ready: function () {
        log('vvpjs is ready');
    },
    /**
     * 释放并返回vvp 解决命名冲突
     * @param flag
     * @returns {Function}
     */
    noConflict: function (flag) {
        if (window.vvp == vvp) {
            window.vvp = _vvp;
        }

        if (flag && window.vvp == vvp) {
            window.vvp = _vvp;
        }
        return vvp;
    }
});

verge.routes('vvp.component');
// Expose vvp to the global object
//window.vvp = window.vvp = vvp;
window['@NAME'.toUpperCase()] = window['@NAME'] = vvp;

