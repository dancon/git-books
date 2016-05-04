#### seajs的初始化代码

```
if (global.seajs) {
  return
}
```
> 检测全局对象上是否已经实例化了seajs对象，避免重复加载

```
var seajs = global.seajs = {
  version: "3.0.1"
}
```

> 定义全局seajs对象，并表明版本号