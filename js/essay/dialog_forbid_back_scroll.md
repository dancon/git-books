### 移动端弹框后禁止背景屏幕滑动的解决方案

弹框是在 PC 端和移动端常见的提示组件，一般情况下，弹框出现后都需要锁定背景页面，以免干扰用户的关注点。

实现弹框的逻辑不是今天要讨论的中重点，重点是要讨论弹框弹出后如何锁定背景。

在 PC 端实现背景页面锁定直接为 `body` 添加 `height: 100%; overflow: hidden;` 即可实现，但是在移动端实现就没有这么简单了。

通常实现移动端背景页面锁定有三种方法，但是各有优劣，如下进行详细介绍：

第一种：同时为 `body, html` 设置 `overflow:hidden`

CSS:
```
    .lock-back{
        height: 100%;
        overflow: hidden;
    }
```

JS:
```
    // 弹出时
    $('html, body').addClass('lock-back');

    // 隐藏时
    $('html, body').removeClass('lock-back');
```

#### 缺点：

1. 这种方法并不能在所有的移动设备上生效。
2. 生效后，但是背景页面会滚动到顶部，弹框隐藏后页面也无法滚动到弹框时的位置。

第二种：弹框弹出时，设置 `body` 元素定位为 fixed, 然后设置 top 为页面滚动的高度，弹框隐藏时移除 `body` 的 fixed 定位，并把页面重新滚动到之前的位置。

JS:
```
    // 弹出时
    $('body').css({
        position: 'fixed',
        top: -document.body.scrollTop + 'px'
    });

    // 隐藏式
    var top = -document.body.style.top.replace('px');
    $('body').css({
        position: static
    });
    window.scrollTo(0, top);
```

#### 优点

克服了第一种方法的缺点

#### 缺点

在弹框弹出和隐藏时，由于页面发生了 top 和页面滚动，所以页面会有闪烁的情况。

第三种：为 `body` 绑定 `touchmove` 事件，然后调用 `preventDefault()` 方法，禁止 `touchmove` 的默认行为。

JS:
```
    function preventDefaultFn(event){
        event.preventDefault();
    }

    // 弹出时
    $('body').on('touchmove', preventDefaultFn);

    // 隐藏时
    $('body').off('touchmove', preventDefaultFn);
```

#### 缺点

如果弹框不会有元素发生滚动，这种方案并没有什么后遗症，但是一旦弹框中还有滚动的内容，后遗症就出现了，滚动内容也无法滚动。这时候唯一的方法就是为弹框中的元素模拟滚动。

JS:

```
    var touches = {};
    $dailogContent.on('touchstart', function(event){
       touches.startY = event.targetTouches[0].pageY;
       touches.current = $content[0].scrollTop;
       touches.startTime = new Date().getTime();

     }).on('touchmove', function(event){
       // 跟手滚动
       $content[0].scrollTop = (touches.startY - event.targetTouches[0].pageY) + touches.current;

     }).on('touchend', function(event){

       // 手指离开后，模拟缓动
       var endTime = new Date().getTime(),
         endPos = event.changedTouches[0].pageY,
         ratio = (endPos - touches.startY) / (endTime - touches.startTime),
         slowmoving = ratio * 180,
         curPos = $content[0].scrollTop;

       if(Math.abs(ratio) > 0.5){
         animation(400, function(process){
           $content[0].scrollTop = curPos - slowmoving * process;
         });
       }
     });
```

OK, 总结结束，enjoy yourself.