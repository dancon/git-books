### 初始visual formatting module

这一章节和下一章节都在描述visual formatting module（可视化格式模型）: 用户代理（各种浏览器、app中内嵌的渲染引擎）在可是媒介（纸质媒介、听觉浏览器、显示器）中处理 DOM树。

在visual formatting module中，DOM树中的每个元素都会根据各自的盒模型（Box module）生成零个或者多个盒模型（Boxes）, 而这些盒模型的布局由以下条件决定：

* 盒子的尺寸和类型（由display属性声明的类型）
* 定位系统（正常文档流，浮动，绝对定位）
* DOM树种元素之间的关系（比如一个块元素包含了一个浮动元素，后面元素的布局就会受到前面元素和包含块（*Containing Box*）的影响）
* 客观因素（视口的到大小，图片的固有大小等）

本章和下章中定义的属性同时适用于*continuous media* 和 *paged media*, 然而 ***margin properties*** 的意义在应用与 *paged media* 时将发生变化。

##### NOTE:
>continuous media: 其实就是我们在浏览器中看到的，所有的内容连续出现，通过viewport 滑动来查看页面的各个部分。

>paged media: 分页的内容，比如内容必须打印（print）出来, 这是就需要分页打印机才能打印。

visual formatting module 并没有说明所有格式化的所有细节（比如：他就没有说明letter-space的算法）。 在本规范中没有包含的那些格式化问题可能会由于用户代理的一致性（conforming user agents）而表现的不同。