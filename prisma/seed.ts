import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const hashPassword = bcrypt.hashSync("12345678", 7);
  const adminuser = await prisma.adminUser.create({
    data: {
      email: "vedanttamta2021@gmail.com",
      password: hashPassword,
    },
  });

  await prisma.adminPassword.create({
    data: {
      user_id: adminuser.user_id,
      password_hash: hashPassword,
      last_updated: Math.floor(Date.now() / 1000),
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
