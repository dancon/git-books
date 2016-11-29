### 6 Assigning property values, Cascading, and Inheritance

原文链接： <https://www.w3.org/TR/CSS22/cascade.html>

#### 6.1 Specified, computed, and actual values

用户代理一旦开始解析并构建 DOM 树，那么就必须为 DOM 树中的每个元素的每个属性赋予一个值。

然而每个属性的最终值 `Final value` 却是通过四步计算得来的：

第一步：通过每个属性的规范说明的默认值或者是用户显示通过 CSS 规则指定的一个值，称为 `Specified Value`；

第二步：`Specified Value` 被解析为 DOM 树继承时使用的值，称为 `Computed Value`;

第三步：`Computed Value` 在必要时会被转换为一个绝对值，称为 `Used Value`;

第四步：最后 `Used Value` 会由于本地环境的限制再做一次近似转化，比如 `Used Value` 是 1.5px, 但是某些浏览器不支持 .5px 会做一次近似取值，最终的值是 2px, 称为 `Actual Value`;

##### 6.1.1 Specified Value

首先，用户代理会按照以下的机制来为每个元素分配一个 `Specified Value`: （按照优先级高低排序）

1. 如果属性有一个 `级联值`, 那么就使用这个值。 除此之外，如果属性的值是 'inherit', 那么 `Specified Value` 会在本文的 "The 'inherit' value" 部分定义；

> Note: 这个级联值可以简单的理解为是用户在样式中指定的值。

2. 否则，如果属性是继承而来的并且不是 DOM 树的根元素，那么就使用父元素的 `Computed Value`;

3. 否则，就使用属性的初始值，属性的初始值是由属性的定义来规定的；

##### 6.1.2 Computed Value

在用户代理解析级联样式阶段 `Specified Value` 被解析为 `Computed Value`. `Computed Value` 必须是在用户代理渲染文档之前计算得来的。

元素各个属性的 `Computed Value` 是在各自定义的 Computed Value 部分来说明的，如果属性的 Specified Value 是 inherit, 在本文的 Inheritance 部分说明。

就算一个属性对某种类型的元素不生效，那么这个属性的 Computed Value 也会有一个值。有一些属性可能会根据该属性是否对元素生效来定义一个 Computed Value.

##### 6.1.3 Used Value

属性的 Computed Value 通常是在文档渲染前计算得出的，然而，有些值必须等到元素渲染出来后才能得知，比如：我们为某个元素的 width 属性设置一个百分比值，那么这个元素的 width 就必须等到它的的 Containing Block 的 width 值确定后才能计算得出。所以 Used Value 就是一个等待 Computed Value 和任何存在依赖都处理完后得到的那个绝对值。

##### 6.1.4 Actual Value

原则上来讲，Used Value 就是元素渲染时使用的值，但是并不是所有的用户代理都能直接把 Used Value 用在当前环境下。比如：有些浏览器只能使用整型像素值来渲染元素的 border-width 属性，那么这些浏览器就会对浮点类型的 Used Value 进行一些近似处理。所以 Actual Value 就是 Used Value 在进行近似处理后的值。