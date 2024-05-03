import { prisma } from "@/utils/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CreateNewUser = async () => {
  const user = await currentUser();
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