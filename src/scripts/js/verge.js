
/**
 * 基础公共方法
 * Copyright 2015, video-player.js
 * MIT Licensed
 * @since 2015/9/12.
 * @modify 2015/10/25.
 * @author zhengzk
 **/

// HTML5 Element Shim for IE8
if (typeof HTMLVideoElement === 'undefined') {
    document.createElement('video');
    document.createElement('audio');
    document.createElement('track');
}

var slice = [].slice,
    hasOwnProp = Object.prototype.hasOwnProperty;

var verge = {
    /**
     * 判断是否是Object
     * @param obj
     * @returns {boolean}
     */
    isPlainObject: function (obj) {
        return !!obj
            && typeof obj === 'object'
            && obj.toString() === '[object Object]'
            && obj.constructor === Object;
    },
    /**
     * 判断是否是空节点
     * @param obj
     * @returns {boolean}
     */
    isEmptyObject:function(obj){
        var t;
        for(t in obj){
            return true;
        }
        return false;
    },
    /**
     * 判断arr是否是Array
     * @param arr Array
     * @returns {boolean}
     */
    isArray: function (arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    },
    /**
     * 判断fn是否是Function
     * @param fn Function
     * @returns {boolean}
     */
    isFunction: function (fn) {
        return '[object Function]' === Object.prototype.toString.call(fn);
    }
};

/***
 * 拓展
 * 参考了 jQuery.extend
 * @type {extend}
 */
verge.extend = function () {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if (typeof target === 'boolean') {
        deep = target;

        // Skip the boolean and the target
        target = arguments[i] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== 'object' && !verge.isFunction(target)) {
        target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {

        // Only deal with non-null/undefined values
        if (( options = arguments[i] ) != null) {

            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && ( verge.isPlainObject(copy) ||
                    ( copyIsArray = verge.isArray(copy) ) )) {

                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && verge.isArray(src) ? src : [];

                    } else {
                        clone = src && verge.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[name] = verge.extend(deep, clone, copy);

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};

verge.extend({
    /**
     *
     * @param first {Object}
     * @param second {Object}
     * @returns {*}
     */
    merge: function (first, second) {
        if (!second) {
            return first;
        }
        for (var key in second) {
            if (hasOwnProp.call(second, key)) {
                first[key] = second[key];
            }
        }
        return first;
    },
    /**
     * 创建一个object
     * @param obj
     * @returns {F}
     * @constructor
     */
    objectCreate: Object.create || function (obj) {
        //Create a new function called 'F' which is just an empty object.
        function F() {}

        //the prototype of the 'F' function should point to the
        //parameter of the anonymous function.
        F.prototype = obj;

        //create a new constructor function based off of the 'F' function.
        return new F();
    },
    /**
     * Loop through each property in an object and call a function
     * whose arguments are (key,value)
     * @param  {Object}   obj Object of properties
     * @param  {Function} fn  Function to be called on each property.
     * @this {*}
     * @private
     */
    objectEach: function (obj, fn, context) {
        for (var key in obj) {
            if (hasOwnProp.call(obj, key)) {
                //inx,element
                fn.call(context || this, key, obj[key]);
            }
        }
    },
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
//    create: function (tagName, attrs) {
//        tagName = tagName || 'div';
//        var ele = document.createElement(tagName);
//        var ret = vQ(ele);
//        if (attrs) {
//            ret.attr(attrs);
//        }
//        //ret.attr(attrs);
//        return ret;
//    },
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