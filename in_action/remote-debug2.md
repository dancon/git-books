### 远程调试（二）Fiddler深度使用笔记

Fiddler是一款非常强大的web调试工具，如果只是简单使用的话，我们也可以说他是一款抓包工具。

使用Fiddler进行debug的场景一般是web 移动端与后端联调，当然也可以在开发前期，后端没有跟上前端进度的时候，用来单独的前端模拟调试，也可以用来pc调试，但是pc既然已经有了chrome,为什么还要用Fiddler呢。

#### Fiddler 使用详解

Fiddler官网： <http://www.telerik.com/fiddler> 在这里我们可以免费下载到最新的Fiddler.

#### Fiddler 工作原理

Fiddler 是以代理web服务器的形式工作的,它使用代理地址:127.0.0.1, 端口:8888. 当Fiddler会自动设置代理， 退出的时候它会自动注销代理，这样就不会影响别的程序。不过如果Fiddler非正常退出，这时候因为Fiddler没有自动注销，会造成网页无法访问。解决的办法是重新启动下Fiddler. 原理图如下：

![Fiddler工作原理](/in_action/resourse/fiddler-process.png)

#### Fiddler 工作面板简介

Fiddler的工作面板主要分为5部分，`菜单栏`、`工具栏`、`session列表`、`分析面板`、`命令行`, 布局如下图：

![Fiddler工作面板](/in_action/resource/fiddler-workbanch.png)

#### Fiddler 常用配置说明

1. 菜单栏 `File` / 勾选 `Capture Traffic` 我们就可以捕获电脑系统中所有的流量。

2. 菜单栏 `Rules` / `Automatic Breakpoints` 是用来设置全局断点调试的。所谓全局就是所有请求都会被设置断点，也可以通过在命令行来对指定会话来设置断点。

   > `Before Requests` 在请求发出前设置断点，这样，我们就可以在设置断点前，修改一些query string 来进行与服务器调试，通过如下命令来为指定会话设置断点。

   ```
   // 只有捕获到http://127.0.0.1:8080/mIndex.html请求时，会在request发出前设置断点。
   bpu http://127.0.0.1:8080/mIndex.html

   // 不加任何参数取消 before request 断点
   bpu

   ```

   Before Requrests 断点原理图：

   ![before-requrest](/in_action/resource/before-request.jpg)

   为http://127.0.0.1:8080/mIndex.html设置 Before Requests 断点效果图：

   ![break-before-request](/in_action/resource/break-before-request.png)

   > `After Responses` 在响应返回后设置断点，这样我们就可以修改响应内容来进行页面渲染或者其他调试。 通过命令来为指定会话设置 After Responses
   
   ```
   bpafter http://127.0.0.1:8080/mIndex.html

   // 取消after responses 断点
   bpafter
   ```

   After Response 断点原理图：

   ![after-response](/in_action/resource/after-response.jpg)

   为http://127.0.0.1:8080/mIndex.html设置 After Responses 断点效果图：

   ![break-after-response](/in_action/resource/break-after-response.png)

   > `Disabled` 取消断点