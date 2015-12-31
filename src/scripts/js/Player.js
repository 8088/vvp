/**
 * 带基础view的播放器
 * Copyright 2015, player.js
 * MIT Licensed
 * @class
 * @since 2015/9/2.
 * @modify 2015/10/25.
 * @author zhengzk
 **/
vvp.Player = vvp.VideoPlayer.extend({
    //player -->{video videobutton loading dashboard}
    init: function (target, options) {
        //初始化参数
        options = vQ.merge({
            autoplay: false, /*将会传递至video*/
            loop: false, /*将会传递至video*/
            preload: false, /*将会传递至video*/
            //src:'',/*将会传递至video*/ 给src赋值'' # 之类的 src指向页面URL 不支持的格式 导致触发onError
            controls: true,//是否展现controls
            poster: '',
            type: 'live'//直播播放器(默认) //后续添加点播和切换
        }, options);

        var own = this;

        var cfg = {
            progress: true,
            time: true,
            quality: true
        };
        if (options.type == 'live') {
            cfg.progress = false;
            cfg.time = false;
            cfg.quality = false;
        }
        //<div class="x-player"></div> root
        this.root = verge.create('div', {
            class: 'x-player'
        });
        //创建必要节点
        this._createVideo();
        this._createVideoButton();
        this._createLoading();  //options.poster;
        this._createPoster(options.poster);
        this._createDashboard(options.controls, cfg);
        this._createPrompt();
        this._createTrigger();
        vQ(target).append(this.root);
        this._super(this.video,options);

        own.bind('onFullscreenChange',function(flag){
            if(flag){
                own.root.addClass('x-player-fullscreen');
            }else{
                own.root.removeClass('x-player-fullscreen');
            }
        });
    },
    /**
     * 进入全屏状态 重写
     * @returns {vvp.Player}
     */
    requestFullscreen: function () {
        var own = this;
        var fsApi = verge.fullscreenAPI;
        this.isFullscreen = true;

        if (fsApi['requestFullscreen']) {
            // the browser supports going fullscreen at the element level so we can
            // take the controls fullscreen as well as the video

            // Trigger fullscreenchange event after change
            // We have to specifically add this each time, and remove
            // when canceling fullscreen. Otherwise if there's multiple
            // players on a page, they would all be reacting to the same fullscreen
            // events
            vQ.bind(document, fsApi['fullscreenchange'],function documentFullscreenChange(){
                own.isFullscreen = !!document[fsApi.fullscreenElement];
                // If cancelling fullscreen, remove event listener.
                if (own.isFullscreen === false) {
                    vQ.unbind(document, fsApi['fullscreenchange'], documentFullscreenChange);
                }

                own.trigger('onFullscreenChange',[own.isFullscreen]);
            });

            own.root[0][fsApi.requestFullscreen]();

        }else{
            this._super();
        }
    },
    /**
     * 退出全屏 重写
     * @returns {vvp.Player}
     */
    exitFullscreen: function () {
        var own = this;
        var fsApi = verge.fullscreenAPI;
        own.isFullscreen = false;

        // Check for browser element fullscreen support
        if (fsApi['exitFullscreen']) {
            document[fsApi.exitFullscreen]();
        } else {
            this._super();
        }
        return this;
    },
    /**
     * controls方法 重写
     * @param flag
     * @returns {boolean}
     */
    controls:function(flag){
        var own = this;
        if(arguments.length > 0){
            var clearTimer = function(timer){
                if(own._show_ctl__timer){
                    clearTimeout(own._show_ctl__timer);
                    delete own._show_ctl__timer;
                }
            };
            if(flag){
                own.dashboard.show();
                clearTimer();
                own._show_ctl__timer = setTimeout(function(){
                    if(!own.paused()) {
                        own.dashboard.hide();
                    }
                },5000);
            }else{
                own.dashboard.hide();
                clearTimer();
            }
        }
        return !own.dashboard.isHidden();
    },
    //private
    /**
     * 创建并初始化video
     * @private
     */
    _createVideo: function () {
        //<video id="x-video-player" class="x-video-player"></video>
        var video = verge.create('video', {
            class: 'x-video-player'
        });
        this.root.append(video);
        this.video = video[0];
    },
    _createPoster: function (poster) {
        //<div class="x-video-poster"></div>
        var root = verge.create('div', {
            class: 'x-video-poster'
        });
        if (poster) {
            var img = verge.create('img', {
                src: poster
            });
            root.append(img);
        }

        this.one(['onPlay','onError'],function(){
            root.hide();
        });
        this.root.append(root);
        this.poster = root;
    },
    /**
     * 创建并初始化大的播放按钮
     * @private
     */
    _createVideoButton: function (cb_click) {
        //<div class="x-video-button">
        //    <div class="x-video-play-ico"></div>
        //</div>
        var own = this;
        var root = verge.create('div', {
            class: 'x-video-button'
        });
        var icon = verge.create('div', {
            class: 'x-video-play-ico'
        });
        root.append(icon);
        //var isShow = true;

        root.bind('click', function () {
            own.play();
        });

        this.bind(['onError','onPlay','onPlaying','onWaiting'],function(){
            root.hide();
        });

        own.bind('onPause', function () {
            root.show();
        });
        this.root.append(root);
        //this.videoButton = root;
    },
    /**
     * 创建并初始化loading按钮
     * @private
     */
    _createLoading: function () {
        //<div class="x-video-loading">
        //    <div class="x-video-loading-ico"></div>
        //</div>
        var root = verge.create('div', {
            class: 'x-video-loading'
        });
        var icon = verge.create('div', {
            class: 'x-video-loading-ico'
        });
        root.append(icon);
        //var isShow = true;
        this.root.append(root);
        //this.loading = root;
        this.bind(['onPlay','onPlaying','onError','onPause'], function () {
            root.hide();
        });

        this.bind('onWaiting', function () {
            root.show();
        });
    },
    _createTrigger: function (cb_click) {
        //<div class="x-trigger"></div>
        var own = this;
        var root = verge.create('div', {
            class: 'x-trigger'
        });
        own.one('onPlay',function(){
            root.bind('click', function () {
                //own.dashboard.toggle();
                own.controls(!own.controls());//toggle
            });

            own.bind(['onPlay','onPlaying'], function () {
                root.show();
            });

            own.bind('onPause', function () {
                root.hide();
            });
        });
        this.root.append(root);
    },
    _createPrompt:function(){
        //<div class="x-prompt">
        //<div class="x-prompt-txt x-prompt-center">播放出错请稍后再试</div>
        //</div>
        var own = this;
        var root = verge.create('div', {
            class: 'x-prompt'
        });
        var text = verge.create('div', {
            class: 'x-prompt-txt x-prompt-center'
        });
        //this.prompt = text;
        this.bind('onError',function(){
            root.show();
            text.text('播放出错,请稍后再试');
            own.one(['onPlay','onPlaying'], function () {
                root.hide();
            });
        });

        root.append(text);
        this.root.append(root);
    },
    /**
     * 创建并初始化播放器底部
     * @private
     */
    //dashboard --->{ progress controls}
    _createDashboard: function (_isShow, cfg) {
        var own = this;
        //<div class="x-dashboard"></div> root
        //  <div class="x-console x-fs-console"> </div> //root
        var root = verge.create('div', {
            class: 'x-dashboard'
        });
        var parent = verge.create('div', {
            class: 'x-console'
        });

        if (cfg.progress) {
            var progress = new vvp.component.Progress();
            this._createControls();
            parent.append(progress.root);
        }
        parent.append(this._createControls(cfg));
        root.append(parent);

        if (_isShow) {
            root.show();
        } else {
            root.hide();
        }
        own.bind('onFullscreenChange',function(flag){
            if (flag) {
                if (vvp.browser.isIPAD) {
                    parent.addClass('x-fs-console');
                }
                own.controls(false);
            } else {
                if (vvp.browser.isIPAD) {
                    parent.removeClass('x-fs-console');
                }
                own.controls(true);
            }
        });

        this.root.append(root);
        this.dashboard = root;
    },
    /**
     * 创建并初始化底部控制条
     * @returns {*}
     * @private
     */
    //controls -->{playbutton time setting}
    _createControls: function (cfg) {
        var own = this;
        var root = verge.create('div', {
            class: 'x-controls'
        });
        var playButton = new vvp.component.PlayButton({
            cb_click: function (flag) {
                if(!own.error()){
                    if (flag) {
                        own.play();
                    } else {
                        own.pause();
                    }
                }else{
                    playButton.play(false);
                }
            }
        });

        root.append(playButton.root);
        if (cfg.time) {
            var time = new vvp.component.TimePanel();
            this.time = time;
            root.append(time.root);
        }
        root.append(this._createSettings(cfg));
        own.bind(['onPlay','onPlaying'], function () {
            playButton.play(!own.paused());
        });
        own.bind(['onEnded','onError','onPause'], function () {
            playButton.play(false);
        });
        return root;
    },
    /**
     * 创建并初始化底部控制条中的Settings
     * @returns {*}
     * @private
     */
    //setting -->{language Quality Fullscreen}
    _createSettings: function (cfg) {
        var own = this;
        var root = verge.create('div', {
            class: 'x-settings'
        });
        if (cfg.quality) {
            //var language = new vvp.component.Language();ßßß
            var quality = new vvp.component.QualityPanel({
                cb_click: function (quality) {
                    own.trigger('onQualitySelect', [quality]);
                }
            });
            root.append(quality.root);
            this.quality = quality;
        }
        var fullscreen = new vvp.component.FullScreen({
            cb_click: function (flag) {
                var _flag = own.fullScreen(flag);
                //fullscreen.fullScreen(flag);
            }
        });

        //监听事件来处理状态 更准确
        own.bind('onFullscreenChange',function(flag){
            fullscreen.fullScreen(flag);
        });
        root.append(fullscreen.root);
        //this.fullScreen = fullscreen;
        return root;
    }
});