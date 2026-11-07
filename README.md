# CTFcodebox

本地 CTF 工具工程。使用 React + TypeScript 构建中文网页，通过独立 CLI 使用同一套核心模块。

当前完成应用外壳、四个页面入口、输入草稿、目标标签、日夜主题与 CLI 基础入口。具体解码、字符分析、图鉴和换算能力尚未接入。

## 开发

需要 Node.js 24（至少 24.15.0），依赖由 npm workspaces 管理。

```powershell
npm ci
npm run dev
```

打开终端显示的本地地址。页面仅请求本地资源，输入和密钥只保存在当前页面内存中，切换页面不会丢失；刷新会清空。主题偏好保存在浏览器本地。

## 检查与构建

```powershell
npm run check
```

依次检查格式、Lint、类型、关键测试、生产构建和 CLI 入口。GitHub Actions 在 Ubuntu 和 Windows 上运行同一命令。

```powershell
npm run build
npm run preview
```

网页产物在 `apps/web/dist`，CLI 产物在 `apps/cli/dist`。开发和预览服务仅监听本机回环地址。

## CLI

先构建，再通过根目录脚本调用：

```powershell
npm run build
npm run cli -- --help
npm run cli -- modules --json
npm run cli -- tools --json
```

框架阶段模块和工具清单为空。CLI 的 JSON 输出供 Agent 解析，诊断信息写入 stderr，用法错误退出码为 2。

## 目录与扩展

```text
apps/web/       页面、组件、浏览器状态与交互
apps/cli/       命令行入口与 Node.js IO
packages/core/  公共类型、模块注册表与后续算法接入点
scripts/        工程检查脚本
docs/           已确认的页面要求
```

新增工具实现 `packages/core/src/types.ts` 中的接口，组织为模块，并在 `packages/core/src/index.ts` 的模块清单中显式注册。网页与 CLI 读取同一份清单；页面路由独立于算法清单维护。需要的文件与系统能力由入口适配，不放入核心。

页面约束见 [页面要求](docs/page-requirements.md)，产品边界见 [PRODUCT.md](PRODUCT.md)。CyberChef 仅用于参考字体大小、行距和排版密度，本工程没有复制其代码、组件、资源或页面结构。

## 许可

本项目采用 [MIT](LICENSE)。当前没有迁入 EBCTFCodeBox 代码；后续如引入上游模块，按文件保留其原许可证、版权及修改说明。
