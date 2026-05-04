# Installing Python

如果 Python 已安装在你的系统上，uv 会自动检测并使用它，无需额外配置。然而，uv 也可以安装和管理 Python 版本。uv 会根据需要自动安装缺失的 Python 版本——你无需先安装 Python 即可开始使用。

## 快速开始

安装最新的 Python 版本：

```bash
$ uv python install
```

> **注意**
>
> Python 官方并未发布可分发的二进制文件。因此，uv 使用来自 Astral 的 [python-build-standalone](https://github.com/astral-sh/python-build-standalone) 项目的发行版。更多详情请参阅 [Python 发行版文档](https://docs.astral.sh/uv/concepts/python-versions/#managed-python-distributions)。

一旦 Python 安装完成，uv 命令会自动使用它。uv 还会将安装的版本添加到你的 `PATH` 中：

```bash
$ python3.13
```

默认情况下，uv 只安装带版本号的可执行文件。要安装 `python` 和 `python3` 可执行文件，请包含实验性的 `--default` 选项：

```bash
$ uv python install --default
```

> **提示**
>
> 有关安装 Python 可执行文件的更多详细信息，请参阅[相关文档](https://docs.astral.sh/uv/concepts/python-versions/#installing-python-executables)。

## 安装特定版本

安装特定的 Python 版本：

```bash
$ uv python install 3.12
```

安装多个 Python 版本：

```bash
$ uv python install 3.11 3.12
```

安装替代的 Python 实现，例如 PyPy：

```bash
$ uv python install [email protected]
```

更多详情请参阅 [`python install` 文档](https://docs.astral.sh/uv/reference/cli/#uv-python-install)。

## 重新安装 Python

要重新安装由 uv 管理的 Python 版本，请使用 `--reinstall` 选项，例如：

```bash
$ uv python install --reinstall
```

这将重新安装所有之前安装过的 Python 版本。Python 发行版在不断改进，因此即使 Python 版本没有变化，重新安装也可能会修复一些问题。

## 查看 Python 安装情况

查看可用和已安装的 Python 版本：

```bash
$ uv python list
```

更多详情请参阅 [`python list` 文档](https://docs.astral.sh/uv/reference/cli/#uv-python-list)。

## 自动下载 Python

使用 uv 时，无需显式安装 Python。默认情况下，uv 会在需要时自动下载 Python 版本。例如，如果 Python 3.12 未安装，以下命令会自动下载它：

```bash
$ uvx [email protected] -c "print('hello world')"
```

即使没有指定特定的 Python 版本，uv 也会按需下载最新版本。例如，如果系统上没有 Python 版本，以下命令会在创建新的虚拟环境之前先安装 Python：

```bash
$ uv venv
```

> **提示**
>
> 如果你希望更精确地控制 Python 的下载时机，可以轻松禁用自动下载功能。

## 使用已有的 Python 版本

如果系统上已存在 Python 安装，uv 会使用它们。无需额外配置：只要系统 Python 满足命令调用的要求，uv 就会使用它。详情请参阅 [Python 发现文档](https://docs.astral.sh/uv/concepts/python-versions/#discovery-of-python-versions)。

要强制 uv 使用系统 Python，请提供 `--no-managed-python` 标志。更多详情请参阅 [Python 版本偏好文档](https://docs.astral.sh/uv/concepts/python-versions/#managed-python-preferences)。

## 升级 Python 版本

> **重要**
>
> 对 Python 补丁版本升级的支持目前处于预览阶段。这意味着该行为是实验性的，可能会发生变化。

将 Python 版本升级到最新的支持补丁版本：

```bash
$ uv python upgrade 3.12
```

升级所有由 uv 管理的 Python 版本：

```bash
$ uv python upgrade
```

更多详情请参阅 [`python upgrade` 文档](https://docs.astral.sh/uv/reference/cli/#uv-python-upgrade)。

## 下一步

要了解更多关于 `uv python` 的信息，请参阅 [Python 版本概念页面](https://docs.astral.sh/uv/concepts/python-versions/) 和[命令参考文档](https://docs.astral.sh/uv/reference/cli/)。

或者，继续阅读以了解如何使用 uv 运行脚本和调用 Python。

---

*July 17, 2025 · Made with Material for MkDocs*
