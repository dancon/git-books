### 在 window 下编译 Node.js 源码

为什么要编译 Node.js 源码，重要原因还是为了编写 Node.js Addons, 编写 Node.js 的扩展需要引入 Node.js 的库。如下是我在我的 windows10 中编译的过程。

具体的过程可以参见官方说明：[Building](https://github.com/nodejs/node/blob/master/BUILDING.md)

#### 准备工作
1. 安装 Python 2.7 or 2.6

   > Note: Node.js 不支持 Python3, 貌似是 node-gyp 不支持

2. 安装以下工具的一种
    * [Visual C++ Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools)
    * [Visual Studio 2015 update3](https://www.visualstudio.com/)

   > Note：我安装了 Visual Studio 2015 社区版

3. 为了一些测试，我们需要一些 UNIX 工具，如果你安装了 Git for Windows 那就没有问题了，因为他包含了全局的 git bash.

#### 开搞

第一步：下载源码，通过 git clone 下载源码

```
   > git clone git@github.com:dancon/node.git
```

> Note: 因为 node 项目比较大，下载需要一段时间，这里是我自己 fork 的库

第二步：源码下载完成后，进入项目根目录，然后通过 node 提供的 vs 编译脚本进行编译

```
    > cd node root path
    > vsbuild nosign
```

> Note: 这个过程耗时也会长，我在得笔记本上进行了半个多小时，编译成功后会在 node 项目的根目录下生成一个 Release 目录，其中包含 Node.je 7.0.0 的预览版本，也包含我们需要的 lib 库 `node.lib`.

编译成功后，控制台输出如下内容：

![compile_node_success](/in_action/resource/compile_node_success.png)

生成的目录结构如下：

![node_release_folder](/in_action/resource/node_release_folder.png)

![node_lib](/in_action/resource/node_lib.png)

第三步：直接验证编译后的 Node.js 是否正确

```
   > Release/node -e "console.log('Hello from Node.js', process.version)"
```

结果如下：

![validate_node](/in_action/resource/node_build_test.png)

至此，我们就成功的完成了在 windows 中 Node.js 的编译。

大家也可以从这里下载我编译好的 [node.lib](https://github.com/dancon/node/raw/master/Release/node.lib)