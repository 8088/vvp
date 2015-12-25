/**
 * 进度条
 * @type {ytv.CoreObject|vjs.CoreObject}
 */
ytv.component.Progress = yt.CoreObject.extend({
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
        options = yQuery.merge({

        },options);
        var root = yt.create('div',{
            class:'x-progress'
        });

        //public
        this.root = root;
    }
});
