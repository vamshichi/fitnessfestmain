import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let prismaInstance: PrismaClient

try {
  prismaInstance =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: ["query", "info", "warn", "error"],
    })
} catch (error) {
  console.error("Prisma Client initialization error:", error)
  throw new Error("Prisma Client not initialized. Please run 'npx prisma generate' first.")
}

export const prisma = prismaInstance

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}

// Keep the default export for backward compatibility
export default prisma
