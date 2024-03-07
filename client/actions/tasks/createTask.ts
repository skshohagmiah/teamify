"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createTask(
  title: string,
  description: string,
  memberId: string,
  deadline: Date,
  attahment: string,
  projectId: string
) {
  try {
    let task;

    const prevTask = await prisma.task.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    });

    if (prevTask[0]) {
      task = await prisma.task.create({
        data: {
          title,
          description,
          assignee: {
            set: [memberId],
          },
          deadline,
          attachments: {
            set: [attahment],
          },
          projectId,
          position: prevTask[0].position + 1,
        },
      });
    } else {
      task = await prisma.task.create({
        data: {
          title,
          description,
          assignee: {
            set: [memberId],
          },
          deadline,
          attachments: {
            set: [attahment],
          },
          projectId,
          position: 1,
        },
      });
    }
    return task;
  } catch (error) {
    console.log("task creation error", error);
  }
}
