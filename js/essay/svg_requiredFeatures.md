# SVG requiredFeatures 属性说明

requiredFeatures 属性是 SVG 中用来明确告诉浏览器，要渲染该元素，必须支持的功能；

requiredFeatures 的属性值可以是由空格分隔的多个 feature string. 如果浏览器全部支持 `requiredFeatures` 所列出来的功能，那么属性的结果为 `true`. 元素就能被浏览器正确的渲染，否则浏览器将忽略这个元素。

如果没有显示的指定 requiredFeatures 属性，则值为 true, 如果指定了 requiredFeatures 属性，但是值为 "" ，则值为 false.

requiredFeatures 属性通常和 switch 元素一起使用，使浏览器在不支持 SVG 的某些元素时还有能一个比较好的回退方案。

示例如下：

浏览器要渲染 `foreignObject` 元素及其子元素，则浏览器必须支持 `http://www.w3.org/TR/SVG11/feature#Extensibility` 功能，否则显示一行文案 "您的浏览器暂不支持 foreignObject 元素"。

```
 <switch>
   <foreignObject x="100px" y="50px" width="100%" height="80px" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility">
     <body>
        ...
     </body>
   </foreignObject>
   <text x="100px" y="75px">您的浏览器暂不支持 foreignObject 元素</text>
 </switch>
```

> switch 元素回告诉浏览器，如果元素的 requiredFeatures 属性值为 true 时才会渲染第一个直接子元素，否则忽略渲染之后的元素。

#Reference

* <https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/requiredFeatures>