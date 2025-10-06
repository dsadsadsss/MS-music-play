# MS 音乐播放器  使用教程

使用python Flask 部署的简单到极致的音乐播放器

#### static\music目录里面上传.mp3格式音乐即可

#### IDX创建python,直接上传所有文件，重启即可使用

#### 其他linxu安装步骤

## 📋 前置要求

```bash
# 1. 确保已安装 Python 3
python3 --version

# 2. 安装 pip（如果没有）
sudo apt update
sudo apt install python3-pip
```

## 🚀  linux安装步骤

### 1. 创建项目目录

```bash
mkdir flask-music-player
cd flask-music-player
```

### 2. 安装 Flask

```bash
# 推荐使用虚拟环境
python3 -m venv venv
source venv/bin/activate  # 激活虚拟环境

# 安装 Flask
pip install flask
```

### 3. 创建项目结构

```bash
# 创建必要的文件夹
mkdir -p templates static/music
```

项目结构应该是这样：

```
flask-music-player/
├── app.py              # 你的 Flask 脚本
├── templates/          # HTML 模板文件夹
│   └── index.html      # 前端播放器页面（需要创建）
└── static/
    └── music/          # 音乐文件存放位置
```

### 4. 保存脚本

```bash
# 将你的 Python 代码保存为 app.py
nano app.py  # 或使用 vim、gedit 等编辑器
# 粘贴代码后保存退出
```

### 5. 添加音乐文件

```bash
# 将你的音乐文件复制到 static/music 目录
cp /path/to/your/music/*.mp3 static/music/

# 或者下载示例音乐
# wget -P static/music/ https://example.com/sample.mp3
```

## ▶️ 运行应用

### 方法 1: 直接运行

```bash
python3 app.py
```

### 方法 2: 使用 Flask 命令

```bash
export FLASK_APP=app.py
export FLASK_ENV=development  # 开发模式
flask run --host=127.0.0.1 --port=9002
```

### 方法 3: 后台运行

```bash
# 使用 nohup 后台运行
nohup python3 app.py > flask.log 2>&1 &

# 查看日志
tail -f flask.log

# 停止应用
ps aux | grep app.py
kill <进程ID>
```

## 🌐 访问应用

应用启动后，在浏览器中访问：

```
http://127.0.0.1:9002
```

API 端点测试：

```bash
# 获取歌曲列表
curl http://127.0.0.1:9002/api/songs
```

## ⚙️ 常见配置

### 允许外部访问

如果想让局域网内其他设备访问，修改 `app.py` 中的：

```python
app.run(host='0.0.0.0', port=9002, debug=True)
```

然后通过局域网 IP 访问：`http://<你的IP>:9002`
