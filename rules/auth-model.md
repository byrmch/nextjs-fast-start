# 认证与权限

## 技术选型

Better Auth v1.6 + Prisma 适配器，邮箱密码登录。

配置入口：`src/core/auth/index.ts`

## 当前能力

- 注册：`POST /api/auth/sign-up/email` → `{ email, password, name }`
- 登录：`POST /api/auth/sign-in/email` → `{ email, password }`
- 登出：`POST /api/auth/sign-out`
- 获取会话：`GET /api/auth/get-session`

## 路由保护

公开路由（无需登录）：

```ts
// src/core/middleware.ts
const PUBLIC_PREFIXES = [
  "/api/auth/",
  "/api/health",
  "/_next",
  "/favicon.ico",
  "/",
];
```

其余 `/api/*` 路由由中间件校验 Session，未登录返回 401。

## 后端获取用户

```ts
import { auth } from "@/core/auth";

const session = await auth.api.getSession({ headers: request.headers });
const user = session?.user;
```

## Better Auth 错误信息中文化

`src/app/api/auth/[...all]/route.ts` 中 `BETTER_AUTH_TRANSLATIONS` 映射了常用错误。

## 扩展方向

- [ ] OAuth 登录（GitHub、Google）
- [ ] 角色/权限模型（admin、user、guest）
- [ ] API 级别权限装饰器 `@requireRole("admin")`
- [ ] Session 有效期与刷新策略
- [ ] 登录失败次数限制
- [ ] 两步验证
