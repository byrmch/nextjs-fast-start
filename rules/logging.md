# 日志规范

## 当前约定

开发环境（`NODE_ENV !== "production"`）打印请求日志：

```
[req] POST /api/ai — 320ms
```

AI 调用日志：

```
[AI] model=deepseek-v4-flash finish=stop input=1.2K(hit=0 miss=1.2K) output=0.5K total=1.7K time=2500ms cost=¥0.0032
```

环境变量校验警告：

```
[env] 环境变量校验不通过:
  - DATABASE_URL: 数据库连接地址未设置
```

## 前缀约定

| 前缀 | 含义 |
|------|------|
| `[req]` | HTTP 请求 |
| `[AI]` | AI 调用 |
| `[env]` | 环境变量校验 |

## 扩展方向

- [ ] 统一日志函数 `logger.info()` / `logger.warn()` / `logger.error()`
- [ ] 日志级别控制（`LOG_LEVEL` 环境变量）
- [ ] 生产环境结构化日志（JSON）
- [ ] 请求 ID 贯穿全链路（`X-Request-Id`）
- [ ] 敏感信息脱敏（密码、token、身份证）
