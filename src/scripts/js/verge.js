
/**
 * 基础公共方法
 * Copyright 2015, video-player.js
 * MIT Licensed
 * @since 2015/9/12.
 * @modify 2015/10/25.
 * @author zhengzk
 **/
//var vQ = vQ || {};
//var slice = [].slice,
//    hasOwnProp = Object.prototype.hasOwnProperty;

var verge = {
    /**
     * 判断是否是Object
     * @param obj
     * @returns {boolean}
     */
    isPlainObject:vQ.isPlainObject,
    /**
     * 判断是否是空节点
     * @param obj
     * @returns {boolean}
     */
    isEmptyObject:vQ.isEmptyObject,
    /**
     * 判断arr是否是Array
     * @param arr Array
     * @returns {boolean}
     */
    isArray:vQ.isArray,
    /**
     * 判断fn是否是Function
     * @param fn Function
     * @returns {boolean}
     */
    isFunction:vQ.isFunction
};

/***
 * 拓展
 * 参考了 jQuery.extend
 * @type {extend}
 */
verge.extend = function () {
    vQ.extend.apply(this, arguments);
};

verge.extend({
    /**
     *
     * @param first {Object}
     * @param second {Object}
     * @returns {*}
     */
    merge: vQ.merge,
    /**
     * Loop through each property in an object and call a function
     * whose arguments are (key,value)
     * @param  {Object}   obj Object of properties
     * @param  {Function} fn  Function to be called on each property.
     * @this {*}
     * @private
     */
    objectEach: vQ.each,
    /**
     * 创建一个object
     * @param obj
     * @returns {F}
     * @constructor
     */
    objectCreate: ObjectCreate,
    /**
     * 根据path创建路径
     * @param path string
     * @returns {Object}
     */
    routes: function (path) {
        var arr = path.split('.');
        var length = arr.length;
        if (length <= 0) return;

        var i = 1;
        var ns = arr[0];
        do {
            eval('if(typeof(' + ns + ') == "undefined") ' + ns + ' = new Object();');
            ns += '.' + arr[i++];
        } while (length >= i);
        return eval(ns);
    },
    /**
     * 是否是DOM元素
     * @param ele
     * @returns {*|boolean}
     */
    isDOMElement: function (ele) {
        return ele && ele.nodeType === 1;
    },
    /**
     * 创建一个DOM元素并转换为vQ对象
     * @param tagName
     * @param attrs
     */
    create: function (tagName, attrs) {
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
    getClientLeft: function (ele) {//有bug? 后续修复
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
    }
});