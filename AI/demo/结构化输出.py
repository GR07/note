from pydantic import BaseModel
import asyncio
import json

from agents import Agent, Runner
import config

class Data(BaseModel):
    名字: str
    年龄: int
    性别: str
    事迹: str

agent = Agent(
    name="AI助手",
    instructions="""你是一个友好的AI助手。使用中文进行问答。
请严格按照以下 JSON 格式输出结果，不要包含任何其他解释或 markdown 代码块标记：
{
    "名字": "人物名字",
    "年龄": 年龄数字,
    "性别": "男/女",
    "事迹": "人物事迹简述"
}""",
    model='deepseek-flash',
)

async def main():
    result = await Runner.run(agent, '介绍一位值得记住的人？')
    
    output_text = result.final_output
    
    try:
        obj = Data.model_validate_json(output_text)
        print("--- 解析成功 ---")
        print(result.final_output)
        print(obj.名字)
        print(obj.性别)
        print(obj.事迹)
        print(result.to_input_list())
    except Exception as e:
        print("解析 JSON 失败，模型原始输出为：")
        print(output_text)
        print(f"错误信息: {e}")

if __name__ == '__main__':
    asyncio.run(main())