### image的complete属性和load事件

#### 情景

在做一次活动页时，有些动画需要在某个大背景图加载完成之后才触发，所以理所当然的把这些触发动作放到了这个img的load事件处理器中。

```
$('#bg-img').on('load', function(){
    // fire the subsequent animation
    ......
});
```

##### 期望

图片加载完成后，触发该图片的load事件，然后触发后续要执行的动画。

##### 实际

图片的load事件并不是每次都会触发，存在偶然性

#### 解决

```
$('#bg-img').one('load', function(){
    // fire the subsequent animation
        ......
}).each(function(){
    this.complete && $(this).trigger('load');
});
```

> 相较上面的代码，这里有一个小小的优化，绑定load用`one`而没有用`on`，这里我希望load事件只被触发一次，而且避免被手动重复触发。

> 还有一个需要注意的就是， 如果使用的是jquery, 触发load事件时，我们可以使用`.load()`来触发，如果你使用的是zepto,那么就只能乖乖使用`.trigger('load')`。

#### 分析

这里我们需要详细分析下image的load时间和complete属性。

MDN上对load事件的描述如下：

> The load event is fired when a resource and its dependent resources have finished loading.

简单描述就是， load事件是在一个资源并该资源的依赖资源完成加载后触发。

这句话的关键是`finished loading`, 也就是说用户代理（浏览器/webView）第一次从服务器上请求资源完成，这算`finished loading`, 当再次刷新这个页面，如果浏览器使用了上次请求的资源（缓存到本地的资源）,那就不算loading, 也就不会触发资源的load事件。当然浏览器命中本地缓存的策略没有深入了解过，这里暂且不表，深入研究后在与大家分享。

接下来就是complete属性

MDN对imageElement的complete的描述如下：

> HTMLImageElement.complete `Read only`

> Returns a Boolean that is true if the browser has finished fetching the image, whether successful or not. It also shows true, if the image has no src value.

简单翻译下，这是一个只读属性，返回一个boolean值，如果浏览器完成了图片的抓取，无论成功与否，即使这个img元素没有src属性，该属性值都为ture.

这个定义的关键在`finished fetching`，换个说法，这个属性只是用来表明浏览器是否履行了他的职责（fetch）, 与图片是否能正常显示没有关系（图片的显示是开发者的责任），所以同一个页面进行第二次刷新的时候，如果浏览器还记得他已经fetch过这个图片了（表现上就是浏览器有缓存），那么这个属性值就是true, 否则就是false. 它跟图片的load事件没有直接关系，但是有间接关系，如果complete值为ture话（这种情况都是非首次加载页面）, 那就表明浏览器去抓取过图片了，那图片就有可能被缓存，这时load事件就不会自动触发，这种情况就需要像如上解决方案中的那样手动触发load.

#### reference

[【MDN】load事件描述](https://developer.mozilla.org/en-US/docs/Web/Events/load)
[【MDN】htmlImageElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
