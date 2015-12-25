/**
 * ytv进行拓展 使其支持多个player的处理
 * Copyright 2015, ytv.js
 * MIT Licensed
 * @since 2015/9/30.
 * @modify 2015/10/20.
 * @author zhengzk
 **/

ytv.fn.extend(function () {
    var ext = {},
        methods = yt.methods,
        callbacks = yt.callbacks,
        attrs = yt.attrs;
    //    , 'attr'
    //    , 'plugin'
    //可调用方法 无返回值 返回ytv
    //bind unbind one load
    yt.objectEach(methods.events.concat(methods.native).concat(['plugin'])
        , function (inx, fun) {
            ext[fun] = function () {
                var args = slice.call(arguments);
                this.each(function (i, player) {
                    player[fun].apply(player, args);
                });
                return this;
            }
        });

    //回掉函数和方法重名处理
    //play pause
    yt.objectEach(methods.specialNative
        , function (inx, fun) {
            ext[fun] = function (arg, flag) {
                if (arguments.length > 0) {
                    if (yt.isFunction(arg)) {//参数为function
                        var args = [fun].concat(slice.call(arguments));
                        this.each(function (i, player) {
                            player['bind'].apply(player, args);
                        });
                    }
                }
                if (flag != false) {
                    var args = slice.call(arguments); //兼容处理传递arguments
                    this.each(function (i, player) {
                        player[fun].apply(player, args);
                    });
                }
                return this;
            }
        });


    //需要返回值  只读属性
    //duration
    yt.objectEach(attrs.readonly
        , function (inx, fun) {
            ext[fun] = function () {
                var player = this[0];
                if (player) {
                    return player[fun].apply(player, arguments);
                }
                //return undefined;
            }
        });

    //ended seeking error
    //回掉函数和只读获取属性的方法重名处理
    yt.objectEach(attrs.specialReadonly
        , function (inx, attr) {
            ext[attr] = function (arg) {
                if (arguments.length > 0) {
                    if (yt.isFunction(arg)) {
                        var args = [attr].concat(slice.call(arguments));
                        this.each(function (i, player) {
                            player.bind.apply(this, args);
                        });
                    }
                }
                var player = this[0];
                if (player) {
                    return player[attr].apply(player, arguments);
                }
                //return undefined;
            }
        });

    //可以设置or读取属性的方法
    //autoplay
    yt.objectEach(attrs.readwrite.concat(attrs.specialReadwrite).concat(['attr'])
        , function (inx, attr) {
            ext[attr] = function () {
                var player = this[0];
                if (player) {
                    return player[attr].apply(player, arguments);
                }
                //return undefined;
            }
        });

    /**
     * 增加外部函数入口
     */
    yt.objectEach(methods.callbacks
        , function (inx, fun) {
            ext[fun] = function () {
                var args = [fun].concat(slice.call(arguments));
                this.each(function (i, player) {
                    player['bind'].apply(player, args);
                });
            }
        });

    return ext;
}());

