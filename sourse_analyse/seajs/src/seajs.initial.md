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

var data = seajs.data = {}
```

> 定义全局seajs对象，并表明版本号

> data 是注册到 seajs 对象上的一个对象，可以用来查看seajs所有配置以及一些内部的变量值，可以用与插件开发，也可以用于代码调试。

#### data实例

如下data结构是我只设置base事的结构：

```
{
    base: 'http://localhost:8080/seajs/src/',
    charset: 'utf-8',
    cid: function cid(){},
    cwd: 'http://localhost:8080/seajs/',
    dir: 'http://localhost:8080/seajs/seajs/lib/',
    events: {},
    fetchedList: {
        'http://localhost:8080/seajs/src/index.js': true,
        'http://localhost:8080/seajs/src/modela.js': true,
        'http://localhost:8080/seajs/src/modelb.js': true
    },
    loader: 'http://localhost:8080/seajs/lib/sea-debug.js'
}
```