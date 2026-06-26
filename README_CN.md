<div align="center">

# nextjs-fast-start

**轻量级 Next.js 16 启动模板——认证、数据库、AI、shadcn/ui，开箱即用**

<p>
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js 16">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma" alt="Prisma 7">
  <img src="https://img.shields.io/badge/SQLite-003B57?logo=sqlite" alt="SQLite">
  <img src="https://img.shields.io/badge/AI_SDK-7-000?logo=vercel" alt="AI SDK v7">
  <img src="https://img.shields.io/badge/shadcn/ui-2d3748?logo=shadcnui" alt="shadcn/ui">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
</p>

[English](README.md)

</div>

## 快速开始

1. **从模板创建项目**
   ```bash
   pnpm create next-app@latest my-project --example https://github.com/byrmch/nextjs-fast-start
   cd my-project
   ```

2. **配置环境变量**
   ```bash
   cp .env.example .env
   node -e "const{randomBytes}=require('crypto'),{readFileSync,writeFileSync}=require('fs'),e=readFileSync('.env','utf8');writeFileSync('.env',e.replace('your-secret-at-least-32-chars',randomBytes(32).toString('base64')))"
   ```
   复制 `.env.example` → `.env`，然后自动生成安全的 `BETTER_AUTH_SECRET` 写入。

3. **生成 Prisma 客户端**
   ```bash
   npx prisma generate
   ```
   根据 `prisma/schema.prisma` 生成类型安全的数据库客户端。

4. **初始化数据库**
   ```bash
   npx prisma db push
   ```
   将 Prisma schema 推送到 SQLite——创建所有表。

5. **创建测试用户**
   ```bash
   npx prisma db seed
   ```
   创建测试账号 `test@example.com` / `12345678`。

6. **启动开发服务器**
   ```bash
   pnpm dev
   ```

打开 [http://localhost:3000](http://localhost:3000)，首页自动检测各模块状态。

## 特性

| | |
|---|---|
| **认证** | Better Auth v1.6，邮箱密码注册 / 登录 |
| **数据库** | Prisma v7 + SQLite，零配置 |
| **AI** | Vercel AI SDK v7 + DeepSeek |
| **UI** | Tailwind CSS v4 + shadcn/ui，深色模式跟随系统 |
| **统一响应** | `{ code, data, msg }` + `success()` / `fail()` |
| **异常处理** | `AppError` + `withErrorHandler`，零 try/catch |
| **请求代理** | 鉴权守卫 + 日志 + 响应时间 |
| **环境校验** | Zod schema，启动时校验 |
| **安全头** | CSP / X-Frame-Options / Referrer-Policy |

## 技术栈

| 类别 | 技术 |
|---|---|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript 5 |
| 样式 | Tailwind CSS 4 |
| 组件 | shadcn/ui |
| ORM | Prisma 7 + SQLite |
| 认证 | Better Auth 1.6 |
| AI | Vercel AI SDK 7 + DeepSeek |

## 环境变量

```bash
cp .env.example .env
```

| 变量 | 说明 | 默认值 |
|---|---|---|
| `DATABASE_URL` | SQLite 文件路径 | `file:./dev.db` |
| `BETTER_AUTH_SECRET` | 认证密钥（≥32 字符） | - |
| `BETTER_AUTH_URL` | 应用地址 | `http://localhost:3000` |
| `AI_MODEL` | AI 模型名 | `deepseek-v4-flash` |
| `DEEPSEEK_API_KEY` | DeepSeek API Key | - |

## 命令

| 命令 | 说明 |
|---|---|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 生产构建 |
| `pnpm lint` | ESLint 检查 |
| `npx prisma db push` | 数据库初始化 |
| `npx prisma db seed` | 创建测试用户 |

## 项目结构

```
src/
├── core/               # 可拆卸功能模块
│   ├── ai/             #   AI 接口封装
│   ├── auth/           #   Better Auth 配置
│   ├── db/             #   Prisma 客户端
│   └── response/       #   统一响应 + 错误码
├── config/env.ts       # 环境变量校验
├── proxy.ts            # 鉴权 + 请求日志
├── lib/utils.ts        # cn() 工具函数
├── components/
│   ├── ui/             # shadcn/ui 组件
│   └── layout/         # 导航栏
├── app/
│   ├── page.tsx        # 自检首页
│   ├── layout.tsx      # 根布局
│   ├── error.tsx       # 错误边界
│   └── api/            # API 路由
prisma/
├── schema.prisma       # 数据模型
├── migrations/
└── seed.ts
```

## License

MIT © [byrmch](https://github.com/byrmch)
