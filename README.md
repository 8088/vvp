
![Verge Video Player logo](http://r4.ykimg.com/0510000053F30DC76737B3340203B682)

# vvp - Verge Video Player

> vvp.js 是基于HTML5的通用播放器解决方案。目前只支持高级的浏览器和移动端设备的浏览器上使用。

## 新手指南

一下代码添加至
`<head>`:

```html
<link href="http://player.youku.com/vvp/0.1.0/css/vvp.css" rel="stylesheet">
<script src="http://player.youku.com/vvp/0.1.0/js/vvp.min.js"></script>
```

然后您可以在页面任何地方添加 `<video>` 标签，需要在标签增加一个 `data-setup`属性，属性的值是一个JSON格式的对象。包含所有Video的初始参数设置。

```html
<video id="VVP" class="vvp vvp-skin" controls
 preload="auto" width="640" height="264" poster="vvp-poster.jpg"
 data-setup='{}'>
  <source src="verge.mp4" type='video/mp4'>
  <source src="verge.webm" type='video/webm'>
  <p class="vvp-no-js">
    请确保您的浏览器开启了Javascript，如需要请升级您的浏览器。<a href="http://.com/html5-video-support/" target="_blank">支持 HTML5 video标签</a>
  </p>
</video>
```

如果您不在初始设置中添加 `data-setup` 也可以在初始化视频对象时再吧设置项当作对象参数传入。

```javascript
var player = vvp('VVP', { /* Options */ }, function() {
  console.log('Good to go!');

  this.play(); // if you don't trust autoplay for some reason

  // How about an event listener?
  this.bind('ended', function() {
    console.log('awww...over so soon?');
  });
});
```

查看文档[documentation](docs/index.md) 可以了解更全面的信息. 也可以查看API文档
[player API docs](docs/api/vvp.Player.md)

## 开源贡献
vvp 的代码是公开开源的 [contributing guide](CONTRIBUTING.md).

## 声明

vvp is licensed under the MIT. [View the license file](LICENSE)

Copyright 2015 1VERGE, Inc
