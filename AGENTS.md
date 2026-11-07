# Commit requirements

- 使用 Angular 风格标题：`<type>(<scope>): <summary>`。
- 每次提交仅包含标题，不添加正文或 footer；不采用 Angular 的强制正文要求。
- `type` 使用 `build`、`ci`、`docs`、`feat`、`fix`、`perf`、`refactor`、`test`；撤销提交使用 `revert`。
- 必须包含有实际意义的 `scope`，按受影响的项目区域命名；本文件的提交规范变更使用 `ai-policy`。
- `summary` 使用清晰英文，以小写祈使动词开头，末尾不加句号。可以使用简短句子，不必压缩成过短短语，也不要写成长段落。

示例：

```text
docs(ai-policy): define commit title requirements
docs(project): initialize repository documentation
feat(cli): add a decode command
fix(decode): preserve the progress bar position
```

# 第三方许可

- 引入第三方代码或资源时，核对并保留其适用的许可证、版权声明和修改说明。
- EBCTFCodeBox 上游代码采用 Apache-2.0；上游包含的第三方组件和资源可能适用其他许可证，不因本仓库采用 MIT 而改变。

# 自动提交与推送

- 完成用户已授权的仓库修改并通过相关检查后，自动创建符合上述规范的提交，并 push 到当前分支对应的 origin 分支，无需再次询问。
- 按独立目的分开、分次 commit；同一批任务的提交完成后一起 push。用户要求立即同步时，先推送已完成的提交。
- 首次推送时设置 upstream；推送失败时报告实际原因，不把本地提交当成已推送。
- 不使用 force push，不覆盖其他人的提交；用户明确要求暂缓提交或推送时，按用户要求执行。

# 工程约定

- 产品界面、CLI 帮助和项目说明仅使用简体中文，不引入多语言模块、翻译字典或语言切换入口。代码标识符和必要技术术语保留英文。
- 前端采用 React + TypeScript；网页入口在 apps/web，CLI 入口在 apps/cli，共享逻辑在 packages/core。
- 核心模块不得依赖 React、DOM 或 Node 文件系统。浏览器与本机 IO 分别放在对应入口；网页和 CLI 共用模块注册表。
- 使用 2 个空格缩进、单引号，目标行宽 100，由 Prettier 统一格式化。
- 提交前运行 npm run check；这包含格式、Lint、类型、测试、构建和 CLI 验证。新增功能应补充与其风险相符的检查。
- 页面约束见 PRODUCT.md 和 docs/page-requirements.md；当前只搭框架，具体业务功能按后续指令接入。
