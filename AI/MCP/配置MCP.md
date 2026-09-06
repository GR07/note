# 配置 MCP Server

```json
{
  "mcpServers": {
    // 名称
    "my-mcp-server": {
        // 是否被禁用
      "disabled": false,  
        // 超时 s
      "timeout": 60,
      // cline 与 MCP 沟通的方式
      // stdio：标准输入和标准输出
      // sse：相对较少，暂不了解
      "type": "stdio",
        // 选用哪个程序来运行 mcp
      "command": "",
        // 参数
      "args": [
      ],
    },
    // uvx
    "fetch": {
      "args": [
        "mcp-server-fetch"
      ],
      "command": "uvx"
    },
    // npx
    "mcp-server-hotnews": {
      "command": "npx",
      "args": [
        "-y",
        "@wopal/mcp-server-hotnews"
      ]
    },
  }
}
```