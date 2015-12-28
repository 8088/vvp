/**
 * 进度条
 * @type {vvp.CoreObject|vjs.CoreObject}
 */
vvp.component.Progress = verge.CoreObject.extend({
    init:function(options){
        //<div class="x-progress">
        //    <div class="x-progress-track">
        //        <div class="x-progress-load"></div>
        //        <div class="x-progress-play"></div>
        //        <div class="x-progress-seek">
        //            <div class="x-seek-handle"></div>
        //        </div>
        //    </div>
        //</div>
        //设置默认值
        options = vQ.merge({

        },options);
        var root = verge.create('div',{
            class:'x-progress'
        });

        //public
        this.root = root;
    }
});
