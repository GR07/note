# 前言
先装个 python 看看行不行，不行再走下面的流程
装完再市场里 https://mcp.so/ 找个mcp跑一下


# 安装

powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# 配置环境变量

$env:Path = "C:\Users\你的用户名\.local\bin;$env:Path"

# 验证安装

uv --version

uvx pycowsay 'hello world'

# 查看 uv 的安装路径

Get-Command uv




uv tool run ruff

uv 是 python 的包管理软件

uvx 可以用来启动 python 程序 uvx xxx