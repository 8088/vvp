/**
 * 外部接口入口
 * Copyright 2015, ytv.js
 * MIT Licensed
 * @since 2015/9/24.
 * @modify 2015/10/25.
 * @author zhengzk
 **/


//避免已有的 ytv 被重写
var _ytv = window.ytv,
//避免已有的 ytv 被重写
    _ytv = window.ytv,

    ytv = function (selector, options) {
        return new ytv.fn.init(selector, options);
    };

ytv.fn = {
    constructor: ytv,
    length:0,
    init: function (selector, options) {
        var own = this;
        if (yt.isFunction(selector)) {
            //ready 时执行
        } else {
            var targets = yQuery(selector);
            //if(targets.length == 0){
            //    return this;
            //}
            targets.each(function (i, target) {
                own[i] = new ytv.Player(target,options);
                own.length++;
            });
            return this;
        }
    },
    /**
     * 遍历
     * @param fn
     * @returns {ytv.fn}
     */
    each: function (fn) {
        var i = 0, length = this.length;
        for (; i < length; i += 1) {
            fn.call(this[i], i, this[i]);
        }
        return this;
    }
};
ytv.fn.init.prototype = ytv.fn;

ytv.extend = ytv.fn.extend = function () {
    yt.extend.apply(this, arguments);
}

ytv.extend({
    version: '@VERSION',
    //解决命名冲突
    /**
     * ytv加载完成
     */
    ready: function () {
        log('ytvjs is ready');
    },
    /**
     * 释放并返回ytv 解决命名冲突
     * @param flag
     * @returns {Function}
     */
    noConflict: function (flag) {
        if (window.ytv == ytv) {
            window.ytv = _ytv;
        }

        if (flag && window.ytv == ytv) {
            window.ytv = _ytv;
        }
        return ytv;
    }
});

yt.routes('ytv.component');
// Expose ytv to the global object
//window.YTV = window.ytv = ytv;
window['@NAME'.toUpperCase()] = window['@NAME'] = ytv;

