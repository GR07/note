# 推理 + 执行（ReAct）重要

2023年的论文

区别于思维树，思维树是在做任务拆解的时候就已经输出了，又因为输出会影响后面的输出，所以如果输出的路线是错的，就会增加模型的幻觉。

而 ReAct，是先大量推理通过推理产生的traces帮助模型归纳、更新纠正行动计划，再通过与知识库等外部工具信息进行交互去执行输出结果。循环以上步骤，直到完成任务。


下面是一个最简易 Demo （还可优化成多工具调用）


```python
import json

from openai import OpenAI

# ==========================================
# 1. 初始化 OpenAI 兼容客户端
# ==========================================
client = OpenAI(
    api_key="sk-fxxx",
    base_url="https://api.deepseek.com",
)


def get_info_on_ball_game(game_name: str):
    """
    根据球类名称，返回匹配的球类比赛信息列表。

    参数:
        game_name: 球类名称关键字，例如 "篮球"、"排球"、"足球"。
                   使用不区分大小写的子串匹配。

    返回:
        匹配到的字典列表；每个字典包含名称、描述、队伍人数、场上人数。
    """
    # 本地模拟数据，相当于一个简易数据库
    data = [
        {
            "name": "篮球 (Basketball)",
            "description": "两支球队通过投篮得分，比赛分为四节，每节时间因联赛而异。",
            "team_members": 12,      # 每队注册人数
            "players_on_field": 5,   # 场上球员人数
        },
        {
            "name": "排球 (Volleyball)",
            "description": "两队隔网对抗，通过击球过网并使其落在对方场地得分。",
            "team_members": 12,
            "players_on_field": 6,
        },
        {
            "name": "足球 (Soccer)",
            "description": "两支球队通过踢球进入对方球门得分。比赛分为上下半场。",
            "team_members": 11,
            "players_on_field": 11,
        },
    ]

    ret = []
    # 不区分大小写做子串匹配，例如 "篮球" 能匹配 "篮球 (Basketball)"
    for d in data:
        if game_name.lower() in d["name"].lower():
            ret.append(d)
    return ret


# ==========================================
# 2. 注册工具（Function Calling）
# ==========================================
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_info_on_ball_game",
            "description": "获取球类比赛的基本信息和人数规模",
            "parameters": {
                "type": "object",
                "properties": {
                    # 参数名必须与 Python 函数的形参名一致
                    "game_name": {
                        "type": "string",
                        "description": "球类名称，例如：篮球、排球、足球",
                    },
                },
                "required": ["game_name"],
                # 除了 properties 里明确列出的字段之外，不允许出现任何其他字段。
                "additionalProperties": False,
            },
            # strict=True 时，参数 schema 必须严格符合要求
            "strict": True,
        },
    }
]

# ==========================================
# 3. 系统提示词：定义 Agent 的思考/行动循环
# ==========================================
system_prompt = """
你运行在一个和思考、行动、观察和回答的循环，在循环结束时，你输出最终的答案。
用“思考”来描述你对被问问题的想法。
用“操作”运行您可用的操作之一。
“观察”将是运行某些操作的结果。
“答案”将是分析观察结果的结果。
"""

# 对话历史：第一条固定为 system prompt
message_history = []
message_history.append({"role": "system", "content": system_prompt})


def get_completion(message):
    """
    把一条消息追加到历史中，调用大模型，再把模型回复追加到历史中。

    参数:
        message: 一条符合 OpenAI Chat 格式的消息字典，例如
                 {"role": "user", "content": "..."} 或
                 {"role": "tool", "tool_call_id": "...", "content": "..."}

    返回:
        模型回复的字典形式（包含 role、content、tool_calls 等字段）。
    """
    message_history.append(message)  # 用户/工具消息加入记录

    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=message_history,
        tools=tools,
    )

    # 新版 OpenAI SDK 返回 Pydantic 对象，用 model_dump() 递归转成 dict。
    # 旧版可用 response.choices[0].message.dict()。
    # 直接用 dict(...) 不会递归展开 tool_calls 等嵌套对象，容易出问题。
    response_dict = response.choices[0].message.model_dump()

    message_history.append(response_dict)  # 大模型回复加入记录
    return response_dict


def agent(query):
    """
    简易 Agent 主循环：
      1. 把用户问题发给模型；
      2. 若模型要求调用工具，则本地执行工具，把结果作为 tool 消息回传；
      3. 重复，直到模型不再调用工具或达到最大轮数。
    """
    max_turns = 5
    current_turns = 1
    next_message = {"role": "user", "content": query}

    while current_turns <= max_turns:
        message = get_completion(next_message)

        # 模型可能只返回 tool_calls，此时 content 为 None
        if message.get("content"):
            print(message["content"])

        # 判断是否有工具调用请求
        if message.get("tool_calls"):
            tool_call = message["tool_calls"][0]

            func_call_id = tool_call["id"]
            # arguments 是 JSON 字符串，需要反序列化成 kwargs
            func_kwargs = json.loads(tool_call["function"]["arguments"])

            # 执行本地函数；加 try/except 防止参数异常
            try:
                func_result = get_info_on_ball_game(**func_kwargs)
            except TypeError as e:
                func_result = {"error": f"参数错误: {e}"}

            print(f"观察: {func_result}")

            # 工具结果必须以 role="tool" 回传，并带上对应的 tool_call_id
            next_message = {
                "role": "tool",
                "tool_call_id": func_call_id,
                "content": str(func_result),
            }
        else:
            # 没有工具调用，说明模型已给出最终答案，结束循环
            break

        current_turns += 1


if __name__ == "__main__":
    # 预期流程：
    #   1) 模型决定调用 get_info_on_ball_game("篮球") 和 ("排球")
    #   2) 得到场上人数 5 和 6
    #   3) 模型计算 5 * 6 = 30 并给出答案
    query = "比赛场上，篮球队的球员人数乘以排球队的球员人数，结果是多少"
    agent(query)
```