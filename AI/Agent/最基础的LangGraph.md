## 最小可运行示例

下面是一个最基础的 LangGraph 程序，两个节点顺序执行，展示 State 如何逐步更新

安装：pip install -U langgraph

```python
from langgraph.graph import START, StateGraph
from typing_extensions import TypedDict

class State(TypedDict):
    text: str

def node_a(state: State) -> dict:
    return {"text": state["text"] + "a"}

def node_b(state: State) -> dict:
    return {"text": state["text"] + "b"}

graph = StateGraph(State)
graph.add_node("node_a", node_a)
graph.add_node("node_b", node_b)
graph.add_edge(START, "node_a")
graph.add_edge("node_a", "node_b")

app = graph.compile()
print(app.invoke({"text": ""}))
# 输出: {'text': 'ab'}
```


## 整体思路（先看懂这个最重要）

这个程序就像一条**流水线**：

```
START（起点）→ node_a（追加"a"）→ node_b（追加"b"）→ 结束
```

State（状态）就像流水线上传递的一个"包裹"，每个节点加工一下这个包裹，最后输出 `{'text': 'ab'}`。

---

## 逐行讲解

### 第 1~2 行：导入工具

```python
from langgraph.graph import START, StateGraph
from typing_extensions import TypedDict
```

- `StateGraph`：LangGraph 提供的一个"画图工具"，用来搭建工作流。
- `START`：表示流程的**起点**（"START" 就是英文"开始"）。
- `TypedDict`：Python 的类型标注工具，用来给"状态"规定数据结构（规定包裹里有哪些东西）。

### 第 4~5 行：定义状态

```python
class State(TypedDict):
    text: str
```

- 定义这个工作流的"包裹"里装什么。
- `text: str` 意思是：包裹里有一个叫 `text` 的字段，是**字符串**类型。
- 一开始它是空的 `""`，后面节点会往里加内容。

> 大白话：我先造一个空盒子，里面有个标签叫 `text`。

### 第 7~8 行：第一个节点

```python
def node_a(state: State) -> dict:
    return {"text": state["text"] + "a"}
```

- `node_a` 是流水线上的**第一个工位**。
- 输入：当前状态 `state`（那个盒子）。
- `state["text"]`：取出盒子里 `text` 的内容。
- `+ "a"`：在末尾拼接一个字母 **a**。
- `return {"text": ...}`：把加工后的结果放回盒子，交给下一个节点。

> 大白话：这个工位负责往盒子的 `text` 后面加一个 "a"。

### 第 10~11 行：第二个节点

```python
def node_b(state: State) -> dict:
    return {"text": state["text"] + "b"}
```

- `node_b` 是**第二个工位**，和上面逻辑一样，只是追加字母 **b**。
- 它会拿到 node_a 已经加工过的结果（此时 `text` 已经是 `"a"`），拼上 "b" 后变成 `"ab"`。

### 第 13~17 行：搭建流水线

```python
graph = StateGraph(State)
graph.add_node("node_a", node_a)
graph.add_node("node_b", node_b)
graph.add_edge(START, "node_a")
graph.add_edge("node_a", "node_b")
```

- `StateGraph(State)`：创建一张图，并告诉它"这张图的状态长什么样"（用我们定义的 State）。
- `add_node("node_a", node_a)`：把函数 `node_a` **注册为图中的一个节点**，名字叫 `"node_a"`。两行分别注册了两个工位。
- `add_edge(START, "node_a")`：画一条箭头，从**起点**指向 node_a，表示流程从这里开始。
- `add_edge("node_a", "node_b")`：再画一条箭头，从 node_a 指向 node_b，表示执行完 A 接着执行 B。

> 大白话：先造流水线，再安排两个工位上岗，最后用箭头把它们的执行顺序连起来。

### 第 19~21 行：运行并输出结果

```python
app = graph.compile()
print(app.invoke({"text": ""}))
# 输出: {'text': 'ab'}
```

- `graph.compile()`：**编译**这张图，把它变成一个可以真正运行的程序 `app`。（画图 → 落成工厂）
- `app.invoke({"text": ""})`：**启动**流程，初始状态是 `text` 为空字符串 `""`。
- 流程跑完后打印最终状态：
  - node_a：`"" + "a"` → `"a"`
  - node_b：`"a" + "b"` → `"ab"`
- 所以输出 `{'text': 'ab'}`。

---

## 一张表总结

| 部分 | 作用 | 大白话 |
|---|---|---|
| `class State` | 定义数据结构 | 规定包裹里有什么 |
| `node_a` / `node_b` | 加工函数 | 两个工位，分别加 "a"、加 "b" |
| `add_node` | 注册节点 | 工位上岗 |
| `add_edge` | 连接节点 | 安排执行顺序 |
| `compile()` | 编译 | 图纸变工厂 |
| `invoke()` | 运行 | 启动流水线 |

