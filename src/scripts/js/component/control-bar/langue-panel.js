/**
 * 多语言选择
 * @type {ytv.CoreObject|vjs.CoreObject}
 */
ytv.component.LanguePanel = yt.CoreObject.extend({
    init:function(options){
        //<div class="x-localization pressed">
        //  <button class="x-control-btn">国语</button>
        //  <div class="x-panel">
        //      <ul>
        //          <li>粤语</li>
        //          <li>英语</li>
        //          <li class="selected">国语</li>
        //      </ul>
        //      <div class="x-mask"></div>
        //  </div>
        //</div>

        //设置默认值
        options = yQuery.merge({

        },options);
        var root = yQuery.create('div',{
            class:'x-localization pressed'
        });

        //public
        this.root = root;
    }
});