### 【转载】移动 web 问题小结

#### Mate 标签

```
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
```

这个想必大家都知道，当页面在手机上显示时，增加这个meta可以让页面强制让文档的宽度与设备的宽度保持1:1，并且文档最大的宽度比例是1.0，且不允许用户点击屏幕放大浏览。

> John Hou:
>> width    设置viewport宽度，为一个正整数，或字符串‘device-width’
>> height   设置viewport高度，一般设置了宽度，会自动解析出高度，可以不用设置
>> initial-scale    默认缩放比例，为一个数字，可以带小数
>> minimum-scale    允许用户最小缩放比例，为一个数字，可以带小数
>> maximum-scale    允许用户最大缩放比例，为一个数字，可以带小数
>> user-scalable    是否允许手动缩放

```
<meta content="telephone=no" name="format-detection" />
<meta content="email=no" name="format-detection" />
```

这两个属性分别对ios上自动识别电话和android上自动识别邮箱做了限制。

```
<meta name="apple-mobile-web-app-capable" content="yes" />
```

可隐藏地址栏，仅针对IOS的Safari（注：IOS7.0版本以后，safari上已看不到效果）

```
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
```

仅针对IOS的Safari顶端状态条的样式（可选default/black/black-translucent ）

以下是国产浏览器私有 meta
```
<!-- 启用360浏览器的极速模式(webkit) -->
<meta name="renderer" content="webkit">
<!-- 避免IE使用兼容模式 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name="HandheldFriendly" content="true">
<!-- 微软的老式浏览器 -->
<meta name="MobileOptimized" content="320">
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">
<!-- UC应用模式 -->
<meta name="browsermode" content="application">
<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">
<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">
```
#### 获取滚动条的值

```
window.scrollY  window.scrollX
```

桌面浏览器中想要获取滚动条的值是通过document.scrollTop和document.scrollLeft得到的，但在iOS中你会发现这两个属性是未定义的，为什么呢？因为在iOS中没有滚动条的概念，在Android中通过这两个属性可以正常获取到滚动条的值，那么在iOS中我们该如何获取滚动条的值呢？就是上面两个属性，但是事实证明android也支持这属性，所以索性都用woindow.scroll.

#### 禁止选择文本

```
-webkit-user-select:none
```

禁止用户选择文本，ios和android都支持

#### 屏蔽阴影

```
-webkit-appearance:none
```

亲测，可以同时屏蔽输入框怪异的内阴影，解决iOS下无法修改按钮样式，测试还发现一个小问题就是，加了上面的属性后，iOS下默认还是带有圆角的，不过可以使用 border-radius属性修改。

####  css之border-box

```
element{
    width: 100%;
    padding-left: 10px;
    box-sizing:border-box;
    -webkit-box-sizing:border-box;
    border: 1px solid blue;
}
```

那我想要一个元素100%显示，又必须有一个固定的padding-left／padding-right，还有1px的边框，怎么办？这样编写代码必然导致出现横向滚动条，肿么办？要相信问题就是用来解决的。这时候伟大的css3为我们提供了box-sizing属性，对于这个属性的具体解释不做赘述（想深入了解的同学可以到w3school查看，要知道自己动手会更容易记忆）。


#### css3多文本换行

```
p {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
```

