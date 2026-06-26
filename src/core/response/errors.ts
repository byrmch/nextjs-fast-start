import { fail, type ApiResponse } from "@/core/response";

export const ErrorCode = {
  OK: 0,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const;

export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];

export const ErrorMsg: Record<ErrorCodeType, string> = {
  [ErrorCode.OK]: "成功",
  [ErrorCode.UNAUTHORIZED]: "请先登录",
  [ErrorCode.BAD_REQUEST]: "请求参数有误",
  [ErrorCode.NOT_FOUND]: "资源不存在",
  [ErrorCode.INTERNAL_ERROR]: "服务器内部错误",
};

export class AppError extends Error {
  public readonly code: ErrorCodeType;

  constructor(code: ErrorCodeType, message?: string) {
    super(message ?? ErrorMsg[code]);
    this.name = "AppError";
    this.code = code;
  }
}

export function withErrorHandler<Args extends unknown[]>(
  handler: (...args: Args) => Promise<ApiResponse>,
): (...args: Args) => Promise<Response> {
  return async (...args) => {
    try {
      const result = await handler(...args);
      return Response.json(result, { status: result.code === 0 ? 200 : result.code });
    } catch (e) {
      if (e instanceof AppError) {
        const status = e.code === 0 ? 200 : e.code;
        return Response.json(fail(e.message, e.code), { status });
      }
      console.error(e);
      return Response.json(
        fail(ErrorMsg[ErrorCode.INTERNAL_ERROR], ErrorCode.INTERNAL_ERROR),
        { status: 500 },
      );
    }
  };
}
