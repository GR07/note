import asyncio

# 从 agents 库中导入 Agent（智能体）和 Runner（运行器）类
from agents import Agent, Runner  
# 导入响应文本增量事件类型，用于流式输出判断
# 导入特定的事件类型，用于识别流式返回的文本片段
from openai.types.responses import ResponseTextDeltaEvent 
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
    result = Runner.run_streamed(agent, '讲一个故事至少300个字')  
    # 异步迭代流式返回的事件
    async for event in result.stream_events():
        # 判断当前事件类型是不是 “原始响应事件”
        # 检查事件类型并验证数据类型
        if event.type == "raw_response_event" and isinstance(event.data, ResponseTextDeltaEvent):
            print(event.data.delta)

if __name__ == '__main__':  
    # 使用 asyncio.run() 启动事件循环，执行异步主函数 main
    asyncio.run(main())  