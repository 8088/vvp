/**
 * 内部实现的简版jQuery
 * Copyright 2015, yQuery.js
 * MIT Licensed
 * @since 2015/8/24.
 * @author zhengzk
 * @modify 2015/10/29.
 */


//var slice = [].slice,
//    hasOwnProp = Object.prototype.hasOwnProperty;

var yQuery = function (selector, context) {
    return new yQuery.fn.init(selector, context);
};

//dom.fn上绑定的方法与每个对象
//dom上直接绑定的方法为单列
yQuery.fn = yQuery.prototype = {
    constructor: yQuery,
    length: 0,
    init: function (selector, context) {

        // "" , null , undefined , false
        if (!selector) {
            return this;
        }

        //string
        if ('string' == typeof selector) {//字符串选择器
            context = context instanceof yQuery ? context[0] : context;
            var nodeList = (context || document).querySelectorAll(selector);
            this.length = nodeList.length;
            for (var i = 0; i < this.length; i += 1) {
                this[i] = nodeList[i];
            }
            //DOMElement
        } else if (yt.isArray(selector)) {
            this.length = selector.length;
            for (var i = 0; i < selector.length; i += 1) {
                this[i] = selector[i];
            }
        } else if (yt.isFunction(selector)) {
            //ready func

        } else if (selector.nodeType) {//DOM元素
            this[0] = selector;
            this.length = 1;
            return this;
        } else if (selector instanceof yQuery) {
            return selector;
        }
        return this;
    },
    /**
     * 遍历
     * @param callback
     * @returns {*}
     */
    each: function (callback) {
        var i = 0, length = this.length;
        for (; i < length; i += 1) {
            callback.call(this[i], i, this[i]);
        }
        return this;
    },
    /**
     * 转换成数组
     * @returns {Array.<T>}
     */
    toArray: function () {
        return slice.call(this);
    },
    /**
     * 获取某一个
     * @param num
     * @returns {*}
     */
    get: function (num) {
        return num != null ?

            // Return just the one element from the set
            ( num < 0 ? this[num + this.length] : this[num] ) :

            // Return all the elements in a clean array
            slice.call(this);
    },
    /**
     * eq
     * @param i
     * @returns {null}
     */
    eq: function (i) {
        var len = this.length,
            j = +i + ( i < 0 ? len : 0 );
        if (j >= 0 && j < len) {
            return yQuery(this[j]);
        }
        return null;
    },
    /**
     * 根据callback 筛选
     * @param callback
     * @param invert
     * @returns {Array}
     */
    grep: function (callback, invert) {
        var callbackInverse,
            matches = [],
            i = 0,
            length = this.length,
            callbackExpect = !invert;

        // Go through the array, only saving the items
        // that pass the validator function
        for (; i < length; i++) {
            callbackInverse = !callback(this[i], i);
            if (callbackInverse !== callbackExpect) {
                matches.push(this[i]);
            }
        }

        return matches;
    }
};
yQuery.fn.init.prototype = yQuery.fn;

yQuery.extend = yQuery.fn.extend = function () {
    yt.extend.apply(this, arguments);
}

yQuery.extend({
    /**
     * 判断是否是Object
     * @param obj
     * @returns {boolean}
     */
    isPlainObject: function (obj) {
        return yt.isPlainObject(obj);
    },
    /**
     * 判断是否是空节点
     * @param obj
     * @returns {boolean}
     */
    isEmptyObject: function (obj) {
        return yt.isEmptyObject(obj);
    },
    /**
     * 判断arr是否是Array
     * @param arr Array
     * @returns {boolean}
     */
    isArray: function (arr) {
        return yt.isArray(arr);
        //Object.prototype.toString.call(arr) === '[object Array]';
    },
    /**
     * 判断fn是否是Function
     * @param fn Function
     * @returns {boolean}
     */
    isFunction: function (fn) {
        return yt.isFunction(fn);
        //'[object Function]' === Object.prototype.toString.call(fn);
    },
    /**
     * 获取元素节点名称
     * @param elem
     * @param name
     * @returns {Function|string|boolean}
     */
    nodeName: function (elem, name) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    /**
     * 遍利节点
     * @param obj
     * @param fn
     * @param context
     */
    each: function (obj, fn, context) {
        for (var key in obj) {
            if (hasOwnProp.call(obj, key)) {
                //inx,element
                fn.call(context || this, key, obj[key]);
            }
        }
    },
    /**
     * 清楚字符串空格
     * @param text
     * @returns {string}
     */
    trim: function (text) {
        var reg = /(^\s*)|(\s*$)/g;
        return text == null ?
            '' :
            ( text + '' ).replace(reg, '');
    },
    /**
     * 空function
     */
    noop: function () {
    },
    /**
     *
     * @param first {Object}
     * @param second {Object}
     * @returns {*}
     */
    merge: function (first, second) {
        return yt.merge(first, second);
    }
});


yt.extend({
    /**
     * 创建一个DOM元素并转换为yQuery对象
     * @param tagName
     * @param attrs
     */
    create: function (tagName, attrs) {
        tagName = tagName || 'div';
        var ele = document.createElement(tagName);
        var ret = yQuery(ele);
        if (attrs) {
            ret.attr(attrs);
        }
        //ret.attr(attrs);
        return ret;
    }
});

ytv.extend({
    yQuery: yQuery
});