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