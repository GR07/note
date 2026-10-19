import asyncio

# 从 agents 库中导入 Agent（智能体）和 Runner（运行器）类
from agents import Agent, Runner  
# 加载本地设置 # 导入本地的配置模块（加载上一段代码中的环境变量等设置）
import config  

agent = Agent(
    name="AI助手",
    instructions="你是一个友好的AI助手。使用中文进行问答",
    model="deepseek-flash",
)

# 定义一个异步主函数 main
async def main():  
    # 异步运行智能体，等待用户输入问题后传给 agent，将结果赋值给 result
    result = await Runner.run(agent, '1+1等于多少')  

    history = result.to_input_list()  # 将结果转换为输入列表，方便后续使用
    history.append({ "role": "user", "content": "再+1等于多少" })
    result = await Runner.run(agent, history)  
    # LLM 回复：需要知道“再”前面的数是多少才能算哦。
    print(result.final_output)  

if __name__ == '__main__':  
    # 使用 asyncio.run() 启动事件循环，执行异步主函数 main
    asyncio.run(main())  