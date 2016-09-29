### 弹框后禁止背景屏幕滑动

目前能想到的方法有三种：

1. body overflow:hidden;
2. body fixed 然后移动 document.body.scrollTop
3. touchmove event.preventDefault()

优劣如下：
