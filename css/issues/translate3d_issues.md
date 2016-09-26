### translate3d 问题记录

我们在制作动画的时候，为了让动画运行的更加流畅，很多时候都会用到 `transform: translate3d(...)` 或者通过 `transform: translateZ(0)` 来开启 GPU 加速。

在 iOS 和 高版本（4.4+）的 Android 系统是没有问题的，但是在某些低版本的安卓系统中却会表现出一些莫名其妙的问题。记录如下：

1. 在 Android 4.2 中 设置 `transform: translateZ(0)` 文字变糊。

![translate3d](/css/resource/translate3d.png)
![translate2d](/css/resource/translate2d.png)

> Note：截图效果效果不是特别明显，在手机中看着就明显多了。

2. 有 `position: fixed | absolute` 定位的元素不会重绘，明显的例子是页面中的吸顶效果失效，吸顶后即使修改 `position: absolute` 也不生效。

效果如下：

![fixed_top_bug](/css/resource/fixed_top_bug.gif)

> Note: 造成这个问题的具体原因不清楚，猜测就系统对 translate3d 支持的不好，导致了这样的问题

使用的测试手机：

* Lenovo A678t Android 4.2.2
* HUAWEI Y511-T00 Android 4.2.2