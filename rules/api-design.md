# API 设计规范

## 响应格式

所有 API 统一返回：

```json
{
  "code": 0,
  "data": {},
  "msg": "成功"
}
```

- `code = 0` → 成功
- `code != 0` → 失败（参数/鉴权/服务端错误）
- `msg` → 中文提示，可直接展示给用户
- `data` → 业务数据，失败时为 `null`

## 写法

```ts
// app/api/xxx/route.ts
import { success } from "@/core/response";
import { withErrorHandler, AppError, ErrorCode } from "@/core/response/errors";

export const POST = withErrorHandler(async (req: Request) => {
  const body = await req.json();
  if (!body.name) {
    throw new AppError(ErrorCode.BAD_REQUEST, "name 必填");
  }
  // 业务逻辑...
  return success({ id: 1 });
});
```

不用手动 `try/catch`。`withErrorHandler` 自动捕获 `AppError` 并转成统一格式。

## 路由文件

- `app/api/xxx/route.ts` — 导出 `GET` / `POST` / `PUT` / `DELETE`
- 动态路由：`app/api/users/[id]/route.ts`
- 健康检查：`app/api/health/route.ts`

## 扩展方向

- [ ] API 版本管理 (`/api/v1/`, `/api/v2/`)
- [ ] 请求/响应日志脱敏
- [ ] 分页参数统一规范 (`page`, `pageSize`)
