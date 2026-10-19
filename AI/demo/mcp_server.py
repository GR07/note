# 导入操作系统接口模块，用于执行如列出目录等系统操作
import os  
# 从 mcp 库中导入 MCPServer 类，用于快速构建 MCP 服务器
from mcp.server.mcpserver import MCPServer

# 创建一个名为 "MCP Demo" 的 MCPServer 服务器实例
mcp = MCPServer("MCP Demo")  

# 使用装饰器将下面的函数注册为一个 MCP 工具，供客户端调用
@mcp.tool()  
# 定义一个名为 ls 的函数（模拟 Linux 的 ls 命令）
def ls():  
    # 函数的文档字符串，描述了该工具的功能
    """列出目录中的文件名"""  
    # 返回当前目录（"." 表示当前路径）下的所有文件和文件夹名称列表
    return os.listdir(".")  

# 判断当前脚本是否作为主程序直接运行
if __name__ == '__main__':  
    # 启动 MCP 服务器，开始监听和处理请求
    mcp.run()  