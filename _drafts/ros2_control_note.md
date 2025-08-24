ROS2 Control 是 ROS2 中的实时控制框架，用于机器人硬件的标准化控制和管理，它的目标是简化新硬件的集成并克服一些缺点，其官方 GitHub 为 <https://github.com/ros-controls>。

本文旨在阐明 ros2 control 框架的原理及应用。

## 概述

[ROS2 Control] 框架的整体架构如下图所示：

![ROS2 CONTROL 框架](https://control.ros.org/humble/_images/components_architecture.png)

其中关键概念只有 4 个，下面详细说明：

- 控制器（Controllers）：实现运动学解算和限速、限位等。比如对于两轮差速小车，需要订阅 `cmd_vel` 主题，该主题的消息格式是`Twist`，包含小车整体的三维的线速度和角速度，需要将它转换为两个轮子的转速，因此，就需要做相应的运动学解算，这种从机器人整体到局部关节的运动学解算称之为逆解。除了前述的逆解外，还需要实现正解（从关节到整体目标），用于提供`odom`主题。类似地，机械臂也需要相应的控制器。
- 控制器管理器（Controller Manager）：用于管理控制器，包括加载（load）、取消加载（unload）、激活（active）、取消激活（deactive）控制器。
- 资源管理器（Resource Manager）：用于管理硬件资源，硬件资源包括电机（Motor）、传感器（Sensor）、现有的机器人系统（System）这三大类。它管理两种接口：命令接口和状态接口。前者用于下发命令到电机，支持读写；后者从传感器获取当前状态，仅支持读。
- 硬件驱动（Hardware driver）：也称之为硬件组件（Hardware component），主要分为三类：执行器（Actuator）（即电机）、传感器（Sensor）、系统（System）。前两者都非常容易理解，第三个系统是比较特别的，简单来说，它相当于多个电机和传感器的组合。和控制器一样，硬件组件也会被资源管理器管理。硬件组件主要负责和硬件进行通信，进行控制和状态访问。

详见 [Getting Started — ROS2_Control: Humble Aug 2025 documentation](https://control.ros.org/humble/doc/getting_started/getting_started.html#architecture)

ROS2 Control 框架本身是比较复杂的，但熟悉后会发现非常好用。它极具拓展性和可维护性，且配备完善的[文档](https://control.ros.org/humble/index.html)和[例程](https://github.com/ros-controls/ros2_control_demos)，是一个非常优秀的框架。学习时建议按照以下步骤进行：

1. 阅读官方文档，重点阅读前 4 部分，即**Getting Started**、**ros2_control**、**ros2_controllers**、**Demos**。
2. 运行例程，并自己做一些修改，看结果如何变化。
3. 自行实现一个包，比如用于控制差速小车的包。
4. 自行实现一个控制器，比如支持 4 个舵轮的控制器。
5. 阅读源码，深入分析其架构与设计。

[controllers]: https://github.com/ros-controls/ros2_controllers
[ROS2 Control]: https://github.com/ros-controls/ros2_control

ros2 control 框架提供了大量组件，主要由以下几个包组成：

- 控制器接口（Controller Interface）
- 控制器管理器（Controller Manager）
- 控制器管理器消息
- 硬件接口（Hardware Interface）
- CLI
- RQT
- 传动接口

下面我们逐一说明。

## TODO

## 应用

实际应用时，我们不需要关心控制器管理器和资源管理器如何实现，我们只需要实现相应的控制器和硬件驱动即可。事实上，ROS2 Control 框架提供了许多常用的控制器([controllers])，大多情况下我们可以直接使用，少部分情况才需要我们自行实现控制器。也就是说，如果使用现有控制器，我们只需要关心硬件驱动的实现即可，这就大大简化了新硬件的集成。

在可以使用现有控制器的情况下，虽然我们不需要关心控制器的实现，但我们需要知道如何使用该控制器，即如何配置它。控制器的配置通常使用 YAML 文件实现，因此，我们需要阅读该控制器的使用说明，明确它在 YAML 文件中有哪些字段可用，每个字段功能是什么，应如何设置。

而硬件驱动方面，除了需要实现相应代码，还需要写相应的 URDF 文件。关于这点，官方不建议直接写 URDF 格式的文件，而是写 Xacro 格式的宏文件，然后通过 `xacro` 命令将其转换为 URDF。这样做的好处是更容易实现模块化，从而达到较高的复用性。

此外，由于一个机器人通常拥有大量关节，每个关节的控制协议可能相同也可能不同，如果是相同的情况下（比如你使用 PLC 整合了这些关节的控制方式，向上只体现为一个 Modbus TCP 接口），则建议建立以下包：

- description：机器人描述文件，通常包括一个主 Xacro 文件和多个子 Xacro 文件，通过在主 Xacro 文件中 include 其他文件，来实现对一个大型机器人的表达。
- bringup：包括主 launch 文件和主 YAML 配置文件等，用于一键启动。
- controllers：包括机器人各部分关节对应 Controller 的 YAML 配置文件。建议对不同功能的 controller 单独写个 YAML 文件，而非全部放到一个 YAML 配置文件中，尤其是在机器人关节比较多的时候。举例来说，如果你的机器人有两大部分的关节：底盘行走相关的和机械臂抓取相关的，那么你应该建立两个 YAML 配置文件。这样可以实现简单的模块化，有利于分工和维护。
- hardware：实现 ROS2 control 框架中的硬件驱动（也叫硬件组件）部分，实现和具体硬件通信，从而能够读取状态和写入命令。

这样一来我们可以避免创建过多零散的包，但也不至于将所有功能揉成一团，在灵活性和简单性间取得了平衡。
