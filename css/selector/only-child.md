### :only-child 伪类

:only-child 伪类能够命中父容器中只有一个子元素的元素，效果和 `:first-child:last-child` 或者 `:nth-child(1):nth-last-child(1)` 一样。

#### 兼容性

![caniuse_only-child](/css/resource/caniuse_only-child.png)

> 从 [can i use](http://caniuse.com/#search=only-child) 的分析来看，在不考虑 IE8 的情况下，我们还是可以放心大胆的使用的。

#### 例子

HTML:

```
    <ul class="only-child">
        <li>只有一个子元素</li>
    </ul>

    <ul class="multiple-children">
        <li>第一个元素</li>
        <li>第二个元素</li>
    </ul>
```

CSS:

```
    li{
        color: #999;
    }
    li:only-child{
        color: #333;
        font-weight: 600;
    }
```

效果：

<style>
    li{
        color: #999;
    }
    li:only-child{
        color: #333;
        font-weight: 600;
    }
</style>

只有一个元素：
<ul class="only-child">
    <li>只有一个子元素</li>
</ul>

两个元素：
<ul class="multiple-children">
    <li>第一个元素</li>
    <li>第二个元素</li>
</ul>
