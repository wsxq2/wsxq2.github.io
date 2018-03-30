**版权相关**: 本文截取自[在 CentOS 7 下安装配置 shadowsocks](https://morning.work/page/2015-12/install-shadowsocks-on-centos-7.html)
, 原作品由 [老雷](http://ucdok.com/) 创作，采用 [知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh) 进行许可。

<pre>
#!/bin/bash
# Install Shadowsocks on CentOS 7

echo "Installing Shadowsocks..."

random-string()
{
    cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w ${1:-32} | head -n 1
}

CONFIG_FILE=/etc/shadowsocks.json
SERVICE_FILE=/etc/systemd/system/shadowsocks.service
SS_PASSWORD=$(random-string 32)
SS_PORT=8388
SS_METHOD=aes-256-cfb
SS_IP=`ip route get 1 | awk '{print $NF;exit}'`
GET_PIP_FILE=/tmp/get-pip.py

# install pip
curl "https://bootstrap.pypa.io/get-pip.py" -o "${GET_PIP_FILE}"
python ${GET_PIP_FILE}

# install shadowsocks
pip install --upgrade pip
pip install shadowsocks

# create shadowsocls config
cat <<EOF | sudo tee ${CONFIG_FILE}
{
  "server": "0.0.0.0",
  "server_port": ${SS_PORT},
  "password": "${SS_PASSWORD}",
  "method": "${SS_METHOD}"
}
EOF

# create service
cat <<EOF | sudo tee ${SERVICE_FILE}
[Unit]
Description=Shadowsocks

[Service]
TimeoutStartSec=0
ExecStart=/usr/bin/ssserver -c ${CONFIG_FILE}

[Install]
WantedBy=multi-user.target
EOF

# start service
systemctl enable shadowsocks
systemctl start shadowsocks

# view service status
sleep 5
systemctl status shadowsocks -l

echo "================================"
echo ""
echo "Congratulations! Shadowsocks has been installed on your system."
echo "You shadowsocks connection info:"
echo "--------------------------------"
echo "server:      ${SS_IP}"
echo "server_port: ${SS_PORT}"
echo "password:    ${SS_PASSWORD}"
echo "method:      ${SS_METHOD}"
echo "--------------------------------"
</pre>

执行以下命令一键安装：
```bash
chmod +x install-shadowsocks.sh
./install-shadowsocks.sh
```

