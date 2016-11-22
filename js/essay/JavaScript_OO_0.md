### 【转载】基于原型的JavaScript面向对象编程

原文链接：<http://www.maxzhang.com/2013/09/%E5%9F%BA%E4%BA%8E%E5%8E%9F%E5%9E%8B%E7%9A%84JavaScript%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%BC%96%E7%A8%8B/>

> 转载的原因是看到好文就想收藏归纳，方便构建完整的技术体系，本可以收藏个链接，无奈这样的链接总会有各种不确定性，指不定哪天就无法访问。另外一个原因就是参考别人的文章时总会有一些自己的不同于作者的想法，想直接标注，所以转载修改之。

#### 1. 前言

从JavaScript开始流行到今天，学习它的人都会有个疑惑——JavaScript是不是面向对象语言？其实，ECMA-262早就给出了答案，在ECMAScript的第一个版本中就明确指出，ECMAScript是一种面向对象的语言，参见如下引文（参考资源）：

> ECMAScript is an object-oriented programming language for performing computations and manipulating computational objects within a host environment.

既然ECMAScript是面向对象的，那么JavaScript作为ECMAScript的一个分支，当然也是一种面向对象的语言。常见的C#、Java这样面向对象语言是基于类（class-based）的面向对象，而JavaScript是基于原型（prototype-based）的面向对象。由于JavaScript没有类（Class）的概念，并且也不天生具有面向对象的一些特性，所以会有一种观点认为“JavaScript不是真正的面向对象”，这完全是一种误解。面向对象只是一种编程思想，大多人已经习惯了基于类的面向对象编程（OOP），所以面对JavaScript面向对象时显得无从下手。

