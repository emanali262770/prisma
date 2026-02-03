import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function connectDb() {
  try {
    await prisma.$connect();
    console.log("✅ DB Connected");
  } catch (err) {
    console.error("❌ DB Error:", err);
    process.exit(1);
  }
}

export { prisma, connectDb };
