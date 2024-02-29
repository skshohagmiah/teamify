"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function createNotification({
  content,
  projectId,
  receiverId,
  isGroup,
}: {
  content: string;
  projectId: string;
  receiverId: string | null;
  isGroup: boolean;
}) {
  try {
    const currentUser = await getCurrentUser();

    // Group Notifications
    if (isGroup) {
      const members = await prisma.member.findMany({
        where: {
          projectId,
        },
      });

      for (const member of members) {
        await prisma.member.update({
          where: {
            id: member.id,
          },
          data: {
            hasNotification: true,
          },
        });

        await prisma.notification.create({
          data: {
            content,
            senderImage:
              "https://utfs.io/f/d6420ed2-af9f-4c74-830b-ae53315d4ca9-5ls31v.webp",
            senderName: "Group",
            projectId,
            receiverId: member.userId,
          },
        });
      }
    } else {
      // Individual Notifications
      const member = await prisma.member.findFirst({
        where: {
          userId: receiverId as string,
          projectId,
        },
      });

      if (member) {
        await prisma.member.update({
          where: {
            id: member.id,
          },
          data: {
            hasNotification: true,
          },
        });

        await prisma.notification.create({
          data: {
            content,
            senderImage: currentUser?.image || "",
            senderName: currentUser?.name || "",
            receiverId,
            projectId,
          },
        });
      }
    }
  } catch (error) {
    console.error("notification creation error:", error); // Use console.error for error messages
  }
}
