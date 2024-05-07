import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import Question from "@/components/Question";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import Link from "next/link";

const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      analysis: true,
    },
  });
  return entries;
};
const JournalPage = async () => {
  const entries = await getEntries();
  return (
    <div className="flex flex-col pb-4 w-full h-fit px-3">
      <h2 className="mb-3 sm:mb-4 md:mb-8 text-3xl py-2">Journals</h2>
      <div>
        <Question />
      </div>
      <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <NewEntryCard />
        {entries.map((entry: any) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default JournalPage;
