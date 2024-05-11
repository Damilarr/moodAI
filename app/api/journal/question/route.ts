import { qa } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma, warmUpDb } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { question } = await request.json();
  const user = await getUserByClerkId();
  await warmUpDb();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      createdAt: true,
      content: true,
      id: true,
    },
  });
  const answer = await qa(question, entries);
  return NextResponse.json({ data: answer });
};
