
# 幻影依赖

**幻影依赖（Phantom Dependency，也叫“幽灵依赖”）** 指的是：**你的代码里 `import` 了某个包，但这个包并没有写在你项目的 `package.json` 里；它能跑起来，只是因为它是某个依赖的“依赖”，被包管理器提升到了顶层 `node_modules` 里。**

### 它是怎么产生的？

以 npm 和 Yarn Classic 为例，它们默认会把依赖**扁平化提升**到 `node_modules` 顶层。

假设你的 `package.json` 只声明了：

```json
{
  "dependencies": {
    "some-lib": "^1.0.0"
  }
}
```

而 `some-lib` 自己依赖了 `lodash`。npm 为了减少重复安装，会把 `lodash` 提升到项目根目录的 `node_modules/lodash`。

于是你的代码可以这样写，而且**居然能运行**：

```js
// 你的项目代码
import _ from 'lodash'
```

但你的 `package.json` 里**根本没有 `lodash`**。这就是幻影依赖：`lodash` 对你项目来说像一个“幽灵”，你没声明它，但它存在。

### 为什么危险？

1. **依赖一升级就崩**  
   如果 `some-lib` 新版本不再依赖 `lodash`，或者依赖结构变化，`node_modules/lodash` 可能消失，你的代码立刻报 `Cannot find module 'lodash'`。

2. **版本不可控**  
   你用的 `lodash` 版本取决于 `some-lib` 的依赖版本，而不是你声明的版本。某天传递依赖升级，行为可能悄悄改变。

3. **CI / 不同环境行为不一致**  
   本地能跑，CI 上可能因为安装策略、锁文件、包管理器不同而失败。

4. **发布包时漏声明**  
   如果你发布一个库，消费者安装后可能因为缺少这个依赖而无法使用。

5. **安全审计和升级遗漏**  
   你的 `package.json` 里看不到它，依赖审计、Renovate 升级、漏洞扫描可能漏掉这个实际被使用的包。

### 如何避免？

- **原则：代码里直接 `import` 的包，必须显式写进 `package.json` 的 `dependencies` 或 `devDependencies`。**
- 使用更严格的包管理器：
  - **pnpm** 默认通过符号链接构造严格的 `node_modules`，未声明的包通常无法直接访问；
  - **Yarn Berry 的 PnP** 直接禁止访问未声明的依赖，会明确报错。
- 用工具检测：
  - `depcheck`：找出未声明依赖和未使用依赖；
  - `knip`：更现代的未使用/未声明依赖检测；
  - ESLint 的 `import/no-extraneous-dependencies` 规则。
- 在 Monorepo 中尤其注意：workspace 包被提升后，也很容易让其他包“偷偷”引用未声明的 workspace 依赖。

一句话总结：**幻影依赖就是“你没声明，但因为依赖提升碰巧能用”的包；它让项目看起来能跑，实际上依赖关系是脆弱的、不确定的。**
