### String.prototype.replace

`replace()` 方法返回一个替换了按照匹配规则匹配到的内容的 **新字符串**。 匹配规则可以是字符串，也可以是正则表达式，替换内容可以是字符串，也可以是函数，这个函数将在每个匹配项上调用。

#### 目的

这篇文章只是用来说明下第二个参数为函数的使用方法：

```
string.replace(pattern, function(match, $1, ..., $n, offset, string){});
```

传给回调函数的参数列表

|参数名|描述|
|:-------:|:------:|
|match| pattern 匹配到的字符串|
|$1...$n| 正则捕获到的字符串|
|offset| match 在字符串中的起始下标|
|string| 整个字符串|

#### 示例

我们用一个模板的替换原理来分解replace 第二个参数为函数的使用方法。

```
// 替换模板中{variable}为对应变量的值

var config = {
        name: 'World'
    },
    templateStr = 'Hello, {name}!';

templateStr.replace(/{([^{]+)}/g, function(match, $1, offset, allString){
    return config[$1];
});
```

##### 运行结果

> Hello, World!

运行时，`match`、`$1`、`offset`、`allString` 的值分别为:

```
match      = '{name}'
$1         = 'name'
offset     = 7
allString  = 'Hello, {name}!'
```

#### 第二个参数为字符串时 `$` 含义

| 符号 | 描述 | 示例 |
|:-----|:-----:|:----:|
| $1……$99 | 正则中每个子表达式捕获的文本 | '"a","b"'.replace(/"([^"]*)"/g, '$1'); // a,b  $1 分别为 a 和 b |
| $& | 正则匹配到的每个子串 | '"a","b"'.replace(/"([^"]*)"/g, "{$&}"); // {"a"},{"b"}   $& 分别为 "a" 和 "b" |
| $` | 每个匹配子串左侧的文本 | '"a","b"'.replace(/"([^"]*)"/g, "$`"); // ,"a",  $` 分别为 空串 和 "a", |
| $' | 每个匹配子串右侧的文本 | '"a","b"'.replace(/"([^"]*)"/g, "$'"); // ,"b",  $' 分别为 ,"b" 和 空串 |
| $$ | $符号本身 | '"a","b"'.replace(/"([^"]*)"/g, "$$"); // $,$