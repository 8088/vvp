/**
 * 播放时间view
 * @type {vvp.CoreObject|vjs.CoreObject}
 */
vvp.component.TimePanel = vvp.CoreObject.extend({
    init:function(options){
        //    <div class="x-time-display">
        //        <span class="x-time-current">122:23</span>
        //        <span class="x-time-splite">/</span>
        //        <span class="x-time-duration">128:18</span>
        //    </div>
        options = vQ.merge({
            time:0,
            duration:0
        },options || {});

        var root = verge.create('div',{
            class:'x-time-display'
        });
        var current = verge.create('span',{
            class:'x-time-current'
        });
        var sep = verge.create('span',{
            class:'x-time-splite'
        });
        sep.text('/');
        var duration = verge.create('span',{
            class:'x-time-duration'
        });
        root.append(current);
        root.append(sep);
        root.append(duration);
        var setTime = function(curr,dur){
            if(arguments.length >= 1) {//传1个参数 curr
                curr = parseInt(curr);
                if (!isNaN(curr)) {
                    current.text(curr); //时间格式转换
                }
                if (arguments.length == 2) {//传两个参数 curr,duration
                    dur = parseInt(dur);
                    if(!isNaN(dur)){
                        duration.text(dur);//时间格式转换
                    }
                }
            }
        };

        setTime(options.time,options.duration);

        this.root = root;
        //设置时间 写在这里是利用闭包为避免给this绑定太多对象
        this.setTime = setTime;
    }
});