### CentOS7 安装 Docker

如果你的系统没有修改过系统默认的 python 那么就直接按照接下来的步骤安装就没有问题了。

如果有同学和我一样之前在把系统默认的 python 更新为 python3 而又没有更新过 `/usr/bin/yum` 文件的话，应该也会出现如下问题：

```
    File "/usr/bin/yum", line 30
        except KeyboardInterrupt, e:
    SyntaxError: invalid syntax
```

这个问题的原因就是因为更换了系统默认的 python 导致的， `yum` 是使用 python2 编写的。

#### 解决办法：

```
    // 通过 root 用户修改 /usr/bin/yum 的权限为写权限
    # chmod u+w /usr/bin/yum
    
    # vi /usr/bin/yum
    
    // 修改第一句为 python2 的软连接
    
    #!/usr/bin/python2
    
    // 撤销 /usr/bin/yum 的写权限
    # chmod u-w /usr/bin/yum
```

#### 通过 yum 安装 Docker 的步骤

#### 第一步 以 root 权限登录系统，或者以 sudo 操作命令。

#### 第二步 确保系统中已有的包为最新

```
    yum update
```

> Note: 这个过程可能需要一些时间

#### 第三步 新增 Docker 的 .repo 文件

```
    $ sudo tee /etc/yum.repos.d/docker.repo <<-'EOF'
    [dockerrepo]
    name=Docker Repository
    baseurl=https://yum.dockerproject.org/repo/main/centos/7/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.dockerproject.org/gpg
    EOF
```

#### 第四步 安装 Docker 

```
    sudo yum -y install docker-engine
```

#### 第五步 激活服务

```
    sudo systemctl enable docker.service
```

#### 第六步 启动 Docker 容器

```
    sudo systemctl start docker
```

#### 第七步 通过运行一个测试镜像来验证是否正确安装

```
    sudo docker run --rm hello-world
    
     Unable to find image 'hello-world:latest' locally
     latest: Pulling from library/hello-world
     c04b14da8d14: Pull complete
     Digest: sha256:0256e8a36e2070f7bf2d0b0763dbabdd67798512411de4cdcf9431a1feb60fd9
     Status: Downloaded newer image for hello-world:latest
    
     Hello from Docker!
     This message shows that your installation appears to be working correctly.
    
     To generate this message, Docker took the following steps:
      1. The Docker client contacted the Docker daemon.
      2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
      3. The Docker daemon created a new container from that image which runs the
         executable that produces the output you are currently reading.
      4. The Docker daemon streamed that output to the Docker client, which sent it
         to your terminal.
    
     To try something more ambitious, you can run an Ubuntu container with:
      $ docker run -it ubuntu bash
    
     Share images, automate workflows, and more with a free Docker Hub account:
      https://hub.docker.com
    
     For more examples and ideas, visit:
      https://docs.docker.com/engine/userguide/
```