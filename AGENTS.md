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
