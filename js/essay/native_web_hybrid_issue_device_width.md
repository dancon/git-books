### Hybrid app device width 获取不正确

#### 背景描述：

Hybrid app 中一般都是通过一个新建一个 webview 然后再加载一个 HTML 页面。在 HTML 页面中我们一般都会通过 meta 标签来设置 viewport 的宽高，如下：

```
    <meta name="viewport" content="width=device-width,height=device-height">
```

然后页面中使用 REM 来自适应布局的时候，我们会通过 js document.documentElement.clientWidth 来校正 root 元素的 font-size 值，clientWidth 就是我们设置的 viewport 的 width, 也就是 device-width.

#### 问题描述：

IOS 某个新增的 webview 页面字体、布局偶尔会变的很小，完全看不清，like this:

![./resource/root_font_size_0.png](./resource/root_font_size_0.png)

#### 问题分析：

这个问题有两个点需要解决：

1. 字号不正确

2. 偶发

#### 问题原因：

先看问题1：

经过调试发现问题的原因是在校正 root 元素的 font-size 值时，获取到的 clientWidth == 0，也就是拿到的 device-width == 0，可以定位问题出现在端上，跟端同学对了一下，确实是在初始化 webview 的时候设置 webview 的尺寸为 0， 然后在 view 展现后才正确设置尺寸为设备的宽高。

解决的方法当然就是在 webview 初始化的时候就正确设置 webview 的尺寸为设备的宽高。

问题2：

这种情况在线上的时候是偶发，并不是毕现的，但是在调试阶段，在 js 中 alert 就可以毕现，原因就是 alert 会挂起主线程，导致 webview 的后续操作也被挂起，这样当页面去校正 root font-size 的时候 webview 的 width 是初始化时的 0，当关闭 alert 后，就算 webview 重新设置了正确的尺寸，但是 root 的 font-size 已经设置为了 0.

这也没有解释偶发的真正原因，其实原因就是 ios webview 去 loadUrl 的时候是异步的，他不会阻断 webview 的正常渲染，所以问题会不会出现就依赖于页面加载的速度了，如果网速快，页面在 webview 的尺寸被正确赋值前就加载完了，那么这时获取的 clientWidth 为 0, 问题就出现了，而网速慢的时候，页面在 webview 的尺寸正确赋值后加载完，那么 clientWidth 就获取到了正确的值，问题也就不会出现。

#### 思考

1. 其实这个问题理论上前端也是可以处理的，通常我们会在 rem 的脚本中监听 resize 事件，当 webview 第二次设置的时候，就会触发 resize 事件，重新校正 root font-size， 这样页面也就可以正常渲染。但是这个方案是不可将就的，首先 rem 脚本执行了两次，这个还好，要命的是，页面发生了重排，这种代价是比较昂贵的。

2. 之前还遇到过一个问题，也是 webview 中，页面明明不满一屏，但是还是出现了垂直滚动条，原因是 webview 的初始化高度被设置为了 device-height, 但是这个 webview 还有顶部或底部的 bar, 显然当 webview 展示出来后就会出现垂直滚动条。之前的解决方案是在页面中的 meta 中不设置 viewport 的 height 值或者指定为某个值，其实我们对于某个特殊的 webview 我们可以让端同学在初始化 webview 的高度的时候，减去那些额外的 bar 的高度，这样我们就不用在自己的模板中复写基模板的 viewport meta 标签了。