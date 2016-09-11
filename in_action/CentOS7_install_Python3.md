### CentOS7 安装 Python3

在 CentOS7 中默认安装 Python2 , 如果我们需要安装 Python3 我们需要从源码编译然后安装。
  
准备工作，我们最好在系统 root 用户下操作

```
    su
    // 然后输入 root 密码
```
  
第一步： 从官网下载源码，下载地址<https://www.python.org/ftp/python/3.5.2/Python-3.5.2.tgz>

第二步： 解压安装包到指定位置

```
    tar -xzvf Python-3.5.2.tgz -C /usr/local/Python3
```

第三步： 进入解压包

```
    cd /usr/local/Python3/Python-3.5.2
```

第四步： 进行环境检测并生成 makefile

> NOTE: 这一步必须成功，只有生成 makefile 才能进行下一步编译

```
    ./configure
```

第五步： 编译生成可执行文件

> NOTE: 在这一步完成会在 /usr/local/Python3/Python-3.5.2 中新生成 python 可执行文件

```
    // 在当前目录下执行 make 进行编译
    make
```

第六步： 编译成功后，安装软件

```
    // 在当前文件目录下执行以下命令
    make install
```

第七步： 配置环境变量

> NOTE: 因为系统自生安装了Python, 所以在第六步完成之后，我们执行命令 python 系统依然显示的是系统默认的 python

```
    PATH = $PATH:/usr/local/Python3/Python-3.5.2/python
    
    // 配置好后，我们可以查看是否配置成功
    echo $PATH
```

第八步： 进入 /usr/bin 删除 `python`, 并重新创建软连接

```
    cd /usr/bin
    
    rm -rf python
    
    ln -s /usr/local/Python3/Python-3.5.2/python ./python
```

至此在 CentOS7 中就成功的安装了 Python3, Enjoy yourself!!!