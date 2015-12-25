# 项目相关说明

## 技术栈：
* 版本管理：git
* 编译预处理：node gulp
* css 预编译：Sass/Less
* 字体图标： Icon-Font
* js：原生js es 模块化 require js  mv＊ 的开发模式
* HTML5 http等

用gulp解决什么问题：
* js、css文件合并压缩
* js代码检查
* css预编译、格式化
* 图片合并(css sprite) 压缩
* 自动编译、刷新浏览器等
* 自定义任务 动态替换 参数

其它： Grunt、FIS   相关技术

html
[video标签 浏览器支持度](http://caniuse.com/#search=video)
[h264 mp4 支持度](http://caniuse.com/#feat=mpeg4)


代码仓库地址：ssh://username@gforge.1verge.net:22022/gitroot/ykh5vp

##开发环境搭建：
### 1、安装Git
[git下载地址](http://git-scm.com/download/)
git常用命令：
 检出项目：
 ```git
   git clone ssh://zhengzhikun@gforge.1verge.net:22022/gitroot/ykh5vp
```
 提交代码：
 ```git
   git commit
   git push
 ```
 同步代码：
 ```git
   git pull
 ```
 合并代码：
 ```git
   git merge
 ```
### 2、安装node
项目构建工具采用了gulp，预编译处理采用了node 因此首先需要安装node环境
[NodeJs官网](https://nodejs.org/)
[国内Nodejs 镜像](http://npm.taobao.org/mirrors/node)
替换npm镜像为淘宝镜像：
```node
 npm config set registry http://registry.cnpmjs.org
 //http://registry.npmjs.org
```

npm：nodejs包管理和分发工具,常用命令:

安装nodejs的依赖包
```node
npm install <name> 
```

安装依赖包同时，将信息写入package.json中
```node
npm install <name> --save 
``` 
创建一个package.json文件，包括名称、版本、作者这些信息等
```node
npm init 
``` 
移除依赖包
```node
npm remove <name>
```
更新依赖包
```node
npm update <name>
```
列出当前安装的了所有包
```node
npm ls 
```
查看当前包的安装路径
```node
npm root 
```
查看全局的包的安装路径
```node
npm root -g 
```
帮助
```node
npm help  
```
单独查看install命令的帮助，可以使用
```node
npm help install
```

### 3、安装gulp：
通过npm 安装gulp：
```node
 npm install -g gulp
``` 
[gulp官网](http://gulpjs.com)
[gulp中文网](http://www.gulpjs.com.cn/)
[gulp文档](http://www.gulpjs.com.cn/docs/api/)

常用gulp插件
 gulp-jshint 代码检查
 gulp-concat 合并
 gulp-rename 重命名
 gulp-uglify 压缩
 gulp-watch  监听 自动化

### 4、sass 处理：
* 1、ruby sass
sass 本身依赖于ruby，安装完ruby 后执行：
```ruby
 gem install sass
```
[ruby下载地址](http://rubyinstaller.org)
[RubyGems淘宝镜像](https://ruby.taobao.org/)
[sass安装](http://sass-lang.com/install)
* 2、gulp sass 插件
```node
npm install gulp-ruby－sass --save-dev
npm install gulp-sass --save-dev
``` 