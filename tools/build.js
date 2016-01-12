/**
 * Created by zhengzk on 2015/12/28.
 * 处理脚本 合并检查压缩等处理
 * 后续可按照处理资源的不同进行拆分
 */

'use strict';
var fs = require('fs'),

//import 载入外挂
    gulp = require('gulp'),
    eslint = require('gulp-eslint'),
//jshint = require('gulp-jshint'),//js代码检查
    uglify = require('gulp-uglify'), //压缩js
    rename = require('gulp-rename'), //流(文件)重命名
    rimraf = require('gulp-rimraf'), //清理
    concat = require('gulp-concat'), //合并
    notify = require('gulp-notify'), //通知
    combiner = require('stream-combiner2'),
    StreamQueue = require('streamqueue'), //合并流等操作
    jade2script = require('jade2script'),

//自定义的一些处理方法
    utils = require("./utils");

var config_file = "build.json";

/**
 * 处理组件view
 * @param options
 * @returns {*}
 */
var parseViewComponent = function (options) {
    //console.log('options:',options);
    return utils.modify(function (data, file) {
        return jade2script.compile(data,
            utils.merge(options, {
                file: {
                    relative: file.relative,
                    path: file.path
                }
            })
        );
    });
}

/**
 * 处理组件
 * @param options
 * @returns {*}
 */
var parseComponent = function (_path, _config) {
    var options = require("./components.json");
    var _path = _config.base ? _path + _config.base : _path;

    return gulp.src(parsePath(_path, _config.src || []))
        .pipe(parseViewComponent(options))//components
        .pipe(rename({
            extname: '.js'
        }))
};

/**
 * 执行script脚本压缩输出任务
 **/
var destModuleScript = function (stream, config) {
    var combined = combiner.obj([
        stream,
        utils.addNote(config),
        utils.paseData(config),
        eslint('.eslintrc'),
        //jshint('.jshintrc'),
        //jshint.reporter('default'),
        gulp.dest('dist/scripts/'),
        rename({
            suffix: '.min'
        }),
        uglify({
            preserveComments: 'some'
        }),
        gulp.dest('dist/scripts/')
    ]);
    combined.on('error', console.error.bind(console));
    return combined;
};

/**
 * 处理路径
 * @param _pre
 * @param paths
 * @returns {Array}
 */
var parsePath = function (_pre, paths) {
    paths = paths || [];
    var ret = [];
    for (var i = 0, l = paths.length; i < l; i++) {
        ret.push(_pre + paths[i]);
    }
    return ret;
};

/**
 * 获取View位置
 * @param srcArr
 * @returns {number}
 */
var getViewInx = function (srcArr) {

    for (var i = 0, l = srcArr.length; i < l; i++) {
        if ("VIEW" == srcArr[i]) {
            return i;
        }
    }
    return -1;
}

var processModule = function (_path, _config, _parent_config) {
    var config = require((process.cwd() + "/" + _path + config_file));
    config = utils.merge(config, _config || {});

    //处理scripts
    var scripts = config.scripts || {};
    var _parent_scripts = _parent_config ? _parent_config.scripts : null;
    //如父级别配置存在
    scripts = _parent_scripts ? utils.merge(scripts, _parent_scripts[config.name] || {}) : scripts;

    var streamQueue = new StreamQueue({
        objectMode: true
    });

    var _script_path = scripts.base ? _path + scripts.base : _path;
    //最基础代码 or 与父级模块公用代码
    if ((!_parent_scripts || !_parent_scripts.lib) && scripts.lib) {
        streamQueue.queue(gulp.src(parsePath(_script_path, scripts.lib || [])));
    }

    //非子模块
    var dependencies = scripts.dependencies || {};
    for (var key in dependencies) {
        streamQueue.queue(processModule(_script_path + dependencies[key], {
            name: key,
            exports: false
        }, config));
    }

    //处理自身源码
    var jsArr = scripts.src || [];
    if (!config.templates) {
        streamQueue.queue(gulp.src(parsePath(_script_path, jsArr)));
    } else {
        var inx = getViewInx(jsArr);
        if (inx >= 0) {
            streamQueue.queue(gulp.src(parsePath(_script_path, jsArr.slice(0, inx))));
            streamQueue.queue(parseComponent(_path, config.templates));
            streamQueue.queue(gulp.src(parsePath(_script_path, jsArr.slice(inx + 1))));
        } else {
            streamQueue.queue(gulp.src(parsePath(_script_path, jsArr)));
        }
    }

    //合并检查代码
    var _stream = streamQueue.done()
        .pipe(concat(config.name + '.js')) //'.' + pkg.version

    if (config.wrapper !== false) {
        var preStr = '(function(exports,undefined){ \n';
        if (_parent_config) { //子模块
            preStr = 'var ' + config.name + '=' + preStr;
        }
        var endStr = '}(' + (config.exports || 'undefined') + ')); \n';
        _stream.pipe(utils.modify(function (contents) {
            return preStr + contents + endStr;
        }));
        //_stream.pipe(gulp.dest('dist/scripts/'));
    }
    return (!_parent_config ? destModuleScript(_stream, config) : _stream.pipe(
        gulp.dest('dist/scripts/'))); //子模块不压缩输出
};

module.exports = function (_path, _config) {
    return processModule(_path, _config);
};
