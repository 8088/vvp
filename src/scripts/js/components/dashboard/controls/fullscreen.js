/**
 * 全屏
 * @type {vvp.CoreObject|vjs.CoreObject}
 */
vvp.component.Fullscreen = vvp.view.Fullscreen.extend({
    init:function(options){
        //设置默认值
        options = vQ.merge({
            title:'全屏模式',
            isFullscreen:false,
            cb_click:function(){

            }
        },options);

        this._super({},options);
        var own = this;

        own.isFullscreen = options.isFullscreen;
        own._setStyle(this.isFullscreen);
        //外部调用fullScreen方法时 不触发回掉
        own.bind('click',function(){
            options.cb_click(own.fullScreen(!own.isFullscreen));
        });
    },
    /**
     * 设置全屏状态
     * flag = true 全屏 flag = false 非全屏
     * @param flag
     * @returns {boolean|*}
     */
    fullscreen : function(flag){
        if(arguments.length > 0){
            this.isFullscreen = flag || false;
            this._setStyle(this.isFullscreen);
            //}else{
            //    isFullscreen = !isFullscreen;
        }
        return this.isFullscreen;
    },
    //处理按钮展现样式
    _setStyle:function(isFullscreen){
        if(isFullscreen){
            //this.btn.removeClass('x-zoomin').addClass('x-zoomout').html('<em>退出全屏</em>');
        }else{
            //this.btn.removeClass('x-zoomout').addClass('x-zoomin').html('<em>全屏</em>');
        }
    }
});
