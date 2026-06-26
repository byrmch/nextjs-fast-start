import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "数据库连接地址未设置"),
  BETTER_AUTH_SECRET: z.string().min(32, "BETTER_AUTH_SECRET 至少 32 字符"),
  BETTER_AUTH_URL: z.string().url("BETTER_AUTH_URL 不是有效地址"),
  AI_MODEL: z.string().optional(),
  DEEPSEEK_API_KEY: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv() {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const missing = result.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    console.warn(`[env] 环境变量校验不通过:\n${missing}`);
  }
  return result.data ?? ({} as Env);
}

validateEnv();
