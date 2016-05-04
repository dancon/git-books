
#### seajs 整体结构


```
(function(global, undefined){

    // 这里就是seajs 的实现逻辑

})(this);
```
> seajs的所有逻辑都包含在一个自执行的函数闭包里，并向闭包注入了 `global`, `undefined` 两个变量， 对外（在全局作用域中）只提供两个接口， `seajs对象` 和 `definde` 方法。

> 闭包结构如左侧代码：
