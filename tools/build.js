/**
 * Created by zhengzk on 2015/12/28.
 * 处理脚本 合并检查压缩等处理
 */

'use strict';
var fs = require('fs'),

    //import 载入外挂
    gulp = require('gulp'),
    eslint = require('gulp-eslint'),
   //jshint = require('gulp-jshint'),//js代码检查
    uglify = require('gulp-uglify'),//压缩js
    rename = require('gulp-rename'),//流(文件)重命名
    rimraf = require('gulp-rimraf'),//清理
    concat = require('gulp-concat'),//合并
    notify = require('gulp-notify'),//通知
    combiner = require('stream-combiner2'),
    StreamQueue = require('streamqueue'),//合并流等操作

//自定义的一些处理方法
    utils = require("./utils");

var config_file = "build.json";

/**
 * 执行script脚本压缩输出任务
 **/
var destModuleScript = function (stream,config) {
    var combined = combiner.obj([
        stream,
        utils.addNote(config),
        utils.paseData(config),
		eslint('.eslintrc'),
        //jshint('.jshintrc'),
        //jshint.reporter('default'),
        gulp.dest('dist/scripts/'),
        rename({suffix: '.min'}),
        uglify({
            preserveComments: 'some'
        }),
        gulp.dest('dist/scripts/'),
    ]);
    combined.on('error', console.error.bind(console));
    return combined;
};

var parsePath = function (_pre, paths) {
    paths = paths || [];
    var ret = [];
    for (var i = 0, l = paths.length; i < l; i++) {
        ret.push(_pre + paths[i]);
    }
    return ret;
};

var processModule = function (_path, _config, _parent_config) {
    var config = require((process.cwd() + "/"+_path + config_file).replace(/\//g,'\\'));
    config = utils.merge(config, _config || {});
    config = _parent_config ?  utils.merge(config, _parent_config[config.name] || {}) : config ;
    var streamQueue = new StreamQueue({objectMode: true});

    //最基础代码 or 与父级模块公用代码
    if((!_parent_config || !_parent_config.base ) && config.base) {
        streamQueue.queue(gulp.src(parsePath(_path, config.base || [])));
    }

    //非子模块
    var dependencies = config.dependencies || {};
    for (var key in dependencies) {
        streamQueue.queue(processModule(_path + dependencies[key], {name:key,exports: false},config));
    }

    //处理自身源码
    streamQueue.queue(gulp.src(parsePath(_path, config.src || [])));

    //合并检查代码
    var _stream = streamQueue.done()
        .pipe(concat(config.name + '.js'))//'.' + pkg.version

    if(config.wrapper !== false){
        var preStr = '(function(exports,undefined){ \n';
        if(_parent_config){//子模块
            preStr = 'var ' + config.name +  '=' + preStr;
        }
        var endStr = '}(' + (config.exports || 'undefined') + ')); \n';
        _stream.pipe(utils.modify(function (contents) {
            return preStr + contents + endStr;
        }));
        //_stream.pipe(gulp.dest('dist/scripts/'));
    }
    return (!_parent_config ? destModuleScript(_stream,config) :_stream.pipe(gulp.dest('dist/scripts/')));//子模块不压缩输出
};

module.exports = function(_path,_config){
    return processModule(_path,_config);
};