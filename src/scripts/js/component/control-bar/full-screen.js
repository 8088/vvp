/**
 * 全屏
 * @type {vvp.CoreObject|vjs.CoreObject}
 */
vvp.component.FullScreen = verge.CoreObject.extend({
    init:function(options){
        //<div class="x-fullscreen">
        //    <!--button class="x-control-btn" type="button" title="全屏模式" rol="button"><b class="x-zoomin"><em>全屏</em></b></button>-->
        //    <button class="x-control-btn" type="button" title="全屏模式" rol="button"><b class="x-zoomout"><em>退出全屏</em></b></button>
        //</div>
        //设置默认值
        options = vQ.merge({
            title:'全屏模式',
            isFullScreen:false,
            cb_click:function(){

            }
        },options);

        var root = verge.create('div',{
            class:'x-fullscreen'
        });
        var btn = verge.create('button',{
            class:'x-control-btn',
            type:'button',
            rol:'button',
            title:options.title
        });
        var b = verge.create('b');

        btn.append(b);
        root.append(btn);

        var isFullScreen = options.isFullScreen;
        var setStyle = function(isFullScreen) {
            if(isFullScreen){
                b.removeClass('x-zoomin').addClass('x-zoomout').html("<em>退出全屏</em>");
                //b.class = "x-zoomout";
                //b.innerHTML = "<em>退出全屏</em>";
            }else{
                b.removeClass('x-zoomout').addClass('x-zoomin').html("<em>全屏</em>");
                //b.class = "x-zoomin";
                //b.innerHTML = "<em>全屏</em>";
            }
        };
        setStyle(isFullScreen);
        /**
         * 设置播放状态
         * flag = true 播放 flag = false 暂停
         * @param flag
         * @returns {boolean|*}
         */
        var fullScreen = function(flag){
            if(arguments.length > 0){
                isFullScreen = flag || false;
                setStyle(isFullScreen);
            //}else{
            //    isFullScreen = !isFullScreen;
            }
            return isFullScreen;
        };
        //外部调用fullScreen方法时 不触发回掉
        btn.bind('click',function(){
            options.cb_click(fullScreen(!isFullScreen));
        });
        //public
        this.root = root;
        this.fullScreen = fullScreen;
    }
});