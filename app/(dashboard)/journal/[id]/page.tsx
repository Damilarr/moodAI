import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
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
  console.log(entry, "entry");
  return (
    <div className="h-screen overflow-hidden w-full">
      <Editor entry={entry} />
    </div>
  );
};
export default EntryPage;
