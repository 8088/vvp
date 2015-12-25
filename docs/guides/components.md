组件 Components
===
ytv.js有一套简单的自定义组件，可以通过class名来对组件进行继承和扩展。

```js
ytv.Control = ytvjs.Component.extend();
ytv.Button = ytvjs.Control.extend();
ytv.PlayToggle = ytvjs.Button.extend();
```

UI组件可以方便的进扩展和添加组件功能，以便建立一个完整的用户界面，例如：

```js
// Adding a new control to the player
myPlayer.addChild('BigPlayButton');
```

每个组件都有一个关联的DOM元素，当你添加组件时候，便将其添加到所对应的父元素。

```js
myPlayer.addChild('BigPlayButton');
```

结果:

```html
    <!-- Player Element -->
    <div class="ytv-js">
      <!-- BigPlayButton Element -->
      <div class="ytv-big-play-button"></div>
    </div>
```

ytv.js的组件结构如下表：(仅包含基础播放器逻辑)

```
Player
    PosterImage
    TextTrackDisplay
    Loading
    BigPlayButton
    ControlBar
        PlayToggle
        FullscreenToggle
        CurrentTimeDisplay
        TimeDivider
        DurationDisplay
        RemainingTimeDisplay
        ProgressControl
            SeekBar
              LoadProgressBar
              PlayProgressBar
              SeekHandle
        VolumeControl
            VolumeBar
                VolumeLevel
                VolumeHandle
        MuteToggle
```
