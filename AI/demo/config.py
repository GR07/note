# 导入操作系统接口模块，主要用于读取环境变量
import os  
# 从 openai 库中导入异步客户端类 AsyncOpenAI
from openai import AsyncOpenAI  
# 从 agents 库的 models 模块中导入 openai_provider，用于后续配置模型
from agents.models import openai_provider  
# 从 agents 库中导入以下三个函数，用于全局配置
from agents import (  
    # 用于设置默认的 OpenAI API 接口类型
    set_default_openai_api,  
    # 用于设置默认的 OpenAI 客户端实例
    set_default_openai_client,  
    # 用于控制是否禁用追踪服务
    set_tracing_disabled,  
)

# 创建一个异步的 OpenAI 客户端实例，赋值给变量 client
client = AsyncOpenAI(  
    api_key="sk-f781f191c25a406dac08aa27f9dee80b",
    base_url="https://api.deepseek.com",
)

# 使用自定义客户端，并设置不用于追踪服务
set_default_openai_client(client=client, use_for_tracing=False)  
# 使用兼容的API模式，将默认 API 调用方式设置为 "chat_completions"（聊天补全模式）
set_default_openai_api("chat_completions")  
# 全局禁用 OpenAI 的追踪服务（通常用于第三方兼容接口）
set_tracing_disabled(disabled=True)  

# 定义要使用的模型名称字符串
model_name = 'deepseek-flash'  
# 修改 openai_provider 中的默认模型名称，使其指向上面定义的模型
openai_provider.DEFAULT_MODEL = model_name  