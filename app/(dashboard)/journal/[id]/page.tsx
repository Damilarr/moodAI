import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma, warmUpDb } from "@/utils/db";

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
  await warmUpDb();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  });
  return entry;
};
const EntryPage = async ({ params }: any) => {
  const entry = await getEntry(params.id);
  return (
    <div className="h-screen overflow-hidden w-full">
      <Editor entry={entry} />
    </div>
  );
};
export default EntryPage;
