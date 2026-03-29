本文旨在针对 modbus 的相关开发场景下，在 C/C++ 语言中应该使用哪个库进行探讨，大致结论如下：
- 对于简单的单片机场景，不使用任何封装好的库，尽量简化处理，这是为了避免代码过于复杂，降低效率，浪费存储空间
- 在 Linux 环境下，直接无脑使用 libmodbus，虽然它是纯 c 的，c++ 也能使用，可以基于它封装相应的类。它既支持 master 也支持 slave（详见 <https://libmodbus.org/reference/#use-cases>）。理由是应用广泛，稳定性高，许多相关工具均基于此库，例如 mbpoll 命令行工具，对于调试非常有用。
- 在 Qt 环境下，直接无脑使用 Qt 官方的 SerialBus 中的 QModbusTcp 等相关库。它既支持 master 也支持 slave。理由是 Qt 出品，必属精品，深入用过 Qt 的都知道这句话的含金量。

libmodbus 和 Qt SerialBus 均支持 modbus rtu, tcp 等。

