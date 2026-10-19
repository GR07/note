
import json
import httpx
from openai import OpenAI

# ==========================================
# 1. 初始化 OpenAI 客户端 (使用阿里云百炼通义千问)
# 请务必将 "sk-xxx" 替换为您自己真实的 API Key
# ==========================================
client = OpenAI(
    api_key="sk-f781f191c25a406dac08aa27f9dee80b", 
    base_url="https://api.deepseek.com"
)

# ==========================================
# 2. 真实的本地工具函数：调用外部 API 获取天气
# ==========================================
def get_weather(latitude, longitude):
    # 补全了 API 参数，直接获取当前温度
    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m"
    response = httpx.get(url)
    data = response.json()
    # 提取当前温度并格式化返回
    return f"{data['current']['temperature_2m']}℃"

# ==========================================
# 3. 大模型的工具声明 (告诉模型有 get_weather 这个工具可用)
# ==========================================
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "根据指定的坐标提供当地摄氏温度",
        "parameters": {
            "type": "object",
            "properties": {
                "latitude": {"type": "number"},   # 纬度
                "longitude": {"type": "number"}   # 经度
            },
            "required": ["latitude", "longitude"],
            "additionalProperties": False
        },
        "strict": True
    }
}]

# ==========================================
# 4. 历史记录与请求封装函数
# ==========================================
# 使用变量保存历史记录（实现多轮对话上下文）
message_history = []

def get_completion(message):
    # 将最新的消息追加到历史记录中
    message_history.append(message)
    
    # 调用大模型接口
    response = client.chat.completions.create(
        model="deepseek-flash",          # 使用 deepseek-flash
        messages=message_history,   # 传入历史记录
        tools=tools,                # 传入可用工具列表
    )

    # 将大模型返回的 message 对象转换为字典格式
    response_dict = dict(response.choices[0].message)
    
    # 将大模型的回答也追加到历史记录中
    message_history.append(response_dict)
    
    return response_dict

# ==========================================
# 5. 主程序：执行完整的 Function Calling 闭环
# ==========================================
if __name__ == "__main__":
    print("--- 步骤 1：用户提问 ---")
    # 用户提问
    message = get_completion({"role": "user", "content": '今天北京天气如何'})
    print(message)  # LLM 返回工具调用信息
    print("\n")

    print("--- 步骤 2：解析工具调用参数并本地执行 ---")
    # 提取工具调用 ID
    func_call_id = message['tool_calls'][0].id
    # 提取参数 (大模型返回的是 JSON 字符串，需要用 json.loads 转成字典)
    func_kwargs = json.loads(message['tool_calls'][0].function.arguments)
    
    # 本地执行真实的 Python 函数 (使用 ** 解包字典参数)
    func_result = get_weather(**func_kwargs)
    print(f"本地执行结果: {func_result}")
    print("\n")

    print("--- 步骤 3：将执行结果返回给大模型，获取最终回答 ---")
    # 构造 role 为 "tool" 的消息，将真实的天气结果回传给大模型
    message = get_completion({
        "role": "tool", 
        "tool_call_id": func_call_id, 
        "content": str(func_result)
    })
    
    # 大模型结合真实数据，生成最终的自然语言回答
    print(message)  # LLM 返回最终回答