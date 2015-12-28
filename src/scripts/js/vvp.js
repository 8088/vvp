/**
 * 外部接口入口
 * Copyright 2015, vvp.js
 * MIT Licensed
 * @since 2015/9/24.
 * @modify 2015/10/25.
 * @author zhengzk
 **/

// HTML5 Element Shim for IE8
if (typeof HTMLVideoElement === 'undefined') {
    document.createElement('video');
    document.createElement('audio');
    document.createElement('track');
}

var vvp = function (selector, options) {
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
};

vvp.extend({
    version: '@VERSION'
});

verge.routes('vvp.component');
// Expose vvp to the global object
//window.vvp = window.vvp = vvp;
window['@NAME'.toUpperCase()] = window['@NAME'] = vvp;

