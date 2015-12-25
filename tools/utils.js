/**
 * gulp 自定义任务
 * Copyright 2015, player.js
 * MIT Licensed
 * @since 2015/9/8.
 * @modify 2015/9/8.
 * @author zhengzk
 **/
var pkg = require('../package.json');
var through2 = require('through2');

/**
 * 将流转换为字符串进行处理
 * @param modifier function
 **/
function modify(modifier) {
    return through2.obj(function (file, encoding, cb) {
        var content = modifier(String(file.contents),file);
        //var content = modifier(String(file.contents));
        file.contents = new Buffer(content);
        //this.push(file);
        cb(null, file);
    });
}

/**
 * 获取当前时间字符串
 **/
function getCurrentTime() {
    var time = new Date();
    var _parse = function (num) {
        return num < 10 ? '0' + num : num;
    }
    var year = _parse(time.getFullYear());
    var month = _parse(time.getMonth() + 1);
    var date = _parse(time.getDate());
    var hours = _parse(time.getHours());
    var minutes = _parse(time.getMinutes());
    var seconds = _parse(time.getSeconds());
    var milliseconds = time.getMilliseconds();
    var sep1 = "/";
    var sep2 = ":"
    var timeStr = "" + year + sep1 + month + sep1 + date + " " + hours + sep2 + minutes + sep2 + seconds + sep2 + milliseconds;
    return timeStr;
}

/**
 * 转换数据
 **/
var paseData = function (data,options) {
//    var data = '(function(window,undefined){\n'
//        + data.replace(/@VERSION/g, pkg.version)
//            .replace(/@NAME/g, 'ytv')
//        + '}(window))';
    options = options || {};
    var data = data
            .replace(/@VERSION/g, options.version || pkg.version)
            .replace(/@NAME/g, options.name || pkg.name)
            .replace(/@PATH/g, options.path || (pkg.version + "/" + pkg.name));
    return data;
}


/**
 * 添加版本信息等
 **/
var addNote = function (data,options) {
    options = options || {};
    var timeStr = getCurrentTime();
    return '/*!' + (options.name || pkg.name) + ' <' + (options.version || pkg.version) + '@' + timeStr + '> */\n'
        + '(function(window,undefined){\n'
        + data
        + '}(window))';
}

exports.paseData = function(options){
    return modify(function(str){
        return paseData(str,options);
    });
}

exports.addNote = function(options){
    return modify(function(str){
        return addNote(str,options);
    });
}

exports.path = function(cb_path){
    return modify(function(str,file){
        return cb_path(str,file.path);
    });
}
