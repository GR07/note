import asyncio

# 从 agents 库中导入 Agent（智能体）和 Runner（运行器）类
from agents import Agent, Runner  
# 加载本地设置 # 导入本地的配置模块（加载上一段代码中的环境变量等设置）
import config  

agent_a = Agent(
    name="中文AI助手",
    model="deepseek-flash",
    instructions="只能使用中文进行回答",  # 系统提示词
    handoff_description="如果用户使用中文提问，请将问题交给我来回答"  # 交接描述
)

agent_b = Agent(
    name="英文AI助手",
    model="deepseek-flash",
    instructions="只能使用英文进行回答",  # 系统提示词
    handoff_description="如果用户使用英文提问，请将问题交给我来回答"  # 交接描述
)

agent_c = Agent(
    name="日文AI助手",
    model="deepseek-flash",
    instructions="只能使用日文进行回答",  # 系统提示词
    handoff_description="如果用户使用日文提问，请将问题交给我来回答"  # 交接描述
)

agent_d = Agent(
    name="分发助手",
    instructions="不回答问题，而是根据语言类型，把问题分发给合适的 Agent",  # 系统提示词
    model="deepseek-flash",
    handoffs=[agent_a, agent_b, agent_c]
)

# 定义一个异步主函数 main
async def main():  
    query = '你是谁？'

    result = Runner.run_streamed(agent_d, query)
    async for event in result.stream_events():
        print(event)

    # result = await Runner.run(agent_d, query)

    print(result.final_output)

if __name__ == '__main__':  
    # 使用 asyncio.run() 启动事件循环，执行异步主函数 main
    asyncio.run(main())  