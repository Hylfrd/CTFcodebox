# CTFcodebox

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

用户已选择 React + TypeScript。本地网页采用 Vite，独立 CLI 使用 Node.js，共享代码通过 npm workspaces 组织。

## Users

Apostrophe 使用网页处理本地 CTF 材料；Agent 通过 CLI 使用同一套核心能力。

## Product Purpose

建立易扩展、易修改的本地工具工程。当前阶段搭建应用框架和 CI；算法、自动解码、文件分析等业务能力后续按明确要求加入。

## Capabilities and Constraints

- 简体中文界面、CLI 帮助和项目说明；没有语言切换或翻译模块。
- 网页与 CLI 共用核心模块定义；不提供 MCP。
- 原 EBCTFCodeBox 目录是只读分析资料，按需迁移模块前另核对许可与依赖。
- 页面沿用已确认的四个入口与首页双栏结构，具体约束见 docs/page-requirements.md。
- CyberChef 仅用于参考字号、行距和排版密度，不复制代码、资源、组件或页面结构。

## Operating Context

本机浏览器和终端使用。框架运行无外部 API、账号、数据库或常驻后端依赖。

## Product Principles

- 先完成清楚的模块边界，再逐项加入真实功能。
- 页面状态、模块注册和执行逻辑分别维护。
- 功能状态如实表达；未开放的能力不输出模拟结果。
- 代码变更通过检查后自动提交并推送。