## 为什么 Agent 开发都用这个套路？

虽然这个例子很简单，但它体现了 LangGraph 的核心思想：**把复杂的 Agent 拆成一个个节点，用 State 在节点之间传递信息**。真实项目里，节点可能是"调用大模型""搜索网页""调用工具"，而 State 里会装对话历史、工具结果等，但骨架和这张图一模一样。



## 核心理论总结

结合前面的代码，把这四个核心概念一个个吃透。

---

## 四组件与代码的对应关系

| 概念 | 上一段代码中的对应物 |
|---|---|
| **State** | `class State(TypedDict)` |
| **Node** | `node_a`、`node_b` 两个函数 |
| **Edge** | `add_edge(START, "node_a")` 等连线 |
| **Graph** | `graph = StateGraph(State)` → `compile()` |

### 1. State（状态）——"共享内存"

> 用 TypedDict 或 Pydantic 模型定义，是所有节点读写的"共享内存"。节点返回的是**部分更新**，而不是完整状态。

大白话：State 就是**所有人共用的一块黑板**。

- 上一段代码里，黑板只有一个字段 `text`。
- 真实 Agent 里，黑板可能有 `messages`（对话历史）、`tool_calls`（工具调用结果）等很多字段。
- 关键点："**部分更新**"——节点不需要重写整块黑板，只写自己改的那一小部分。比如 node_a 只返回 `{"text": ...}`，黑板上的其他内容原样保留。

### 2. Node（节点）——"干活的函数"

> 一个纯函数，接收当前 State，返回需要更新的字段字典。可以是 LLM 调用、工具执行、路由判断等。

大白话：节点就是**流水线上的工位**，每个工位干一件事。

- 上一段代码中，node_a 和 node_b 都是"纯函数"：给同样的输入，一定给同样的输出，不偷偷搞小动作。
- 注意它**只返回要改的字段**，不是返回整个 State。
- 真实场景里，节点的"活"可以是：
  - 调用大模型生成回复
  - 执行一个工具（比如查天气）
  - 做路由判断（决定下一步去哪）

### 3. Edge（边）——"路标"

> 连接节点。普通边固定跳转；条件边根据 State 中的值动态决定下一个节点。

大白话：边就是**箭头**，告诉流程"下一步往哪走"。

- **普通边**：固定路线。上一段代码中 `node_a → node_b` 就是写死的，永远这么走。
- **条件边**（重点！）：看黑板上的内容决定路线。比如：

```python
def router(state: State) -> str:
    if "再见" in state["text"]:
        return "end_node"   # 用户说再见 → 结束
    return "node_b"         # 否则 → 继续处理
```

  这就像**岔路口的导航**：根据 State 里的值动态选择下一个节点。真实的 Agent（比如 ReAct 智能体）就是靠条件边在"思考"和"调用工具"之间反复循环的。

### 4. Graph（图）——"整套流水线"

> 由 StateGraph 实例化，添加节点和边后，必须调用 .compile() 才能执行。

大白话：图就是**工厂的完整图纸**。

- 流程：`new 图纸(State)` → 添加工位（add_node）→ 画箭头（add_edge）→ `compile()` 落成真正的工厂 → `invoke()` 开工。
- 为什么不能直接跑？因为 `add_node`/`add_edge` 只是在**画图纸**，`compile()` 才检查图纸合不合理（比如有没有断掉的箭头）、把图纸变成可执行的机器。

---

## 最关键的细节（图中最下面那段话）

> 节点函数**必须返回字典**，只包含要更新的键；如果直接修改传入的 `state` 并返回整个 state，LangGraph 可能不会按预期合并状态。

用大白话和例子说明：

```python
# ✅ 正确：只返回要更新的字段（部分更新）
def node_a(state: State) -> dict:
    return {"text": state["text"] + "a"}

# ❌ 错误：直接改 state，还返回整个 state
def node_a(state: State) -> dict:
    state["text"] += "a"      # 偷偷改了黑板
    return state              # 返回整块黑板
```

为什么不行？因为 LangGraph 的工作方式是：节点返回一个"**变更清单**"，由框架负责**合并**进 State。如果你绕过这个机制直接改黑板，框架就不知道该合并什么，更新可能不生效或乱套。

> 类比：公司规定报销要走"提交申请单 → 财务合并入账"的流程。你自己直接改账本，账就乱了。

---

## 串联记忆：一张图总结

```
State（黑板）──被读写──> Node（工位）
                              │
Edge（箭头）决定 ───────────> 下一个 Node
                              │
Graph（图纸）= State + Nodes + Edges ──compile()──> 可运行的 App
```

上一段代码虽然只有两个节点、一条直线，但 State 共享、节点加工、边指路、图编译这四个要素已经全部具备——这就是所有复杂 LangGraph Agent 的最小骨架。