在网上对JavaScript还有另一种评价——“JavaScript是一种基于（object-based）对象的语言”。这确实没有错，但在我认为，这是JavaScript语言的一种特性，与前面说的基于原型（prototype-based）的面向对象所不同，原型是JavaScript实现面向对象编程的一种方法，这个两个不同维度的概念，并不冲突。（[参考资源](http://www.ecma-international.org/ecma-262/5.1/index.html#sec-4.2)）

本文将描述如何使用原型实现JavaScript的面向对象编程。

#### 2. JavaScript面向对象的基本概念

在讲基于原型的面向对象编程之前，需要先理解JavaScript三个很重要的概念：构造函数（constructor）、原型（prototype）、原型链（prototype chain）。

##### 2.1 构造函数（constructor）和原型（prototype）

与基于类的面向对象语言不同，JavaScript没有类（Class）的概念，取而代之的是构造函数（constructor）。构造函数是在实例化对象时用来初始化对象的，所有构造函数都包含一个名为“prototype”的不可枚举的属性，这个属性就是原型（prototype），JavaScript就是使用它来实现基于原型的继承以及属性共享（[参考资料](http://www.ecma-international.org/ecma-262/5.1/index.html#sec-4.2.1)）。

同时，每个原型（prototype）对象又都包含一个名为“constructor”的不可枚举的属性，它应该始终指向到构造函数（constructor）。不论是构造函数（constructor）还是原型（prototype），都是对象。

> Note： JavaScript的数据类型包括两类：5种原始类型和对象类型，函数（function）是一种特殊的对象。

```
    function F() {}
    alert(F.prototype.constructor === F); // true
```

上面为什么说“应该始终指向到构造函数（constructor）”呢？先看下面的例子：

```
    function F() {}
    F.prototype = {};
    alert(F.prototype.constructor === F); // false
    alert(F.prototype.constructor === Object); // true
```

在给“constructor”属性赋值之后，看起来非常的怪异，显然不太符合常理。有两种方式可以避免这个问题。

第一种，给原型对象添加一个构造函数：

1
2
3
4
5
6
function F() {}
F.prototype = {
    constructor: F,
    method1: funciton() {}
};
alert(F.prototype.constructor === F); // true
第二种，使用预定义的原型对象，预定义的原型对象包含“constructor”属性，并且默认指向构造函数。

1
2
3
function F() {}
F.prototype.method1 = function() {};
alert(F.prototype.constructor === F); // true
上面的这个问题虽然不会影响原型继承，但是很不符合逻辑，建议尽量修复这个问题。

2.2 原型链（prototype chain）

理解原型链是基于原型面向对象编程中最重要的一个环节，我需要将原型链分成两部分说明。

2.2.1 使用new操作符实例化对象的原型链
_proto是理解原型链的关键对象，每一个使用new操作符实例化的对象和函数对象都包含一个proto_属性，它是构造函数“prototype”属性的引用，先看一段代码：

1
2
3
function Foo() {}
var foo = new Foo();
alert(foo.__proto__ === F.prototype); // true，使用new运算符实例化对象的__proto__与构造函数Foo.prototype相等
在chrome控制台下能看到可访问的proto属性：

oop-1

通过上面这段代码，既可证明proto属性是构造函数“prototype”属性的引用。继续看一段代码：

1
alert(Foo.prototype.__proto__ === Object.prototype); // true
为什么上面这段代码会输出true呢？因为Foo的“prototype”属性是一个对象，Foo.prototype是一个预创建的Object类型实例，所以也会包含一个proto属性，而所有Object类型实例的proto属性都会指向到Object.prototype，所以结果输出true。

到这里原型链的脉络就比较清晰了，由于Object.prototype的proto属性指向到null，所以，foo正确的原型链如下图：

oop-2

Note： proto属性只有在chrome或firefox浏览器中才是公开允许访问。

2.2.2 函数（function）对象的原型链
在JavaScript中，函数（function）是一个特殊的对象，所有函数都是构造函数Function的实例，所以，函数的原型链与new操作符实例化对象的原型链会不同，先看下面代码：

1
2
3
function Foo() {}
alert(Foo.__proto__ === Object.prototype); // false
alert(Foo.__proto__ === Function.prototype); // true
从上面代码可以看出，函数Foo的proto属性并不是指向到Object.prototype，而是指向到Function.prototype，这就说明函数Foo是Function的一个实例。继续看代码：

1
2
alert(Function.__proto__ === Function.prototype); // true
alert(Function.prototype.__proto__ === Object.prototype); // true
上面代码可以看出，函数Function自己本身也是构造函数Function的一个实例，这段读起来非常拗口，看下面的图：

oop-3

由此可见，Object、Function、Array等等这些函数，都是构造函数Function的实例。

2.3 instanceof运算符

instanceof运算符返回一个指定的对象是否一个类的实例，格式如：A instanceof B。其中，左操作数必须是一个对象，右操作数必须是一个类（构造函数）。判断过程：如果函数B在对象A的原型链（prototype chain）中被发现，那么instanceof操作符将返回true，否则返回false。

对照上文中的原型链图，看下面的代码：

1
2
3
4
5
6
7
8
9
10
function Foo() {}
var foo = new Foo();
alert(foo instanceof Foo); // true
alert(foo instanceof Object); // true
alert(foo instanceof Function); // false，foo原型链中没有Function.prototype
alert(Foo instanceof Function); // true
alert(Foo instanceof Object); // true
alert(Function instanceof Function); // true
alert(Object instanceof Function); // true
alert(Function instanceof Object); // true
Note：instanceof内部是通过[[HasInstance]]方法运算得到结果（参考资料）。

这节最后，引用一张来自mollypages.org的JavaScript对象结构图：

oop-4

3 基于原型的面向对象编程

前面讲了很多关于原型、原型链的内容，都是为最后的面向对象实现做铺垫，如果不明白原型链的实现机制，基于原型的对象继承将会很难理解。

3.1 封装

先使用构造函数声明一个类，在构造函数中给this添加本地属性，并实例化一个对象，这种方式可以为对象声明一个公共的本地属性：

1
2
3
4
5
6
7
8
function Animal(name) {
    this.name = name;
    this.sleep = function() {
        alert(this.name + ' sleep');
    };
}
var a1 = new Animal('不高兴');
a1.sleep();
Note：类名为Animal，使用大写字母开头，是编程的一种命名约定。

使用prototype也可以实现：

1
2
3
4
5
6
7
8
function Animal(name) {
    this.name = name;
}
Animal.prototype.sleep = function() {
    alert(this.name + ' sleep');
};
var a1 = new Animal('不高兴');
a1.sleep();
但是，两种声明公共属性/方法的方式是有区别的，使用hasOwnProperty().aspx)方法可以用来判断某一个属性到底是本地属性，还是继承自prototype对象的属性，在后面继承章节中将详细说明本地属性与prototype属性的关系。

在执行构造函数和a1对象方法调用时，this变量会绑定到a1对象，在这里就不具体说明this了。

Note：更多关于this的知识，ECMA-262-3 in detail. Chapter 3. This. / 中文版

关于私有属性我不想花过多的语言去描述，这个并不是JavaScript所擅长的。私有属性有一种命名约定以下划线（_）作为开头，一般在看到这种命名约定时，就应当想到，这是对象的一个私有属性，不应该随意修改，如：

1
2
3
4
5
6
function Animal(name) {
    this._isMammal = true;
    this.name = name;
}
Animal.prototype._frenzy = function() {
};
关于私有属性的封装，推荐阅读文章：Private Members in JavaScript / 中文版

3.2 继承

继承分为接口继承与实现继承，因为JavaScript没有接口（interface）的概念，所以无法实现接口继承。先看下面一段代码：

1
2
3
4
5
6
7
8
function Animal() {
    alert('Animal init');
}
Animal.prototype.sleep = function() {
    alert('Animal sleep');
};
var a1 = new Animal(); // alert Animal init
a1.sleep(); // alert Animal sleep
上面这段代码声明了一个Animal类，我现在想声明一个Cat类并继承它，该如何做呢？思考下上面原型链的例子，

1
2
3
4
5
6
7
8
9
10
function Cat() {
    alert('Cat init');
}
Cat.prototype = Animal.prototype;
Cat.prototype.sleep = function() {
    alert('Cat sleep');
};
var c2 = new Cat(); // alert Cat init
c2.sleep(); // alert Cat sleep
a1.sleep(); // alert Cat sleep，这时候a1也输出了Cat sleep
上面这么写很显然是有问题的，这么写会使Cat.prototype与Animal.prototype引用相同对象，修改Cat.prototype的属性值会影响到Animal.prototype。那么，换一种写法：

1
2
3
4
function Cat() {
    alert('Cat init');
}
Cat.prototype = new Animal();
似乎也有问题，在给Cat.prototype属性赋值时，会实例化Animal。我们只是希望继承Animal.prototype，并不希望执行Animal的构造函数。这时候，我们可以利用一个空对象作为中介，实现对Animal的原型继承：

1
2
3
4
5
6
7
8
9
10
11
12
13
function Cat() {
    alert('Cat init');
}
function Empty() {}
Empty.prototype = Animal.prototype;
Cat.prototype = new Empty();
Cat.prototype.constructor = Cat;
Cat.prototype.sleep = function() {
    alert('Cat sleep');
};
var c2 = new Cat(); // alert Cat init
c2.sleep(); // alert Cat sleep
a1.sleep(); // alert Animal sleep
总算一切正常，现在来我们来重新组织下Animal与Cat的原型链：

oop-5

将继承的方法封装成一个公共函数：

1
2
3
4
5
6
7
var TemplateClass = function() {};
function chain(object) {
    TemplateClass.prototype = object;
    var result = new TemplateClass();
    TemplateClass.prototype = null;
    return result;
}
大功告成，下面来写一个相对完整的原型继承的例子，这个例子将会描述如何调用父类（super class）的方法：

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
function Animal(name, color) {
    this.name = name;
    this.color = color;
}
Animal.prototype.sleep = function() {
    alert(this.name + ' sleep');
};

var a1 = new Animal('倒霉熊', 'white');
a1.sleep(); // 倒霉熊 sleep

function Cat() {
    // 通过调用父类的构造函数实现初始化
    Animal.apply(this, arguments);
}
Cat.prototype = chain(Animal.prototype);
Cat.prototype.constructor = Cat;
Cat.prototype.greenEye = true;
Cat.prototype.mew = function() {
    alert(this.name + ' mew');
};

var c2 = new Cat('没头脑', 'red');
c2.mew(); // 没头脑 mew
c2.sleep(); // 没头脑 sleep
alert(c2.greenEye); // true

function PersianCat() {
    Cat.apply(this, arguments);
}
PersianCat.prototype = chain(Cat.prototype);
PersianCat.prototype.constructor = PersianCat;
PersianCat.prototype.name = 'persian cat'; // 在原型中声明name属性
PersianCat.prototype.blueEye = true;
PersianCat.prototype.mew = function() {
    // 重写方法并不一定要完全覆写，也可以调用父类方法，执行父类细节之后实现更多细节
    Cat.prototype.mew.call(this);
    alert(this.name + ' miaow');
};

var p3 = new PersianCat('不高兴', 'yellow');
p3.mew(); // 不高兴 mew，不高兴 miaow
p3.sleep(); // 不高兴 sleep
alert(p3.greenEye); // true
alert(p3.blueEye); // true
alert(p3.__proto__.name); // 输出persian cat，本地name属性赋值之后，并不会覆盖prototype中name属性的值
下面通过一个更详细的原型链图，来描述这个例子中本地属性与prototype属性之间的关系：

oop-6

通过这个图，大家应该也看明白了，a1、c2、p3中的是本地属性，其他的都是prototype属性，从例子的运行结果可以知道，对本地属性赋值，并不会覆盖prototype属性。在使用this访问对象的属性或方法时，是先从本地属性中查找，如果未到，那么它会向上遍历原型链，直到找到给定名称的属性为止，当到达原型链的顶部（也就是Object.prototype）仍然没有找到指定的属性，就会返回undefined。

chain()函数也可以使用Object.create()函数替代，可以简单的理解成Object.create().aspx)完成的工作与chain()一样。这样可以对上面例子的代码再优化，将类继承封装成一个独立函数：

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
var TemplateClass = function() {},
    chain = Object.create || function(object) {
        TemplateClass.prototype = object;
        var result = new TemplateClass();
        TemplateClass.prototype = null;
        return result;
    };

