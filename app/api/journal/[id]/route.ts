import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma, warmUpDb } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request, { params }) => {
  const content = await request.json();
  const user = await getUserByClerkId();
  await warmUpDb();
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content: content.content,
    },
  });
  const analysis = await analyze(updatedEntry.content);
  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      ...analysis,
    },
    update: analysis,
  });
  return NextResponse.json({ data: { ...updatedEntry, analysis: updated } });
};
export const DELETE = async (request: Request, { params }) => {
  const user = await getUserByClerkId();
  const deletedEntry = await prisma.journalEntry.delete({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
  });
  return NextResponse.json({ data: deletedEntry });
};
