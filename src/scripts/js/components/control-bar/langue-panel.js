/**
 * 多语言选择
 * @type {vvp.CoreObject|vjs.CoreObject}
 */
vvp.component.LanguePanel = vvp.CoreObject.extend({
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
        options = vQ.merge({

        },options);
        var root = vQ.create('div',{
            class:'x-localization pressed'
        });

        //public
        this.root = root;
    }
});