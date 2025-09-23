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

## 常用控制器

### diff_drive_controller

详见 [diff_drive_controller — ROS2_Control: Rolling Sep 2025 documentation](https://control.ros.org/rolling/doc/ros2_controllers/diff_drive_controller/doc/userdoc.html)

### 4舵轮控制器

- 在线仿真：[Forsyth Creations](https://www.forsythcreations.com/swerve_drive)。但疑似不正确
- ROS1中相关 MR：[Add four wheels swerve drive to ROS controllers by gurbain · Pull Request #441 · ros-controls/ros_controllers](https://github.com/ros-controls/ros_controllers/pull/441)
- ROS2中相关 MR：[Added Swerve Drive Controller Package by nitin2606 · Pull Request #1694 · ros-controls/ros2_controllers](https://github.com/ros-controls/ros2_controllers/pull/1694)。当前（2025-09-23）有多个 bug：
  - `x_offset`、`y_offset`、`radius` 等参数未被使用
  - 单元测试几乎完全不通过
- humble 中的现有实现：[pvandervelde/zinger_swerve_controller: The swerve controller code for the zinger robot](https://github.com/pvandervelde/zinger_swerve_controller)、[Four wheel independent steering robot using Nav2 and ros2-control - Projects - Open Robotics Discourse](https://discourse.openrobotics.org/t/four-wheel-independent-steering-robot-using-nav2-and-ros2-control/34587)
- galactic 中的现有实现：[RoboEagles4828/ros2-swerve-controller: ROS2 controller for FRC swerve robot](https://github.com/RoboEagles4828/ros2-swerve-controller/tree/main)
- 打架问题：总体速度发生变化时是否存在轮子打架的可能？

## 限速和限位

关于 ros2 control 的限位限速的设计问题，可以尝试使用 URDF 中的 ros2_control 标签，然后 hardware component 中处理，这样相对简单些。其他方案包括：
- YAML 文件定义上下限，然后解析为 ROS2 参数，传递给 controller manager（ros2_control_node），在 hardware component 中处理
- 读取 URDF 中的 limit 标签，解析并处理。相关链接：[Will the joint limits in my URDF file limit the real components or just the simulation? (ROS2: Foxy) : r/ROS](https://www.reddit.com/r/ROS/comments/xpi234/will_the_joint_limits_in_my_urdf_file_limit_the/)

## 心得体会

- ros2 controller 中也可实现正逆解，如各种底盘控制器就是实现了正逆解，此外，机械臂的正逆解也可在控制器中实现（通过使用 orocos 的KDL库等，此外 ROS2 中本身也有个[ros-controls/kinematics_interface](https://github.com/ros-controls/kinematics_interface?tab=readme-ov-file)），例如 [Example 7: Full tutorial with a 6DOF robot — ROS2_Control: Rolling Sep 2025 documentation](https://control.ros.org/rolling/doc/ros2_control_demos/example_7/doc/userdoc.html)
- 关于 ros2 control 中的传动接口，可以简单理解为减速比相关设置。另外链式控制器是一个伟大的思想，详见[roadmap/design_drafts/controller_chaining.md at master · ros-controls/roadmap](https://github.com/ros-controls/roadmap/blob/master/design_drafts/controller_chaining.md#example-2)
- 关于 ros2 control 和 moveit 的关系：control 负责具体关节的控制，moveit 实现正逆解、防碰撞、路径规划等。control 也可自行实现正逆解，这样就不需要 moveit。详见 [ros2_control_robot_integration_with_moveit2.png (4415×2670)](https://control.ros.org/humble/_images/ros2_control_robot_integration_with_moveit2.png)
- 关于`/cmd_vel`及其消息类型的理解：`/cmd_vel`表达一个速度主题，其消息类型为Twist，直译为“扭曲”，它由线速度和角速度组成，前者是笛卡尔坐标系中的三个轴上的线速度（XYZ），后者是绕这三个轴旋转的角速度，可以发现它类似于 Pose，甚至可以说是 Pose 相对于时间 t 的微分。Pose 和 TF 也非常相似，均由位置和旋转组成。相关链接：[ros2 - Is there a REP or standard for the /cmd_vel topic? - Robotics Stack Exchange](https://robotics.stackexchange.com/questions/96035/is-there-a-rep-or-standard-for-the-cmd-vel-topic)
- 底盘运动控制的核心要点是找到 ICR（瞬时旋转中心），只要能推理出它，那么后续的计算就是水到渠成的事了。另外要注意向量法的运用，有时会大大降低复杂度。此外，还要注意三角函数及相关公式的推导，要做到从0推导出所有。差速小车是最简单的情形，4个舵轮也没想象中那么复杂。关于ICR可参考[Instant centre of rotation - Wikipedia](https://en.wikipedia.org/wiki/Instant_centre_of_rotation)，关于各个常见底盘控制器理论和实现可参见ros2 control相关文档：[ros2_controllers — ROS2_Control: Humble Sep 2025 documentation](https://control.ros.org/humble/doc/ros2_controllers/doc/controllers_index.html)。注意，关于 ICR，虽然 Twist 中的是绕 z 轴的角速度，但不一定就是机器人坐标系 base_link 中的 z 轴，可能是平行于该 z 轴的其他 z 轴（有无数个），即 ICR 的位置是不定的，和 vx,vy,w 均有关。相关链接：[四舵轮车辆中的舵轮角度计算_四舵轮运动模型-CSDN博客](https://blog.csdn.net/YiYeZhiNian/article/details/142679555)

## URDF

URDF 和 ros2_control 有着密切的关联，ros2_control 能从 URDF 读取关节信息等。

手动编写 URDF 文件是比较麻烦且困难的事情，一个更好的方法是使用 AI， 另一个方法是从 solidworks 导出。前者适用于构建简单的模型，后者则更合适构建相对真实的复杂的模型。

### 从 solidworks 导出

从 solidworks 导出主要使用开源插件 [sw_urdf_exporter](https://wiki.ros.org/sw_urdf_exporter)，其源码位于 <https://github.com/ros/solidworks_urdf_exporter>。

sw_urdf_exporter 插件用于从 solidworks 中导出三维模型，除了得到 URDF 文件外，还会得到许多相关文件，组成一个 ROS 包，当然其中最重要的部分肯定是 URDF 文件和 mesh 文件。

最初 sw_urdf_exporter 插件是用于 ROS1，使用的 solidworks 版本为 2018, 现在 ROS 的发展日新月异，solidworks 也更新到了 2024，因此，直接下载安装可能无法正常使用，后续已经修复的 bug 可能会再次遇到，因此，建议使用最新版本源码进行编译

#### 编译和安装插件

步骤如下：

1. 安装 VS 2017：<https://aka.ms/vs/15/release/vs_community.exe>
2. 按照 [GitHub 上 README 指引](https://github.com/ros/solidworks_urdf_exporter?tab=readme-ov-file#development) 进行

#### 心得体会
- joint 中 axis 是 child link 坐标系对应的轴，因此对于旋转类关节，child link 一定要建立正确的坐标系，否则旋转的轴就不正确
- joint 中 origin 是 child link 在 parent link 中的坐标（由 xyz 决定）和朝向（由 rpy 决定）
- STL 文件中只有三角形顶点坐标和法向量，这些坐标基于一个隐含坐标系，由使用 urdf 插件导出时你选择的坐标系决定。可以使用 meshlab 软件验证：Render->Show axis 即可看到坐标系。

#### 遇到过的问题

- 导出时报错空指针异常？已经修改，并提交了 PR，详见 <https://github.com/ros/solidworks_urdf_exporter/pull/178>
- mimic 取消勾选后无法保存配置？已经修改，并提交了 PR，详见 <https://github.com/ros/solidworks_urdf_exporter/pull/179>
- 无法导出装配体？只能导出零件？已知bug，但和模型有关，不是所有模型都有此bug。详见： https://github.com/ros/solidworks_urdf_exporter/issues/88
- 使用发布的二进制时，Solidworks 2024 无法工作？尝试从源码构建，详见：<https://github.com/ros/solidworks_urdf_exporter/issues/177>
- 移植到ROS2？详见 [Solidworks导出URDF总结（Humble）_sw导出的urdf文件在ros2 humble显示-CSDN博客](https://blog.csdn.net/woshigaowei5146/article/details/129356259)
- mimic tag 无法被 mock 读取？已知问题，分析源码得知 mock 只会解析 ros2_control 标签下的 param mimic。不过这个设计让人疑惑，已在论坛提问：[ros2 - Why doesn't ros2_control automatically read mimic joint information from URDF files? - Robotics Stack Exchange](https://robotics.stackexchange.com/questions/117436/why-doesnt-ros2-control-automatically-read-mimic-joint-information-from-urdf-fi)
- WSLg 带配置文件运行 rviz2 有时无法拖动？修改 DISPLAY 变量，改用 vcxsrv 即可。可能是现在的 WSLg 还不稳定，有什么 bug，也可能和显卡有关。
- Rviz2 中的模型显示严重异常？可能和错误使用 mimic 有关，尤其是要避免闭环。
- 链接失败，提示缺少 solidworks 相关库？手动添加即可。通常安装 solidworks API后就不会存在此错误，如果存在，则可先重启电脑试试。
- 轮子转动的方向相反？修改运动轴的方向，如将 0 0 1 改为 0 0 -1

#### 下一步计划

- 简化流程？当前步骤比较烦琐，简要罗列如下：
  1. 精简 solidworks 模型：一方面要删减，另一方面要正确划分 link，每个link对应一个零件，如果某个 link 是装配体，需要另存为零件替换之。
  1. （可选）在 link 间建立完善的配合，包括运动限位
  1. 建立坐标系、运动轴等，部分坐标系需要严谨建立，部分可以随意些，否则太费时间
  1. 导出时需要正确设置每个 joint 和 link 的名称、运动轴、坐标系、对应的零件等，导出界面中要正确设置 mimic、上下限、运动轴正负号等
  1. 导出后要检查一下 `mesh/` 下是否有异常文件，如 1kb 文件（实际只有 80 字节）
  1. 然后先在 ROS1 noetic 中运行，在 rivz2 中看是否正确，以及是否能使用 joint_state_publisher_gui 进行控制，控制时每个关节的位置是否按预期运行
  1. ROS1 中没问题后，再移植到 ROS2，再进行测试
  1. 添加 base_footprint link，以及 ros2_control 相关内容，删除某些文件等
  1. 集成到自己的项目中

  其中有许多步骤无法省略，但有些是可以的，比如从 ROS1 移植到 ROS2，可以采用脚本，或者更进一步地，修改插件，使其支持 ROS2，还包括添加 base_footprint 及 ros2_control 相关内容等。

- 插件的 issue 中有许多宝藏，可以探索一番
- vscode中开发插件的可行性？不可行，已经放弃。代码提示中很多错误
