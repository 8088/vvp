/**
 * 播放按钮
 * @type {vvp.CoreObject}
 */
vvp.component.PlayBtn = vvp.view.PlayBtn.extend({
    init:function(options){
        //设置默认值
        options = vQ.merge({
            playing:false,
            text:['播放','暂停'],
            cb_click:function(){

            }
        },options);

        this._super({},options);
        var own = this;
        var isPlaying = options.playing;
        this._setStyle(isPlaying);

        //外部调用play方法时 不触发回掉
        own.btn.bind('click',function(){
            own.play();
            options.cb_click(this.isPlaying);
        });
    },
    /**
     * 设置播放状态
     * flag = true 播放 flag = false 暂停  不传flag 播放与暂停互换
     * @param flag
     * @returns {boolean|*}
     */
    play:function(flag){
        if(arguments.length > 0){
            this.isPlaying = flag || false;
        }else{
            this.isPlaying = !this.isPlaying;
        }
        this._setStyle(this.isPlaying);
        return this.isPlaying;
    },
    //处理播放按钮展现样式
    _setStyle:function(isPlaying){
        if(isPlaying){//播放状态 显示为暂停按钮
            this.btn.attr('role','pause');
            this.bg.hide();
            this.icon.removeClass('vvp-ico-play').addClass('vvp-ico-pause');
        }else{//暂停状态  显示为播放按钮
            this.btn.attr('role','play');
            this.bg.show();
            this.icon.removeClass('vvp-ico-pause').addClass('vvp-ico-play');
        }
    }
});
