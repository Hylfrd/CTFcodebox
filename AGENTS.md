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

# 自动提交与推送

- 按功能或独立工作项分开、分次 commit，不把无关功能合并为一个提交。
- 每完成一个可独立验收的部分并通过相关检查，就把该部分的提交一次 push 到当前分支对应的 origin 分支，无需再次询问，也不等待整个任务结束。
- 首次推送时设置 upstream；推送失败时报告实际原因，不把本地提交当成已推送。
- 不使用 force push，不覆盖其他人的提交；用户明确要求暂缓提交或推送时，按用户要求执行。
