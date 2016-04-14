### 简介

white-space 属性是用来描述处理元素内部的空白字符的方式的。

### 注意事项

<table>
    <tr>
        <td>初始值</td>
        <td>normal</td>
    </tr>
    <tr>
        <td>适用于</td>
        <td>所有元素</td>
    </tr>
    <tr>
        <td>是否是集成属性</td>
        <td>是</td>
    </tr>
    <tr>
        <td>是否适用于动画</td>
        <td>否</td>
    </tr>
</table>

### 语法

> white-space: normal | nowrap | pre | pre-wrap | pre-line

### 属性值

**normal**

    多个连续的空白字符会被合并，代码中的换行符也会被按空白字符来处理。在填充line boxes的时候会折行。

**nowrap**

    对空白字符的处理和normal一样，但是文本行不会折行。

**pre**

    连续的空白字符会被保留，文本行只有在遇到回车符、 br 元素的时候才会折行，填充line boxes是不会折行的。

**pre-wrap**

    连续的空白字符会被保留，文本行在遇到回城符、br元素、填充line boxes必须折行时才去折行。

**pre-line**

    唯一与pre-line不同的地方在于连续的空白符会被合并，折行的机制是一致的。

通过一个表格来总结各属性的作用

|       | 回车符 | 空格/tab | 是否会折行 |
| :----:|:-----:|:--------:|:--------:|
| normal | 合并 | 合并 | 是 |
| nowrap | 合并 | 合并 | 否 |
| pre | 保留 | 保留 | 否 |
| pre-wrap | 保留 | 保留 | 是 |
| pre-line | 保留 | 合并 | 是 |

### 使用技巧

其实在平时的开发中，我们使用这个属性时，最常使用的属性值是*nowrap*, 并配合*text-overflow*和*overflow*来实现文本超长不折行，并自动隐藏超出部分，并转换为...

如下代码：

```
    .no-wrap{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
```