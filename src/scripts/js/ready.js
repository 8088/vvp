/**
 * 文档加载完成后执行相关方法
 * Copyright 2015, ready.js
 * MIT Licensed
 * @since 2015/9/2.
 * @modify 2015/9/24.
 * @author zhengzk
 **/
(function () {
    var readyList = [];
    /**
     * window.onload
     */
    function completed() {
        document.removeEventListener('DOMContentLoaded', completed);
        window.removeEventListener('load', completed);
        ytv.ready();
    }

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// We once tried to use readyState "interactive" here,
// but it caused issues like the one
// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
    if (document.readyState === 'complete') {

        // Handle it asynchronously to allow scripts the opportunity to delay ready
        window.setTimeout(ytv.ready);

    } else {

        // Use the handy event callback
        document.addEventListener('DOMContentLoaded', completed);

        // A fallback to window.onload, that will always work
        window.addEventListener('load', completed);
    }

    ytv.extend({
       isReady:false,
       readyWait:1,
       ready:function(arg){
           if(yt.isFunction(arg)){
               if(!ytv.isReady) {
                   readyList.push(arg);
               }else{
                   arg.apply(document,[ytv]);
               }
           }else{
               if( arg === true ? -- ytv.readyWait : ytv.isReady){
                   return;
               }
               ytv.isReady = true;

               if( arg !== true && -- ytv.readyWait > 0 ){
                   return;
               }

               yt.objectEach(readyList,function(inx,func){
                   func.apply(document,[ytv]);
               });

           }

       }
    });

})();