function extend(SubClass, SuperClass, overrides) {
    var subProto, name;
    SuperClass = SuperClass || Object;
    SubClass.prototype = chain(SuperClass.prototype);
    subProto = SubClass.prototype;
    subProto.constructor = SubClass;
    if (overrides) {
        for (name in overrides) {
            if (overrides.hasOwnProperty(name)) {
                subProto[name] = overrides[name];
            }
        }
    }
}
例子代码重构：

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
function Animal(name, color) {
    this.name = name;
    this.color = color;
}
extend(Animal, Object, {
    sleep: function() {
        alert(this.name + ' sleep');
    }
});

var a1 = new Animal('倒霉熊', 'white');
a1.sleep(); // 倒霉熊 sleep

function Cat() {
    Animal.apply(this, arguments);
}
extend(Cat, Animal, {
    greenEye: true,
    mew: function() {
        alert(this.name + ' mew');
    }
});

var c2 = new Cat('没头脑', 'red');
c2.mew(); // 没头脑 mew
c2.sleep(); // 没头脑 sleep
alert(c2.greenEye); // true

function PersianCat() {
    Cat.apply(this, arguments);
}
extend(PersianCat, Cat, {
    name: 'persian cat',
    blueEye: true,
    mew: function() {
        Cat.prototype.mew.call(this);
        alert(this.name + ' miaow');
    }
});

var p3 = new PersianCat('不高兴', 'yellow');
p3.mew(); // 不高兴 mew，不高兴 miaow
p3.sleep(); // 不高兴 sleep
alert(p3.greenEye); // true
alert(p3.blueEye); // true
4 结束语

以上是我的关于JavaScript基于原型的面向对象编程的全部。（完）