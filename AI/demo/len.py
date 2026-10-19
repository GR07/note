from deepseek_tokenizer import ds_token

def tokens_by_messages(message_history: list):
    tokens = 0
    for msg in message_history:
        text = msg['content']
        tokens += len(ds_token.encode(text))
    return tokens


message_history = []

system_prompt = """
你运行在一个思考、行动、观察和回答的循环，在循环结束时，你输出最终的答案。
用“思考”来描述你对被问问题的想法。
用“操作”运行您可用的操作之一。
“观察”将是运行这些操作的结果。
“答案”将是分析观察结果的结果。
"""
message_history.append({"role": "system", "content": system_prompt})

query = '比赛场上，篮球队的球员人数乘以排球队的球员人数，结果是多少'
message_history.append({"role": "user", "content": query})

print(tokens_by_messages(message_history))