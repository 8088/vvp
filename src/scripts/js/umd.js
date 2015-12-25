
/**
 * 对模块化的支持
 * Copyright 2015, umd.js
 * MIT Licensed
 * @since 2015/9/2.
 * @modify 2015/9/24.
 * @author zhengzk
 **/

//amd 方式引用支持
if (typeof define === 'function' && define['amd']) {
    //define('ytv', [], function(){ return ytv; });
    define('@NAME', [], function(){ return ytv; });

// checking that module is an object too because of umdjs/umd#35
} else if (typeof exports === 'object' && typeof module === 'object') {
    //module['ytv'] = ytv;
    module['@NAME'] = ytv;
}
