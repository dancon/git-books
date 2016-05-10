### 函数声明提升

在ES5 中存在这样的事实，`变量声明提升` ，`函数声明提升`。 在抛出这篇文章要讨论的问题之前，我们先来解释下这两个概念。

**变量声明提升**： 通过 `var` 声明的变量在代码执行之前被js引擎提升到了当前作用域的顶部。

**函数声明提升**： 通过函数声明的方式（非函数表达式）声明的函数在代码执行之前被js引擎提升到了当前作用域的顶部，而且函数声明提升优先于变量声明提升。

#### 示例代码

##### 1. js中变量没有声明就直接使用，是会导致引用错误的，如下:

```
console.log(a);
```

运行结果：

> Uncaught ReferenceError: a is not defined(…)

##### 2. 变量声明提升

```
console.log(a);
var a = 1;
```

运行结果：

> undefined

没有报错，而是输出了undefined, 说明变量声明 `var a` 被提升到了作用域的顶部， `console.log` 进行RHS引用时找到了变量 `a`, 所以没有报错。

##### 3. 函数声明提升

```
a();

function a() {
    console.log('This is a function body');
}
```

运行结果：

> This is a function body

函数的调用发生在函数声明之前，但是依旧正常执行。其实真正的函数声明只包含如下部分：

```
function () {
    console.log('This is a function body');
}
```

这部分执行的结果就是创建了一个函数对象，我们假设为 `funcObj`。

`a` 只是指向 `funcObj` 的指针，函数声明提升，提升的应该是创建 `funcObj` 的过程，也就是上述的代码块。

> 在一些引擎的实现中，`a` 也会赋值给 `funcObj` 对象上的一个 `name` 属性。 比如 a.name 会输出 a

##### 4. 函数声明提升优于变量声明提升

```
a();

var a;
function a() {
    console.log(1);
}
a = function() {
    console.log(2);
}

a();
```

运行结果：

> 1

> 2

上述代码会被js引擎解析为如下：

```
function a() {
    console.log(1);
}
a();
a = function() {
    console.log(2);
}
a();
```

`var a ;` 属于重复声明，被忽略掉了。然而后续的函数声明还是会覆盖之前的函数声明。如下：

```
a();

var a;
function a() {
    console.log(1);
}
a = function() {
    console.log(2);
}
function a() {
    console.log(3);
}
```

运行结果：

> 3

所以得出如下猜想：

> 函数声明提升其实做了两个提升动作：
>> 1. 函数名变量提升，类似变量声明 `function a()`;
>> 2. 函数定义提升 `{ /*function body*/ }` .

>也就是说通过函数声明的方式定义一个函数会有以下三个步骤（或者说两个也可以，第三个可以归并到第二步中）（YY而已，不要当真）：
>> 1. 声明函数名变量 `a`
>> 2. 创建函数对象 `funcObj`
>> 3. 把函数名变量 `a` 指向函数对象 `funcObj`

> 而一般的函数声明提升会把这三个步骤都提升到作用域的顶部。

#### 一般的函数声明提升的结果如上所述，那不一般的函数声明提升又会是什么样的呢？

问题如下：在chrome 49, FF 46, IE 11中运行如下代码都得出类似结果

```
(function(){
    console.log(a);
    if(false){
        console.log(a());
        function a(){
            console.log('true');
        }
    }
   a();
})();
```

chrome运行结果：

> undefined

> Uncaught TypeError: a is not a function

奇怪吧？！函数提升发生在所有代码执行之前，所以，尽管a 的定义过程写在了 if 分支中，但是理论上或者说ES6之前， 它是不会影响函数声明提升的，而现在，在作用域顶部 `console.log(a)` 输出 `undefined` , 而执行 `a()` 发生TypeError。 我们稍作如下修改：

```
(function(){
    console.log(a);
    if(true){
        console.log(a());
        function a(){
            console.log('true');
        }
    }
   a();
})();
```

chrome运行结果：

> undefined

> true

> true

再做一次修改：

```
(function(){
    'use strict';

    if(true){
        console.log(a());
        function a(){
            console.log('true');
        }
    }
    console.log(a);
})();
```

chrome运行结果：

> true

> Uncaught ReferenceError: a is not defined

这个就说明问题了，现代浏览器已经开始支持块作用域了， 只是在非严格模式下，只有函数名变量声明会提升到当前闭包的顶部，这也是不管if 分支是否成立，在它之前 `console.log(a)` 都会输出 `undefined` 的原因。 而函数定义提升只提升到了if 的块作用域内，这就是在if 为真时，在if块内且在函数声明之前 `console.log(a())` 会输出 `true` 的原因。 但是在严格模式下， 函数名变量的提升也只提升到了if 块的顶部。这就是在严格模式下，在if 块外部对a 进行RHS引用是报 TypeError 的原因。

由此引申出另一个问题： 是不是在现代游览器中，使用严格模式就存在块作用域了呢？测试代码如下：

```
(function(){
    'use strict';
    for(var i = 0 ; i < 2 ; i ++){
        function a() {
            console.log(i);
        }
    }

    a();
})();
```

chrome 运行结果：

> Uncaught ReferenceError: a is not defined

去掉 `'use strict';` 运行结果：

> 2

结论：

> 在现在浏览器中，在严格模式下就存在了块作用域。