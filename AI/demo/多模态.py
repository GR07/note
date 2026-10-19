import asyncio
import base64
# 从 agents 库中导入 Agent（智能体）和 Runner（运行器）类
from agents import Agent, Runner  
# 加载本地设置 # 导入本地的配置模块（加载上一段代码中的环境变量等设置）
import config  

agent = Agent(
    name="AI助手",
    instructions="你是一个友好的AI助手。使用中文进行问答",
    model="deepseek-flash",
)

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        bin_content = image_file.read()
        return base64.b64encode(bin_content).decode("utf-8")
    
# 定义一个异步主函数 main
async def main():  
    base64_image = encode_image("pic.png") # 字符串
    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "input_image",
                    "image_url": f"data:image/jpeg;base64,{base64_image}",
                }
            ],
        }, # 图片内容
        {
            "role":"user",
            "content":"图片中是什么内容？",
        }, # 提示词内容
    ]
    result = await Runner.run(agent, messages)
    print(result.final_output)  

if __name__ == '__main__':  
    # 使用 asyncio.run() 启动事件循环，执行异步主函数 main
    asyncio.run(main())  