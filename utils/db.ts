import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export async function warmUpDb() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database warmed up!");
  } catch (error) {
    console.error("Failed to warm up the database", error);
  }
}
