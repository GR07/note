# 关于 OpenSpec 归档后规格复用的问题

## 问题

归档完成后，比如下个星期再有需求变更，你怎么利用这些已归档到 `openspec/specs/` 的规格呢？

## 回答

归档后，这些规格的作用可以概括为：

> **`openspec/specs/` 是“当前能力合同”**  
> **`openspec/changes/archive/` 是“历史变更记录”**

它们在未来变更中的使用方式不同。

### 1. 主规格目录是后续变更的“参照基线”

归档完成后，`openspec/specs/` 下的规格文件会成为项目的能力基线。当下周有新需求时，我会先看这些规格，判断新需求属于哪种类型：

| 类型 | 例子 | 对应操作 |
|---|---|---|
| 新增能力 | 增加分享到微信功能 | 在 proposal 中列为 `New Capability`，创建新的 `specs/<name>/spec.md` |
| 修改现有能力 | 轮播间隔从 5 秒改为 3 秒 | 在 proposal 中列为 `Modified Capability`，创建 delta spec |
| 删除能力 | 移除背景音乐 | 在 proposal 中列为 `Removed Capability`，创建 delta spec |

### 2. 未来变更的工作流程

```
┌─────────────────────────────────────────────────────────┐
│  新需求：比如“轮播间隔改为 3 秒，并支持微信分享”        │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────┐
        │  查看 openspec/specs/ 现有能力    │
        │  - blessing-carousel（已存在）   │
        │  - 需要新增：wechat-share        │
        └──────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
  ┌──────────────────┐        ┌──────────────────────┐
  │ Modified Capability│        │ New Capability       │
  │ blessing-carousel│        │ wechat-share         │
  │                   │        │                      │
  │ 创建 delta spec：  │        │ 创建新 spec：        │
  │ specs/blessing-   │        │ specs/wechat-share/  │
  │ carousel/spec.md  │        │ spec.md              │
  └──────────────────┘        └──────────────────────┘
```

### 3. Modified Capability 的 delta spec 示例

如果想把轮播间隔从 5 秒改为 3 秒，proposal 里会写：

```markdown
### Modified Capabilities
- `blessing-carousel`: 自动轮播间隔从 5 秒调整为 3 秒
```

对应的 delta spec 文件 `openspec/changes/<new-change>/specs/blessing-carousel/spec.md` 会是：

```markdown
## MODIFIED Requirements

### Requirement: 自动轮播
The system SHALL 每 3 秒自动切换到下一条祝福语。

#### Scenario: 自动轮播
- **WHEN** 页面加载完成
- **THEN** 系统每 3 秒自动切换到下一条祝福语
```

归档时，这个 delta spec 会同步到 `openspec/specs/blessing-carousel/spec.md`，替换主规格中的对应需求。

### 4. 归档目录本身的作用

`openspec/changes/archive/2026-07-19-modularize-script-es-modules/` 主要用于：

1. **历史审计**：能查到这个变更当时为什么做、怎么设计、有哪些任务。
2. **回滚参考**：如果发现某个决策有问题，可以回看当时的 `design.md` 和 `proposal.md`。
3. **知识沉淀**：新成员可以通过归档目录理解项目演进过程。

但它不会被系统自动引用。未来的 proposal 和 design 主要参考的是 `openspec/specs/` 里的当前能力。

### 5. 一句话总结

> **归档后，规格没有“消失”，而是被分成了两部分：**
> - 当前有效的能力标准 → `openspec/specs/`
> - 已完成的历史变更 → `openspec/changes/archive/`

下次提新需求时，我会先读 `openspec/specs/` 判断是新增能力还是修改现有能力，然后再继续走 `propose → apply → archive` 的流程。
