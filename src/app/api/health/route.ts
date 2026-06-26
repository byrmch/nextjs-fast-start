import { prisma } from "@/core/db";
import { success } from "@/core/response";
import { withErrorHandler } from "@/core/response/errors";

export const GET = withErrorHandler(async () => {
  await prisma.$queryRaw`SELECT 1`;
  return success({ db: "ok" });
});
