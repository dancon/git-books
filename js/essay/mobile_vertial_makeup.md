### 垂直排版

```
.writing-mode(@value){
  -webkit-writing-mode: @value;
  writing-mode: @value;
}

.writing-mode(vertical-rl);
margin: 0 auto;
text-align: right;
letter-spacing: 0.1em;

p:first-child{
font-size: (45/@ratio)/1rem;
padding-left: 0.5em;
}
```