
## ROS 官方镜像

- 官方的、精简的、适用于生产环境的 DockerHub 镜像：[ros - Official Image \| Docker Hub](https://hub.docker.com/_/ros)
- 官方的、带GUI的、适用于开发的 DockerHub 镜像：[osrf/ros Tags \| Docker Hub](https://hub.docker.com/r/osrf/ros/tags?ordering=-name&name=humble)
- ROS2 中关于 Docker 镜像的约定：[REP 2001 -- ROS 2 Variants (ROS.org)](https://www.ros.org/reps/rep-2001.html#humble-hawksbill-may-2022-may-2027)
- ROS 所有 Docker 镜像的 Dockefile 的源码（例如 `ros:humble`，也即`ros:humble-ros-base`）：[docker_images/ros/humble/ubuntu/jammy/ros-base/Dockerfile at master · osrf/docker_images](https://github.com/osrf/docker_images/blob/master/ros/humble/ubuntu/jammy/ros-base/Dockerfile)

## 教程

### ROS2 官方

- [Running ROS 2 nodes in Docker \[community-contributed\] — ROS 2 Documentation: Jazzy documentation](https://docs.ros.org/en/jazzy/How-To-Guides/Run-2-nodes-in-single-or-separate-docker-containers.html)
- [Setup ROS 2 with VSCode and Docker \[community-contributed\] — ROS 2 Documentation: Jazzy documentation](https://docs.ros.org/en/jazzy/How-To-Guides/Setup-ROS-2-with-VSCode-and-Docker-Container.html)

### Docker 官方

- [Docker Docs](https://docs.docker.com/)
- [Ubuntu \| Docker Docs](https://docs.docker.com/engine/install/ubuntu/)

## 最佳实践

可参见：
- [Best practices \| Docker Docs](https://docs.docker.com/build/building/best-practices/)
- [WSL \| Docker Docs](https://docs.docker.com/desktop/features/wsl/)

下面提一些个人心得：

- 在 Dockerfile 中通常**不需要**执行 `apt upgrade`，原因如下（来自 AI）：

  1. **基础镜像已优化**：官方基础镜像（如 ubuntu、debian）通常已经包含了必要的安全更新和优化。
  2. **增加构建时间**：`apt upgrade` 会显著增加镜像构建时间，特别是在频繁构建时。
  3. **增加镜像大小**：升级可能安装不必要的包，增加最终镜像大小。
  4. **可重现性**：避免升级有助于保持构建的一致性和可重现性。
  
  **推荐做法：**
  - 只执行 `apt update` 和安装具体需要的包
  - 如果需要最新安全更新，选择更新的基础镜像版本
  - 在生产环境中，定期更新基础镜像而不是在 Dockerfile 中升级
  
  **例外情况：**
  - 如果有特定的安全需求
  - 需要修复已知的关键漏洞时



## images

### tuna mirror

包括使用清华镜像以加速、添加代理配置（如不需要可注释掉）、设置时区为上海时区：

```Dockerfile
# Select the base image, such as ros2 humble
FROM ros:humble
#FROM osrf/ros:humble-desktop

# Set proxy host and port
ARG HTTP_PROXY_HOST=host.docker.internal
ARG HTTP_PROXY_PORT=7890

# Replace with your proxy host and port or comment out if not needed
ENV http_proxy=http://$HTTP_PROXY_HOST:$HTTP_PROXY_PORT
ENV https_proxy=$http_proxy

# Set the timezone to Shanghai
RUN echo 'Asia/Shanghai' > /etc/timezone && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# Update the apt sources to use Tsinghua University's mirror
RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak
RUN <<EOF cat > /etc/apt/sources.list
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse
EOF

# Add ROS 2 apt repository
RUN apt-get install curl gnupg2 -y && curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
RUN mv /etc/apt/sources.list.d/ros2.sources /etc/apt/sources.list.d/ros2.sources.bak && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] https://mirrors.tuna.tsinghua.edu.cn/ros2/ubuntu jammy main" | tee /etc/apt/sources.list.d/ros2.list > /dev/null

# 手动模拟 rosdep init
RUN mkdir -p /etc/ros/rosdep/sources.list.d/ && curl -o /etc/ros/rosdep/sources.list.d/20-default.list -L https://mirrors.tuna.tsinghua.edu.cn/github-raw/ros/rosdistro/master/rosdep/sources.list.d/20-default.list

# set rosdep mirror to Tsinghua University
ENV ROSDISTRO_INDEX_URL=https://mirrors.tuna.tsinghua.edu.cn/rosdistro/index-v4.yaml

```

### 让 sudo 时使用代理相关环境变量

sudo 时使用代理相关的环境变量，如 `http_proxy` 等：

```Dockerfile
RUN sed -i '/Defaults\s*env_reset/a Defaults env_keep = "http_proxy https_proxy ftp_proxy no_proxy DISPLAY XAUTHORITY"' /etc/sudoers
```

### SSH

为了让容器后续能被 SSH 连接，需要添加以下内容：

```Dockerfile
RUN mkdir /var/run/sshd
EXPOSE 22
USER root
CMD ["/usr/sbin/sshd", "-D"]
```

### 添加用户

以下部分会添加用户 `ubuntu` 并设置密码 `9841`：

```Dockerfile
RUN useradd -m -s /bin/bash -G sudo ubuntu -p '$6$Ri8lP7vRgVxNpBTC$RelZVvhFDpdWkkJSCVQY/WQ7tI36pmrctvJDEdYIAnGp48fBLZnmH/Z0gwDsLF6aOhUuhNwy0Dqs1exKCW0XX1'
USER ubuntu
```

或者（修改其中的`bob`）：

```Dockerfile
ARG USERNAME=bob
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Delete user if it exists in container (e.g Ubuntu Noble: ubuntu)
RUN if id -u $USER_UID ; then userdel `id -un $USER_UID` ; fi

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME
```

这不但会添加用户，还会设置 UID 和 GID，并配置 sudo。

### 添加 ssh 公钥

```Dockerfile
RUN mkdir $HOME/.ssh && chmod 700 $HOME/.ssh 

RUN <<EOF cat > $HOME/.ssh/authorized_keys
ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAQEArWM+lwt05DEKKUwrAyFbW6CYocRAJot7hLA4RmQemIyzy5Dg1o+r8DdBfo8glZ3Ka54tKSmeDSCxpN1p3TOlfTODrCKxHYxp9OP0qHa7ZffMrfBq2gdGJF7rdv1yUflAkR2dd0VodpRqVRgQdrWAIMKvMg3R8Npurzku0djSGqmVU4Dht0qMnGE7l9iKhmiDkjDRpUK4fuQkhR8IcOYDtb0wcrg7o8qUI1eSxj5BrtfsJ22vut6dkNw/qrvGrJuJrG76zv1ZUtZEBQS6kC8JEbXHwtuZ3YKPlST7T5Jhy4jT+gyiQZ0f/kK1nQjcftURjjBoGZw4ViWhSp3YSEHFyQ== rsa-key-20180602
EOF
```

### clangd

自动安装 clangd 最新版本到 `/usr/local//bin/clangd`（这只是片段，使用时可添加到主 Dockerfile 中）：

```Dockerfile
# 安装最新版本的 clangd
RUN CLANGD_VERSION=$(curl -s https://api.github.com/repos/clangd/clangd/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/') && \
    curl -L -o /tmp/clangd-linux.zip "https://github.com/clangd/clangd/releases/download/${CLANGD_VERSION}/clangd-linux-${CLANGD_VERSION}.zip" && \
    unzip /tmp/clangd-linux.zip -d /tmp/ && \
    find /tmp -name "clangd" -type f -executable -exec cp {} /usr/local/bin/clangd \; && \
    chmod +x /usr/local/bin/clangd && \
    rm -rf /tmp/clangd-linux.zip /tmp/clangd_*
```

### cartographer
#### apt version

ROS2 中，可通过 `sudo apt install ros-$ROS_DISTRO-cartographer-ros` 命令一键安装，注意依赖较多，耗时较长，是推荐的安装使用方式。官方 GitHub 位于 [ros2/cartographer_ros: Provides ROS integration for Cartographer.](https://github.com/ros2/cartographer_ros)

这部分内容主要参考 [husarion/cartographer-docker](https://github.com/husarion/cartographer-docker)

##### docker-compose.yaml

```yaml
services:
  cartographer:
    build: .
    volumes:
        - ./config/diffbot_lds_2d.lua:/pr2.lua
    command: >
      ros2 run cartographer_ros cartographer_node
        -configuration_directory /
        -configuration_basename pr2.lua

  cartographer-occ:
    build: .
    command: >
      ros2 run cartographer_ros cartographer_occupancy_grid_node
        -resolution 0.05
        -publish_period_sec 1.0
```
{: file="docker-compose.yaml" }

##### Dockerfile

```Dockerfile
FROM tuna_mirror

ARG ROS_DISTRO=humble

RUN apt update && \
    apt install -y ros-$ROS_DISTRO-cartographer-ros
    #&& \
    # clean to make the image smaller
    #apt autoremove -y && \
    #apt clean && \
    #rm -rf /var/lib/apt/lists/*
```
{: file="Dockerfile" }

#### bili version

从源码编译安装，且源码是修改后的版本：

- 文章：[给 Cartographer 添加全局重定位功能 - 哔哩哔哩](https://www.bilibili.com/opus/826735347140395032/?from=readlist)
- 源码：[wudiyidashi/cartographer_ws](https://github.com/wudiyidashi/cartographer_ws)

##### Dockerfile

```Dockerfile
# Select the base image, such as humble or jazzy
FROM ros:humble

# Replace with your username
ARG USERNAME=wsxq2
ARG HTTP_PROXY_HOST=wsxq2
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Set proxy host and port
ARG HTTP_PROXY_HOST=192.168.56.200
ARG HTTP_PROXY_PORT=7890

# Replace with your proxy host and port or comment out if not needed
ENV http_proxy=http://$HTTP_PROXY_HOST:$HTTP_PROXY_PORT
ENV https_proxy=$http_proxy

# Set the timezone to Shanghai
RUN echo 'Asia/Shanghai' > /etc/timezone && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# This allows sudo commands to inherit the proxy environment variables
RUN sed -i '/Defaults\s*env_reset/a Defaults env_keep = "http_proxy https_proxy ftp_proxy no_proxy DISPLAY XAUTHORITY"' /etc/sudoers

# Update the apt sources to use Tsinghua University's mirror
RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak
RUN <<EOF cat > /etc/apt/sources.list
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse
EOF

# Add ROS 2 apt repository
RUN apt-get install curl gnupg2 -y && curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
RUN mv /etc/apt/sources.list.d/ros2.sources /etc/apt/sources.list.d/ros2.sources.bak && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] https://mirrors.tuna.tsinghua.edu.cn/ros2/ubuntu jammy main" | tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Update the apt package index.
RUN apt-get update

# Install basic utilities and tools. Use while loop to ensure it retries on failure
RUN /bin/bash -c 'while true; do if apt-get install -y python3-pip command-not-found vim x11-apps; then break; fi; done'

# Delete user if it exists in container (e.g Ubuntu Noble: ubuntu)
RUN if id -u $USER_UID ; then userdel `id -un $USER_UID` ; fi

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

ENV SHELL /bin/bash

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************

# Use my profile repository to set up the environment
# git clone https://github.com/wsxq2/profile.git ~/.MyProfile && cd ~/.MyProfile && ./deploy.sh $HTTP_PROXY_HOST

# [Optional] Set the default user. Omit if you want to keep the default as root.
USER $USERNAME
CMD ["/bin/bash"]

```

##### .devcontainer

```json
{
    "name": "ROS 2 Development Container",
    "privileged": true,
    "remoteUser": "wsxq2",
    "build": {
        "dockerfile": "Dockerfile",
        "args": {
            "USERNAME": "wsxq2"
        }
    },
    "workspaceFolder": "/home/ws",
    "workspaceMount": "source=${localWorkspaceFolder},target=/home/ws,type=bind",
    "customizations": {
        "vscode": {
            "extensions":[
                "ms-vscode.cpptools",
                "ms-vscode.cpptools-themes",
                "twxs.cmake",
                "donjayamanne.python-extension-pack",
                "eamodio.gitlens",
                "ms-iot.vscode-ros",
                "llvm-vs-code-extensions.vscode-clangd"
            ]
        }
    },
    "containerEnv": {
        "DISPLAY": "192.168.56.200:0.0",
        "ROS_LOCALHOST_ONLY": "1",
        "ROS_DOMAIN_ID": "42"
    },
    "runArgs": [
        "--net=host",
        "--pid=host",
        "--ipc=host",
        "-e", "DISPLAY=${env:DISPLAY}"
    ],
    "mounts": [
       //"source=/tmp/.X11-unix,target=/tmp/.X11-unix,type=bind,consistency=cached",
       //"source=/dev/dri,target=/dev/dri,type=bind,consistency=cached"
    ],

    "postCreateCommand": "rosdep update && rosdep install --from-paths src --ignore-src -y && sudo chown -R $(whoami) /home/ws/"
}
```

### ROS1 ROS2 bridge

使用 Docker 容器方式测试 ROS2 中 ros1_bridge 的能力，主要参考 [Docker中部署ROS1和ROS2，并实现互通_docker ros1-CSDN博客](https://blog.csdn.net/karmueo46/article/details/137164043)

#### docker-compose.yaml

```yaml
services:
    #ros1:
    #  build:
    #    context: .
    #    dockerfile: ros1.Dockerfile
    #  networks:
    #    - rosnetwork
    #  command: rosrun roscpp_tutorials talker

  ros2:
    build:
      context: .
      dockerfile: ros2.Dockerfile
    networks:
      - rosnetwork
    environment:
      - ROS_DOMAIN_ID=1
    command: ros2 run demo_nodes_cpp listener

  bridge:
    build:
      context: .
      dockerfile: bridge.Dockerfile
    command: ros2 run ros1_bridge dynamic_bridge
    environment:
      - ROS_MASTER_URI=http://172.19.0.1:11311
      - ROS_DOMAIN_ID=1
    networks:
      - rosnetwork

networks:
  rosnetwork:
```

#### ros1.Dockerfile

```Dockerfile
ARG ROS_DISTRO=noetic

FROM ros:$ROS_DISTRO

# 安装ROS包
RUN apt-get update && apt-get install -y \
      ros-${ROS_DISTRO}-ros-tutorials \
      ros-${ROS_DISTRO}-common-tutorials && \
    rm -rf /var/lib/apt/lists/*
```

#### ros2.Dockerfile

```Dockerfile
ARG ROS_DISTRO=humble

FROM ros:${ROS_DISTRO}

# 安装ROS包
RUN apt-get update && apt-get install -y \
      ros-${ROS_DISTRO}-demo-nodes-cpp && \
    rm -rf /var/lib/apt/lists/*
```

#### bridge.Dockerfile

```Dockerfile
FROM ros:galactic-ros1-bridge

# 设置环境变量
ENV ROS_HOSTNAME=bridge
ENV ROS_MASTER_URI=http://ros1:11311
```

#### 总结

在同一主机上，Docker 容器 ros1 + ros2 + bridge 的组合能成功，但 ros1 使用主机的 ros1 而非容器的 ros1 时则失败。

由于 bridge 只是 ROS2 发展前期的过渡品，仅前几个 ROS 版本支持（humble 就已经不支持了），它要求较高，系统中必须同时安装 ROS1 和 ROS2 的环境（如 bridge 容器中就是如此），所以**现在尽量不要使用它**。

### talker and listener

这是 ROS2 官方教程中提到的示例，详见 [Running ROS 2 nodes in Docker \[community-contributed\] — ROS 2 Documentation: Humble documentation](https://docs.ros.org/en/humble/How-To-Guides/Run-2-nodes-in-single-or-separate-docker-containers.html)

#### docker-compose.yaml

```yaml
services:
  talker:
    build: .
    command: ros2 run demo_nodes_cpp talker
  listener:
    build: .
    command: ros2 run demo_nodes_cpp listener
    depends_on:
      - talker
```

#### Dockerfile

```Dockerfile
# Select the base image, such as humble or jazzy
FROM ros:humble

#ENV SHELL=/bin/bash

RUN apt update && apt install ros-humble-demo-nodes-cpp -y

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************

# Use my profile repository to set up the environment
# git clone https://github.com/wsxq2/profile.git ~/.MyProfile && cd ~/.MyProfile && ./deploy.sh $HTTP_PROXY_HOST

# [Optional] Set the default user. Omit if you want to keep the default as root.
```

### rqt develop

通过 vscode 的 dev container 插件进行 rqt 应用开发的相关配置文件。

另可参见 [Tiryoh/docker-ros2-desktop-vnc: 🐳 Dockerfiles to provide HTML5 VNC interface to access Ubuntu Desktop + ROS 2](https://github.com/Tiryoh/docker-ros2-desktop-vnc) 以探讨更好的 ROS GUI 环境。

#### Dockerfile

```Dockerfile
FROM osrf/ros:humble-desktop

# Set proxy host and port
ARG HTTP_PROXY_HOST=host.docker.internal
ARG HTTP_PROXY_PORT=7890

# Replace with your proxy host and port or comment out if not needed
ENV http_proxy=http://$HTTP_PROXY_HOST:$HTTP_PROXY_PORT
ENV https_proxy=$http_proxy

# Set the timezone to Shanghai
RUN echo 'Asia/Shanghai' > /etc/timezone && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# Update the apt sources to use Tsinghua University's mirror
RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak
RUN <<EOF cat > /etc/apt/sources.list
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse
EOF

# Add ROS 2 apt repository
RUN apt-get install curl gnupg2 -y && curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
RUN mv /etc/apt/sources.list.d/ros2.sources /etc/apt/sources.list.d/ros2.sources.bak && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] https://mirrors.tuna.tsinghua.edu.cn/ros2/ubuntu jammy main" | tee /etc/apt/sources.list.d/ros2.list > /dev/null

# 安装 rqt 及 Python 依赖
RUN apt-get update && \
    apt-get install -y python3-pip ros-humble-rqt unzip && \
    rm -rf /var/lib/apt/lists/*

# 安装最新版本的 clangd
RUN CLANGD_VERSION=$(curl -s https://api.github.com/repos/clangd/clangd/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/') && \
    curl -L -o /tmp/clangd-linux.zip "https://github.com/clangd/clangd/releases/download/${CLANGD_VERSION}/clangd-linux-${CLANGD_VERSION}.zip" && \
    unzip /tmp/clangd-linux.zip -d /tmp/ && \
    find /tmp -name "clangd" -type f -executable -exec cp {} /usr/local/bin/clangd \; && \
    chmod +x /usr/local/bin/clangd && \
    rm -rf /tmp/clangd-linux.zip /tmp/clangd_*

# 手动模拟 rosdep init
RUN mkdir -p /etc/ros/rosdep/sources.list.d/ && curl -o /etc/ros/rosdep/sources.list.d/20-default.list -L https://mirrors.tuna.tsinghua.edu.cn/github-raw/ros/rosdistro/master/rosdep/sources.list.d/20-default.list

# set rosdep mirror to Tsinghua University
ENV ROSDISTRO_INDEX_URL=https://mirrors.tuna.tsinghua.edu.cn/rosdistro/index-v4.yaml

```

#### docker-compose.yaml

```yaml
services:
  ros2-gui:
    build: .
    container_name: ros2-gui
    ports:
      - "7400-7600:7400-7600/udp" # ROS2 DDS 互通端口
    volumes:
      - .:/workspace
      #- /tmp/.X11-unix:/tmp/.X11-unix # 挂载 X11 socket（Linux 下）
    environment:
      - DISPLAY=host.docker.internal:0.0 # Windows 下 X11，或根据你的 X server 设置调整
      - ROS_DOMAIN_ID=30
      - ROS_LOCALHOST_ONLY=0
      #- FASTRTPS_DEFAULT_PROFILES_FILE=/workspace/ros2_config.xml
    networks:
      - rosnet
    tty: true
    stdin_open: true
    #working_dir: /workspace

networks:
  rosnet:
    external: true
```

#### devcontainer.json

```json
{
    "name": "ROS2 Humble rqt GUI",
    "dockerComposeFile": "../docker-compose.yml",
    "service": "ros2-gui",
    "workspaceFolder": "/workspace",
    "customizations": {
        "vscode": {
            "settings": {
                "terminal.integrated.shell.linux": "/bin/bash",
                "clangd.path": "/usr/local/bin/clangd"
            },
            "extensions": [
                "donjayamanne.python-extension-pack",
                "ms-ros.ros",
                "llvm-vs-code-extensions.vscode-clangd",
                "seanwu.vscode-qt-for-python"
            ]
        }
    },
    "postCreateCommand": "rosdep update && rosdep install --from-paths src --ignore-src -r -y"
}
```

## 遇到过的问题

### X11 方式访问 RVIZ 经常发生错乱现象？

环境说明：Windows11 + Docker Desktop（使用 WSL2） + ROS humble desktop 镜像

尝试了以下步骤：

1. 更新 vcxsrv：[marchaesen/vcxsrv: Windows X-server based on the xorg git sources (like xming or cygwin's xwin), but compiled with Visual Studio 2012 Community Edition.](https://github.com/marchaesen/vcxsrv)
2. 更新显卡驱动：[Drivers and Support for Processors and Graphics](https://www.amd.com/en/support/download/drivers.html)

然后目前暂未发现错乱现象，疑似解决了。

其他一些尝试：

- GPU 性能测试：
  - `apt install mesa-utils` 然后执行 `glxgears` 命令即可，显示的 FPS 目前好像在 60 左右，基本够用。
  - `apt install glmark2` 然后 `glmark2`
- 付费版 xming（听说不错），但看了下价格，需要 97 元，太贵了，就放弃了。
- 一个非常重要的问答，有个回答者还讲了相关原因：[How to troubleshoot OpenGL on Ubuntu under Windows 10 (WSL) - Super User](https://superuser.com/questions/1487555/how-to-troubleshoot-opengl-on-ubuntu-under-windows-10-wsl)
- ROS RVIZ 问题常见解决方案（即“不要使用 vcxsrv 中 Native OpenGl 选项”），和我的问题不同，但相关：[xorg - how to check and confirm a right opengl version with vcxsrv (for using ros2 rviz2) - Ask Ubuntu](https://askubuntu.com/questions/1435037/how-to-check-and-confirm-a-right-opengl-version-with-vcxsrv-for-using-ros2-rviz)
- VirtualGL：尝试后报错，暂未找到解决方法，后续如果又出现此问题时，可再次尝试解决
  - [TurboVNC+VirtualGL：实现服务器的多用户图形化访问与硬件加速 \| 一颗栗子球](https://shaoyecheng.com/uncategorized/2020-04-08-TurboVNC-VirtualGL%EF%BC%9A%E5%AE%9E%E7%8E%B0%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%9A%84%E5%A4%9A%E7%94%A8%E6%88%B7%E5%9B%BE%E5%BD%A2%E5%8C%96%E8%AE%BF%E9%97%AE%E4%B8%8E%E7%A1%AC%E4%BB%B6%E5%8A%A0%E9%80%9F.html)
  - [User’s Guide for VirtualGL 3.1.3](https://rawcdn.githack.com/VirtualGL/virtualgl/3.1.3/doc/index.html)
  - [Releases · VirtualGL/virtualgl](https://github.com/VirtualGL/virtualgl/releases)
  - 尝试执行 `vglrun -display 192.168.3.107:0.0 glxgears` 时报错：**Error: couldn't get an RGB, Double-buffered visual**。参考了以下两个链接均未成功：
    - [Error: couldn't get an RGB, Double-buffered visual - Graphics / Linux / Linux - NVIDIA Developer Forums](https://forums.developer.nvidia.com/t/error-couldnt-get-an-rgb-double-buffered-visual/108823)
    - [\[SOLVED\] glxinfo Error: couldn't get an RGB, Double-buffered visual · Issue #982 · Bumblebee-Project/Bumblebee](https://github.com/Bumblebee-Project/Bumblebee/issues/982)


### Docker 容器跨主机通信？

如果主机都是 Linux，那么这个问题很好解决，直接使用 Docker 网络中的 [host driver](https://docs.docker.com/engine/network/drivers/host/)

如果一台主机是 Windows，另一台是 Linux，那么就很难解决，核心原因是 windows docker 不支持 host 网络模式。下面是相关链接：

- [Networking \| Docker Docs](https://docs.docker.com/desktop/features/networking/#per-container-ip-addressing-is-not-possible)
- [Host network driver \| Docker Docs](https://docs.docker.com/engine/network/drivers/host/): **Only Linux containers are supported. Host networking does not work with Windows containers.**

### Docker WSL2 方式支持容器中使用 GPU 吗？

NVIDIA：

- [GPU support \| Docker Docs](https://docs.docker.com/desktop/features/gpu/)
- [1. NVIDIA GPU Accelerated Computing on WSL 2 — CUDA on WSL 12.9 documentation](https://docs.nvidia.com/cuda/wsl-user-guide/index.html)。文中提到 Pascal 架构之后才支持，而通过官方参数得知：pascal 是 GTX 10 系列采用的架构。所以几乎所有都支持，包括笔记本。详见以下链接：
  - [比较 GeForce 系列最新一代显卡和前代显卡 \| NVIDIA](https://www.nvidia.cn/geforce/graphics-cards/compare/?section=compare-20)
  - [对比游戏笔记本电脑：GeForce RTX 40 系列](https://www.nvidia.cn/geforce/laptops/compare/)
- [Docker - ArchWiki](https://wiki.archlinux.org/title/Docker#Run_GPU_accelerated_Docker_containers_with_NVIDIA_GPUs)
- [Support for NVIDIA GPUs under Docker Compose · Issue #6691 · docker/compose](https://github.com/docker/compose/issues/6691)

AMD:

- [WSL support matrices by ROCm version — Use ROCm on Radeon GPUs](https://rocm.docs.amd.com/projects/radeon/en/latest/docs/compatibility/wsl/wsl_compatibility.html)
- [Install Radeon software for WSL with ROCm — Use ROCm on Radeon GPUs](https://rocm.docs.amd.com/projects/radeon/en/latest/docs/install/wsl/install-radeon.html)
- [ROCm/container-toolkit: Offers tools that streamline the use of AMD GPUs with containers.](https://github.com/ROCm/container-toolkit)
- [Migration Guide: NVIDIA to AMD — AMD Container Runtime Toolkit](https://instinct.docs.amd.com/projects/container-toolkit/en/latest/container-runtime/migration-guide.html)

总结：NVIDIA 在最前沿，几乎所有 GPU 都支持，AMD 要落后许多，可能会遇到许多难以解决的问题，故以后优先购买 NVIDIA GPU，减少麻烦。

### PUTTY 无法使用 HOME 和 END 键?

这个问题不算是 Docker 相关的问题，只是在使用 putty 过程中遇到的。解决方法非常简单：在 keyboard 界面设置 The function keys and keypad 为 `SCO`
