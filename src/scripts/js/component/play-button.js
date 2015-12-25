/**
 * 播放按钮
 * @type {ytv.CoreObject}
 */
ytv.component.PlayButton = yt.CoreObject.extend({
    init:function(options){
        //<div class="x-play-control">
        //    <!--button class="x-control-btn"><b class="x-playing"><em>播放</em></b></button-->
        //    <button class="x-control-btn"><b class="x-pause"><em>暂停</em></b></button>
        //</div>

        //设置默认值
        options = yQuery.merge({
            playing:false,
            text:['播放','暂停'],
            cb_click:function(){

            }
        },options);

        var root = yt.create('div',{
            class:'x-play-control'
        });
        var btn = yt.create('button',{
            class:'x-control-btn'
        });

        var b = yt.create('b');
        btn.append(b);
        root.append(btn);
        var setStyle = function(isPlaying){
            if(isPlaying){//播放状态 显示为暂停按钮
                b.removeClass('x-playing').addClass("x-pause").html('<em>暂停</em>');
            }else{//暂停状态  显示为播放按钮
                b.removeClass('x-pause').addClass("x-playing").html('<em>播放</em>');
            }
        }
        var isPlaying = options.playing;
        setStyle(isPlaying);
        /**
         * 设置播放状态
         * flag = true 播放 flag = false 暂停  不传flag 播放与暂停互换
         * @param flag
         * @returns {boolean|*}
         */
        var play = function(flag){
            if(arguments.length > 0){
                isPlaying = flag || false;
            }else{
                isPlaying = !isPlaying;
            }
            setStyle(isPlaying);
            return isPlaying;
        };
        //外部调用play方法时 不触发回掉
        btn.bind('click',function(){
            play();
            options.cb_click(isPlaying);
        });

        //public
        this.root = root;
        this.play = play;
    }
});
