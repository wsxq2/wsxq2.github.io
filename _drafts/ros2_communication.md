ROS2 通信机制主要包括 Topic, Service, Action 三大类：
- Topic 是发布订阅机制，是一对多的通信机制，即由一个发布者发布消息，多个订阅者订阅消息
- Service 是 C/S 机制，是一对一的通信机制，由客户端发起调用请求，服务端进行响应。
- Action 比较特殊，是 Topic 和 Service 的结合体，客户端首先通过 Service 发送一个目标请求（action_goal），然后服务端回复一个 Service 响应，表达目标是否被接受，如果接受，则客户端会发送一个获取结果的 Service 请求，服务端会通过 Topic 发送进度（Feedback），最后完成时才会回复那个获取结果的 Service 响应。

详见 [Understanding actions — ROS 2 Documentation: Humble documentation](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/Understanding-ROS2-Actions.html)

## Topic

### latched topics

ROS2 中有个特别的 Topic 类型，它的特点是会在发布者缓存消息，当有新的订阅者时才会发布，且只发布一次，这非常适用于哪些不会变化的消息，比如导航中的地图消息就是个典型的例子，它也被称之为 **latched topics**，在 C++ 的 API 中对应 `DurabilityPolicy` 中的 `TRANSIENT_LOCAL`:

```cpp
enum class DurabilityPolicy {
    VOLATILE,           // 默认值，不保存历史数据
    TRANSIENT_LOCAL,    // 在发布者本地保存最后一条消息
    TRANSIENT,          // 在系统级别保存消息
    PERSISTENT          // 永久保存到存储设备
};
```

