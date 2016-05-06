#### seajs工具方法之 util-events.js

```
var events = data.events = {}

seajs.on = function(name, callback) {
  var list = events[name] || (events[name] = [])
  list.push(callback)
  return seajs
}
```

> 在 `seajs.data` 对象上注册 events 对象，作为seajs的事件队列，用来记录绑定/解绑的事件及事件处理器

> `seajs.on` 绑定事件的方法，参数 `name` 事件名称， `callback` 对应的事件处理器。

```
seajs.off = function(name, callback) {

  if (!(name || callback)) {
    events = data.events = {}
    return seajs
  }

  var list = events[name]
  if (list) {
    if (callback) {
      for (var i = list.length - 1; i >= 0; i--) {
        if (list[i] === callback) {
          list.splice(i, 1)
        }
      }
    }
    else {
      delete events[name]
    }
  }

  return seajs
}
```

> `seajs.off` 解绑事件的方法， 参数 `name` 事件名称，`callback` 事件处理器名称。如果不提供 `name` 和 `callback` （如下调用）, 则解绑事件队列中的所有事件。