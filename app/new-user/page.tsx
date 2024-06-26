import { prisma, warmUpDb } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CreateNewUser = async () => {
  const user = await currentUser();
  await warmUpDb();
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id,
        email: user?.emailAddresses[0]?.emailAddress,
      },
    });
  }
  redirect("/journal");
};
const NewUser = async () => {
  await CreateNewUser();
  return <div>...Loading</div>;
};

export default NewUser;
