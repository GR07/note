import asyncio
import time
from typing import List, Optional
from pydantic import BaseModel
from agents import Agent, Runner, function_tool
# from config import model_name  # 加载本地设置
import config
import logging

logging.basicConfig(level=logging.DEBUG, filename="debug.log", filemode="w", encoding="utf-8")

model_name = "deepseek-flash"  # 加载本地设置
# 定义四个工具
@function_tool
def add_one(number: float) -> float:
    """将输入数字加1。"""
    return number + 1


@function_tool
def subtract_one(number: float) -> float:
    """将输入数字减1。"""
    return number - 1


@function_tool
def multiply_by_two(number: float) -> float:
    """将输入数字乘以2。"""
    return number * 2


@function_tool
def divide_by_two(number: float) -> float:
    """将输入数字除以2。"""
    if number == 0:
        return 0.0  # 避免除以零
    return number / 2


# 定义每个操作的代理
add_one_agent = Agent(
    name="AddOneAgent",
    instructions="你是一个专门将输入数字加1的代理，使用 add_one 工具。返回你做了什么，以及结果。",
    tools=[add_one], model=model_name,
)

subtract_one_agent = Agent(
    name="SubtractOneAgent",
    instructions="你是一个专门将输入数字减1的代理，使用 subtract_one 工具。返回你做了什么，以及结果。",
    tools=[subtract_one], model=model_name,
)

multiply_by_two_agent = Agent(
    name="MultiplyByTwoAgent",
    instructions="你是一个专门将输入数字乘以2的代理，使用 multiply_by_two 工具。返回你做了什么，以及结果。",
    tools=[multiply_by_two], model=model_name,
)

divide_by_two_agent = Agent(
    name="DivideByTwoAgent",
    instructions="你是一个专门将输入数字除以2的代理，使用 divide_by_two 工具。返回你做了什么，以及结果。",
    tools=[divide_by_two], model=model_name,
)

# 定义调度代理
triage_agent = Agent(
    name="TriageAgent",
    instructions="""你是一个调度代理，负责将当前数字转换为目标数字（假设数字均为整数）。
你的任务是：
1. 分析当前数字与目标数字的差值，推理哪种操作（加1、减1、乘2、除2）步骤最少的接近目标数字，根据当前数字选择最合适的操作。
2. 考虑操作历史，避免无限循环（如反复加1和减1），尽量用最少的操作步骤完成目标。
3. 当任务完成时输出：exit
""",
    # tools=[add_one, subtract_one, multiply_by_two, divide_by_two],
    handoffs=[add_one_agent, subtract_one_agent, multiply_by_two_agent,
              divide_by_two_agent],
    model=model_name,
)


async def transform_number(initial_number: float, target_number: float):
    """使用可用工具将初始数字转换为目标数字。"""
    current_number = initial_number
    operation_history = []
    max_turns = 10
    turn = 0

    history = []
    agent = triage_agent  # 初始化Agent

    input_data = f"当前数字：{current_number}，目标数字：{target_number}，操作历史：{operation_history}"
    print("Init >", input_data)

    history.append({"role": "user", "content": input_data})

    while True:
        time.sleep(2)
        if turn >= max_turns:
            raise ValueError(
                f"在 {max_turns} 轮次内未能达到目标 {target_number}。最终数字：{current_number}")
            # 准备调度代理的输入

        result = Runner.run_streamed(triage_agent, input=history,
                                     max_turns=max_turns)
        async for event in result.stream_events():
            if event.type == "agent_updated_stream_event":
                print(f"DEBUG > Agent 已切换至：{event.new_agent.name}")

        turn += 1
        history = result.to_input_list()  # 更新对话记录
        talk = f"Agent({result.last_agent.name}）>:{result.final_output}"
        print(talk)

        history.append({"role": "user", "content": '检查目前的进度，并作出新的推理和决策'})

        if "exit" in result.final_output:
            print(f"DBG >  Agent({agent.name}) 结束任务.")
            break


# 示例用法
async def main():
    initial_number = 5
    target_number = 23

    await transform_number(initial_number, target_number)

if __name__ == '__main__':  
    asyncio.run(main())  