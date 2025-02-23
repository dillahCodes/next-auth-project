import { PrismaClient } from "@prisma/client";

// DOC: https://www.prisma.io/docs/guides/nextjs
const prisma = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: typeof prisma };
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
