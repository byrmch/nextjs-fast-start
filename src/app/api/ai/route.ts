import { askAI } from "@/core/ai";
import { success } from "@/core/response";
import { withErrorHandler, AppError, ErrorCode } from "@/core/response/errors";

export const POST = withErrorHandler(async (req: Request) => {
  const { prompt, thinking } = await req.json();
  if (!prompt || typeof prompt !== "string") {
    throw new AppError(ErrorCode.BAD_REQUEST, "提示词参数必填");
  }
  const result = await askAI(prompt, !!thinking);
  return success(result);
});