Webkit支持一个名为-webkit-line-clamp的属性，参见[链接](http://developer.apple.com/safari/library/documentation/AppleApplications/Reference/SafariCSSRef/Articles/StandardCSSProperties.html#//apple_ref/doc/uid/TP30001266-UnsupportedProperties)，也就是说这个属性并不是标准的一部分，可能是Webkit内部使用的，或者被弃用的属性。需要注意的是display需要设置成box，-webkit-line-clamp表示需要显示几行。

#### Retina屏幕高清图片

```
selector {
  background-image: url(no-image-set.png);
  background: image-set(url(foo-lowres.png) 1x,url(foo-highres.png) 2x) center;
}
```

image-set的语法，类似于不同的文本，图像也会显示成不同的：

 1. ***不支持image-set***：在不支持image-set的浏览器下，他会支持background-image图像，也就是说不支持image-set的浏览器下，他们解析background-image中的背景图像；
 2. ***支持image-set***：如果你的浏览器支持image-sete，而且是普通显屏下，此时浏览器会选择image-set中的@1x背景图像；
 3. ***Retina屏幕下的image-set***：如果你的浏览器支持image-set，而且是在Retina屏幕下，此时浏览器会选择image-set中的@2x背景图像。

#### html5重力感应事件

```
    if (window.DeviceMotionEvent) {
       window.addEventListener('devicemotion',deviceMotionHandler, false);
    }
    var speed = 30;//speed
    var x = y = z = lastX = lastY = lastZ = 0;
    function deviceMotionHandler(eventData) {
      var acceleration =event.accelerationIncludingGravity;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed || Math.abs(z-lastZ) > speed) {
                //简单的摇一摇触发代码
                alert(1);
            }
            lastX = x;
            lastY = y;
            lastZ = z;
    }
```

关于deviceMotionEvent是HTML5新增的事件，用来检测手机重力感应效果具体可参考<http://w3c.github.io/deviceorientation/spec-source-orientation.html>

#### 移动端touch事件

* touchstart //当手指接触屏幕时触发
* touchmove //当已经接触屏幕的手指开始移动后触发
* touchend //当手指离开屏幕时触发
* touchcancel//当某种touch事件非正常结束时触发

这4个事件的触发顺序为：

touchstart -> touchmove ->  touchend ->touchcancel

对于某些android系统touch的bug:

比如手指在屏幕由上向下拖动页面时，理论上是会触发 一个 touchstart ，很多次 touchmove ，和最终的 touchend ，可是在android 4.0上，touchmove只被触发一次，触发时间和touchstart 差不多，而touchend直接没有被触发。这是一个非常严重的bug，在google Issue已有不少人提出 ,这个很蛋疼的bug是在模拟下拉刷新是遇到的尤其当touchmove的dom节点数量变多时比出现，当时解决办法就是用settimeout来稀释touchmove。

#### 单击延迟

click 事件因为要等待双击确认，会有 300ms 的延迟，体验并不是很好。

开发者大多数会使用封装的 tap 事件来代替click 事件，所谓的 tap 事件由 touchstart 事件 + touchmove 判断 + touchend 事件封装组成。

[Creating Fast Buttons for Mobile Web Applications](https://developers.google.com/mobile/articles/fast_buttons?hl=de-DE)

[Eliminate 300ms delay on click events in mobile Safari](http://stackoverflow.com/questions/12238587/eliminate-300ms-delay-on-click-events-in-mobile-safari)

#### IOS里面fixed的文本框焦点居中

```
<!DOCTYPE html>
    <head>
    input {
       position:fixed;
       top:0;
       left:0;
    }
    </head>
    <body>
        <div class="header">
            <form action="">
                <label>Testfield: <input type="text" /></label>
            </form>
        </div>
    </body>
</html>
```

在ios里面，当一个文本框的样式为fixed时候，如果这个文本框获得焦点，它的位置就会乱掉，由于ios里面做了自适应居中，这个fixed的文本框会跑到页面中间。类似：

![input_fixed](/js/essay/resource/input_fixed.png)

###### 解决办法有两个：

可以在文本框获得焦点的时候将fixed改为absolute，失去焦点时在改回fixed，但是这样会让屏幕有上下滑动的体验不太好。

```
    // css
    .fixfixed {
        position:absolute;
    }

    // js
    $(document).on('focus', 'input', function(e) {
        $this.addClass('fixfixed');
    })
    .on('blur', 'input', function(e) {
        $this.removeClass('fixfixed');
    });
```

还有一种就是用一个假的fixed的文本框放在页面顶部，一个absolute的文本框隐藏在页面顶部，当fixed的文本框获得焦点时候将其隐藏，然后显示absolute的文本框，当失去焦点时，在把absolute的文本框隐藏，fixed的文本框显示。

```
    // css
    .fixfixed {
        position:absolute;
    }

    // js
    $(document).on('focus', 'input', function(e) {
        $absolute.show();
        $this.hide();
    })
    .on('blur', 'input', function(e) {
         $fixed..show();
        $this.hide();
    });
```
最后一种就是顶部的input不参与滚动，只让其下面滚动。

#### position:sticky

position:sticky是一个新的css3属性，它的表现类似position:relative和position:fixed的合体，在目标区域在屏幕中可见时，它的行为就像position:relative; 而当页面滚动超出目标区域时，它的表现就像position:fixed，它会固定在目标位置


```
    .sticky {
        position: -webkit-sticky;
        position:sticky;
        top: 15px;
    }
```

***浏览器兼容性：***

由于这是一个全新的属性，以至于到现在都没有一个规范，W3C也刚刚开始讨论它，而现在只有webkit nightly版本和chrome 开发版(Chrome 23.0.1247.0+ Canary)才开始支持它。

另外需要注意的是，如果同时定义了left和right值，那么left生效，right会无效，同样，同时定义了top和bottom，top赢～～

#### 移动端点透事件

简单的说，由于在移动端我们经常会使用tap(touchstart)事件来替换掉click事件，那么就会有一种场景是：

```
    <div id="mengceng"></div>

    <a href="www.qq.com">www.qq.com</a>
```

div是绝对定位的蒙层z-index高于a，而a标签是页面中的一个链接，我们给div绑定tap事件：

```
    $('#mengceng').on('tap',function(){
        $('#mengceng').hide();
    });
```

我们点击蒙层时 div正常消失，但是当我们在a标签上点击蒙层时，发现a链接被触发，这就是所谓的点透事件。

原因：

touchstart 早于 touchend 早于 click。亦即click的触发是有延迟的，这个时间大概在300ms左右，也就是说我们tap触发之后蒙层隐藏，此时click还没有触发，300ms之后由于蒙层隐藏，我们的click触发到了下面的a链接上。

解决办法：
1.  尽量都使用touch事件来替换click事件。
2.  阻止a链接的click的preventDefault

#### base64编码图片替换url图片

u在移动端，网络请求是很珍贵的资源，尤其在2g或者3g网络下，所以能不发请求的资源都尽量不要发，对于一些小图片icon之类的，可以将图片用base64编码，来减少网络请求。

> John Hou:
>> 使用 base64 有一个缺点就是当在页面的 img， 或者 style 内联中 通过 background-image 中使用同一个图片时，是无法对图片进行缓存的，所以尽量少在页面的元素中使用 base64, 尽量通过 CSS 类来使用 base64 图片，这样可以复用资源，而不是重复加载。

#### 手机拍照和上传图片

`<input type="file">` 的accept 属性

```
    <!-- 选择照片 -->
    <input type=file accept="image/*">
    <!-- 选择视频 -->
    <input type=file accept="video/*">
```

#### 动画效果时开启硬件加速

我们在制作动画效果时经常会想要改版元素的top或者left来让元素动起来，在pc端还好但是移动端就会有较大的卡顿感，这么我们需要使用css3的  transform: translate3d;来替换。

此效果可以让浏览器开启gpu加速，渲染更流畅，但是笔着实验时在ios上体验良好，但在一些低端android机型可能会出现意想不到的效果。

#### 快速回弹滚动

在iOS上如果你想让一个元素拥有像 Native 的滚动效果，你可以这样做：

```
    .div {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
```

经笔着测试，此效果在不同的ios系统表现不一致:

对于局部滚动，ios8以上，不加此效果，滚动的超级慢，ios8一下，不加此效果，滚动还算比较流畅

对于body滚动，ios8以上，不加此效果同样拥有弹性滚动效果。

#### ios和android局部滚动时隐藏原生滚动条

Android

```
    ::-webkit-scrollbar{
        opacity: 0;
    }
```

iOS

使用一个稍微高一些div包裹住这个有滚动条的div然后设置overflow:hidden挡住之

```
    // CSS
    .wrap{
        height: 100px;
        overflow: hidden;
    }
    .box{
        width: 100%;
        height: -webkit-calc(100% + 5px);
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
    }

    // HTML
    <div class="wrap">
        <div class="box"></div>
    </div>
```

#### 设置placeholder时候 focus时候文字没有隐藏

```
    input:focus::-webkit-input-placeholder{
        opacity: 0;
    }
```

#### 移动端不同的input对应不同的键盘展示样式

input email

![input_email](/js/essay/resource/input_email.png)

input url

![input_url](/js/essay/resource/input_url.png)

input tel

![input_tel](/js/essay/resource/input_tel.png)

input search

![input_search](/js/essay/resource/input_search.png)

#### background-image和image的加载区别

在网页加载的过程中，以css背景图存在的图片background-image会等到结构加载完成（网页的内容全部显示以后）才开始加载，而html中的标签img是网页结构（内容）的一部分会在加载结构的过程中加载，换句话讲，网页会先加载标签img的内容，再加载背景图片background-image，如果你用引入了一个很大的图片，那么在这个图片下载完成之前，img后的内容都不会显示。而如果用css来引入同样的图片，网页结构和内容加载完成之后，才开始加载背景图片，不会影响你浏览网页内容。

> John Hou:
>> img 图片的资源虽然是在页面渲染的过程中加载的，但是是异步加载的，在 WebView 的开发中，我们也可以让 app 的同学在实例化 WebView 对象的时候设置图片异步加载。 但是图片虽然可以异步加载，但是在浏览器中，对同一域名下资源的并发数是有限的，所以页面中的图片数量巨大时，我们需要考虑延迟加载（lazy loade）。

原文转自：<http://www.alloyteam.com/2015/06/yi-dong-web-wen-ti-xiao-jie/>