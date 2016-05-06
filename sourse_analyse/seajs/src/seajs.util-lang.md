#### seajs 工具方法之 util-lang.js

```
function isType(type) {
  return function(obj) {
    return {}.toString.call(obj) == "[object " + type + "]"
  }
}

var isObject = isType("Object")
var isString = isType("String")
var isArray = Array.isArray || isType("Array")
var isFunction = isType("Function")
var isUndefined = isType("Undefined")

var _cid = 0
function cid() {
  return _cid++
}
```

> 开始分析前，首先要吐槽下这个代码风格，一堆的var, 并且没有 `;` 结尾，每个变量都由var来声明，有个好处就是方便调试时打断点，缺点就是源码被有点代码洁癖的人看到后，会被吐槽 :-D

> isType 函数通过 call 调用 Object 的原型方法 toString 来判定对象的类型，isType返回一个函数，分别赋值给对应类型的变量上。

> 变量_cid 及 函数cid()，是一个全局递增器, 主要在 seajs.use方法中在构造模块的uri时使用，确保uri的唯一。