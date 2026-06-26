import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { hashPassword } from "better-auth/crypto";

const databaseUrl = process.env.DATABASE_URL ?? "file:./dev.db";

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({ url: databaseUrl }),
});

async function main() {
  const email = "test@example.com";
  const password = "12345678";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("Seed user already exists:", email);
    return;
  }

  const hashed = await hashPassword(password);

  await prisma.user.create({
    data: {
      email,
      name: "Test User",
      emailVerified: true,
      accounts: {
        create: {
          providerId: "credential",
          accountId: email,
          password: hashed,
        },
      },
    },
  });

  console.log("Seed user created:", email, "/", password);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
