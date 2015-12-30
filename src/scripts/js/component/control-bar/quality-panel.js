/**
 * 清晰度
 * @type {vvp.CoreObject|vjs.CoreObject}
 */
vvp.component.QualityPanel = vvp.CoreObject.extend({
    init:function(options){
        //<div class="x-quality">
        //  <button class="x-control-btn" title="画质设置">标清</button>
        //  <div class="x-panel" style="display:none;">
        //      <ul>
        //          <li><span class="x-quality-sd">超清</span></li>
        //          <li><span class="x-quality-hd">高清</span></li>
        //          <li class='selected'><span class="x-quality-nd">标清</span></li>
        //      </ul>
        //  </div>
        //</div>

        //设置默认值
        options = vQ.merge({
            title:'画质设置',
            qualitys:{
                'mp4':'标清',
                'hd2':'高清',
                'hd3':'超清'
            },
            quality:'mp4',//默认值
            cb_click:function(){

            }
        },options);

        var styles = {
            'mp4':'x-quality-nd',
            'hd2':'x-quality-sd',
            'hd3':'x-quality-hd'
        };

        var root = verge.create('div',{
            class:'x-quality'
        });

        var btn = verge.create('button',{
            class:'x-control-btn',
            title:options.title
        });

        var panelIsShow = false;
        btn.bind('click',function(){
            panel.toggle();
        });

        var panel = verge.create('div',{
            class:'x-panel'
        });
        var ul = verge.create('ul');
        panel.append(ul);
        root.append(btn);
        root.append(panel);

        var currentQuality = options.quality,currentLi;
        var setQuality = function(key){
            if(currentQuality == key){//清晰度未改变
                return;
            }
            if(childs[key]){
                setOptions(options.qualitys,key);
            }
        };
        var childs = [];
        var setOptions = function(qualitys,quality){
            //var _ul = document.createElement('ul');
            childs = [];
            if(quality){
                options.quality = quality;
            }
            options.qualitys = qualitys;
            var _ul = verge.create('ul');

            vQ.each(qualitys,function(key,text){
                var li = verge.create('li');//document.createElement('li');
                var span = verge.create('span',{
                    class:styles[key]
                });
                span.text(text);
                li.append(span);
                childs[key] = li;
                if(key == currentQuality){
                    li.addClass('selected');
                    currentLi = li;
                    btn.html(options.qualitys[currentQuality]);
                    //btn.innerHTML = options.qualitys[currentQuality];
                }
                li.bind('click',function(){
                    if(currentQuality == key){//清晰度未改变
                        panel.hide();
                        return;
                    }
                    //var childNodes = ul.childNodes
                    li.addClass('selected');
                    if(currentLi){
                        currentLi.removeClass('selected');
                    }
                    currentLi = li;
                    currentQuality = key;
                    btn.html(text);

                    panel.hide();
                    panelIsShow = false;

                    options.cb_click(key);
                });
                _ul.append(li);
            });
            ul.replaceWith(_ul);
            ul = _ul;
        };
        setOptions(options.qualitys);
        //public
        this.root = root;
        this.setOptions = setOptions;
        this.setQuality = setQuality;
    }
});