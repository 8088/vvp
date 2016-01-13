/**
 * 基础公共方法
 * Copyright 2015, video-player.js
 * MIT Licensed
 * @since 2015/9/12.
 * @modify 2015/10/25.
 * @author zhengzk
 **/
/**
 * verge 公用方法
 * Q：verge为什么与vQ合并or对vQ进行扩展？
 *   保持vQ的职责单一  vQ用法接口等与jQuery保持一致
 * @type {{routes: Function, isDOMElement: Function, create: Function, getClientLeft: Function}}
 */
var verge = {
    /**
     * 根据path创建路径
     * @param path string
     * @returns {Object}
     */
    routes: function(path) {
        var arr = path.split('.');
        var length = arr.length;
        if (length <= 0) return;

        var i = 1;
        var ns = arr[0];
        do {
            eval('if(typeof(' + ns + ') == "undefined") ' + ns +
                ' = new Object();');
            ns += '.' + arr[i++];
        } while (length >= i);
        return eval(ns);
    },
    /**
     * 是否是DOM元素
     * @param ele
     * @returns {*|boolean}
     */
    isDOMElement: function(ele) {
        return ele && ele.nodeType === 1;
    },
    /**
     * 创建一个DOM元素并转换为vQ对象
     * @param tagName
     * @param attrs
     */
    create: function(tagName, attrs) {
        tagName = tagName || 'div';
        var ele = document.createElement(tagName);
        var ret = vQ(ele);
        if (attrs) {
            ret.attr(attrs);
        }
        //ret.attr(attrs);
        return ret;
    },
    /***
     * 获取元素在页面中的clientLeft
     * @param ele
     * @returns {options.offsetLeft|*}
     */
    getClientLeft: function(ele) { //有bug? 后续修复
        if (null == ele) {
            return;
        }
        var left = ele.offsetLeft;
        var parentNode = ele.offsetParent;
        while (true) {
            if (null == parentNode) {
                break;
            }
            left = left + parentNode.offsetLeft - parentNode.scrollLeft;
            if (parentNode == document.body) {
                break;
            }
            parentNode = parentNode.offsetParent;
        }
        return left;
    },
    /**
     * 把style属性转换成object
     * @param style
     * @returns {*}
     */
    mapStyle: function(style) {
        if (typeof style == "object") return style;
        var defs = (style + "").split(";");
        style = {};
        for (var def in defs) {
            def = defs[def].split(":");
            style[def[0]] = def[1];
        }
        return style;
    },
    /**
     * mixin
     * @param source
     * @param target
     */
    mixin: function(source, target) {
        for (var key in source) {
            target[key] = source[key];
        }
    },
    /**
     * mixinAttributes
     * @param target
     * @param blocks
     * @returns {*}
     */
    mixinAttributes: function(target, blocks) {
        for (var i = 0; i < blocks.length; i++) {
            verge.mixin(blocks[i], target);
        }
        return target;
    }
};
verge.routes('vvp.view');
verge.routes('vvp.component');
/***
 * 拓展
 * @type {extend}
 */
verge.extend = function() {
    vQ.extend.apply(this, arguments);
};
