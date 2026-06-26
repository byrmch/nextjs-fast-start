export type ApiResponse<T = unknown> = {
  code: number
  data: T | null
  msg: string
}

export function success<T>(data: T, msg = "成功"): ApiResponse<T> {
  return { code: 0, data, msg }
}

export function fail(msg: string, code = 400, data: unknown = null): ApiResponse {
  return { code, data, msg }
}
