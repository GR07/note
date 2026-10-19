import asyncio

from agents import Agent, Runner 
from agents.mcp import MCPServerStdio

import config  

async def main():  

    # 使用异步上下文管理器启动一个基于标准输入输出的 MCP 服务器客户端
    # 使用了 async with 语法，这意味着它会自动管理服务器的生命周期：进入代码块时启动服务器进程，退出代码块时自动关闭该进程。
    # 启动后，变量 mcp_server 就可以用来与这个服务器进行交互（比如调用mcp定义的 ls 工具）。
    async with MCPServerStdio(  
        # 为这个 MCP 服务器实例指定一个名称标识
        name="普通的mcp服务器",  
        # 传入启动该 MCP 服务器所需的参数配置字典
        params={  
            "command": "python",  # 指定要执行的命令为 python
            "args": ["mcp_server.py"],  # 指定命令的参数，即要运行的脚本文件为 mcp_server.py
        }
    ) as mcp_server:  # 将启动的服务器实例赋值给变量 mcp_server，进入上下文块
        agent = Agent(
            name="AI助手",
            instructions="你是一个友好的AI助手。使用中文进行问答",
            model="deepseek-flash",
            mcp_servers=[mcp_server]
        )

        result = await Runner.run(agent, '当前目录有几个文件？')  
        print(result.final_output)  

if __name__ == '__main__':  
    # 使用 asyncio.run() 启动事件循环，执行异步主函数 main
    asyncio.run(main())  