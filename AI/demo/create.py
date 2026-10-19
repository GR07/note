# 从 agents 库中导入 Agent（智能体）和 Runner（运行器）类
from agents import Agent, Runner  
# 加载本地设置 # 导入本地的配置模块（加载上一段代码中的环境变量等设置）
import config  

# 实例化一个 Agent 对象，赋值给变量 agent
agent = Agent(  
    # 设置该智能体的名称
    name="AI助手",  
    # 设置智能体的行为指令和系统提示词
    instructions="你是一个友好的AI助手。使用中文进行问答",  
    model="deepseek-flash",
)

# 使用运行器同步运行该智能体，并传入用户的问题 "你是谁？"，将结果赋值给 result
result = Runner.run_sync(agent, '你是谁？')  
# 打印出运行结果的最终输出内容
print(result.final_output)  