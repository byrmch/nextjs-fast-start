# 错误码体系

## 现有错误码

| code | 含义 | HTTP 状态 | msg |
|------|------|-----------|-----|
| 0 | 成功 | 200 | 成功 |
| 400 | 参数错误 | 400 | 请求参数有误 |
| 401 | 未登录 | 401 | 请先登录 |
| 404 | 资源不存在 | 404 | 资源不存在 |
| 500 | 服务端错误 | 500 | 服务器内部错误 |

## 使用

```ts
import { AppError, ErrorCode } from "@/core/response/errors";

throw new AppError(ErrorCode.BAD_REQUEST, "邮箱格式不正确");
```

第二个参数可覆盖默认 msg。不传则用 `ErrorMsg` 映射的默认值。

## 扩展

在 `src/core/response/errors.ts` 的 `ErrorCode` 对象中追加：

```ts
export const ErrorCode = {
  OK: 0,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  // 扩展 ↓
  FORBIDDEN: 403,
  RATE_LIMIT: 429,
} as const;
```

同步在 `ErrorMsg` 中添加中文映射。

## 扩展方向

- [ ] 业务错误码分段（1xxx 用户、2xxx 订单……）
- [ ] 错误码文档自动生成
