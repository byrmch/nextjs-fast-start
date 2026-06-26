import { auth } from "@/core/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { success, fail } from "@/core/response";
import { ErrorCode, ErrorMsg } from "@/core/response/errors";

const handlers = toNextJsHandler(auth);

const BETTER_AUTH_TRANSLATIONS: Record<string, string> = {
  "User already exists. Use another email.": "该邮箱已被注册",
  "Invalid email or password": "邮箱或密码错误",
  "Invalid email": "邮箱格式不正确",
  "Password is too short": "密码过短",
  "Email not verified": "邮箱未验证",
};

function translateMessage(msg: string): string {
  for (const [en, zh] of Object.entries(BETTER_AUTH_TRANSLATIONS)) {
    if (msg.includes(en)) return zh;
  }
  return msg;
}

function wrap(handler: (req: Request) => Promise<Response>) {
  return async (...args: unknown[]) => {
    const res = await handler(...args);
    if (!(res instanceof Response)) return res;
    const body = await res.json();
    if (res.ok) {
      return Response.json(success(body), { status: res.status });
    }
    const rawMsg = body.message || "";
    const msg = rawMsg ? translateMessage(rawMsg) : ErrorMsg[ErrorCode.UNAUTHORIZED];
    return Response.json(fail(msg, res.status), { status: res.status });
  };
}

export const POST = wrap(handlers.POST);
export const GET = wrap(handlers.GET);
