import { auth } from "@clerk/nextjs/server";
import { prisma, warmUpDb } from "./db";

export const getUserByClerkId = async () => {
  const { userId } = await auth();
  await warmUpDb();
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
  });
  return user;
};
