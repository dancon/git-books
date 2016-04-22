## gibbook的使用和常用插件

### 如何使用

1. 全局安装gitbook客户端工具

   ```
   npm install -g gitbook-cli
   ```

2. 然后在你的作品目录中创建两个必须的文件README.md和SUMMARY.md

   README.md文件是你作品的介绍

   SUMMARY.md是你作品的目录结构

3. 根据SUMMARY.md来初始化你的作品

   ```
   gitbook init
   ```

4. 运行服务, 运行起来后，可以在浏览器中通过 <u>http://localhost:4000</u>来访问启动后的服务。

   > Note: 默认启动使用的是4000端口，当然我们也可以通过参数 -p 来指定使用的接口

   ```
   // 默认启动，使用4000端口
   gitbook serve

   // 通过-p指定端口
   gitbook serve -p 8080
   ```

5. 撰写完成后，我们可以生成静态网站用来发布。

   ```
   gitbook build
   ```

### 使用gitbook插件

我们可以通过gitbook的插件来扩展gitbook的功能，现有的gitbook插件可以帮助我们做很多的事情，比如数学公式的支持，百度统计，评论插件等等。

> 我们可以在如下地址中查找已有的插件 <http://plugins.gitbook.com/>


#### 安装插件

安装gitbook的插件比较简单，首先需要在项目下添加一个book.json文件，然后按如下格式注册插件即可：

```
{
    "plugins": ["plugins1", "plugins2"],
    "pluginsConfig": {
        "plugins1": {...}
    }
}
```

> Note1: plugins 是我们要注册的插件名列表
        pluginsConfig 是插件的配置项

> Note2: 我们也可以通过@符号来指定插件的版本号，如："plugins1@0.1.1", 这个特性在使用一个旧版本的gitbook时是非常有用的。

注册完插件之后，我们就可以通过如下命令来安装插件了。

```
gitbook install
```

#### 开发插件

开发插件我们可以参照官方文档来进行。传送门 [gitbook 插件开发](https://developer.gitbook.com/plugins/index.html)

#### 常用gitbook插件

[editlink](https://plugins.gitbook.com/plugin/editlink)

内容顶部显示 `编辑本页` 的链接。

[ad](https://plugins.gitbook.com/plugin/ad)

在每个页面顶部和底部添加广告或任何自定义的内容。

[github](https://plugins.gitbook.com/plugin/github)

在右上角显示 github 仓库的图标链接。

[splitter](https://plugins.gitbook.com/plugin/splitter)

在左侧目录和右侧内容之间添加一个可以拖拽的栏，用来调整两边的宽度。

[image-captions](https://plugins.gitbook.com/plugin/image-captions)

抓取内容中图片的 `alt` 或 `title` 属性，在图片下面显示标题。

[anchors](https://plugins.gitbook.com/plugin/styles-sass)

标题带有 github 样式的锚点。

[disqus](https://plugins.gitbook.com/plugin/disqus)

添加 disqus 评论插件。

[toggle-chapters](https://plugins.gitbook.com/plugin/toggle-chapters)

合并左侧的目录