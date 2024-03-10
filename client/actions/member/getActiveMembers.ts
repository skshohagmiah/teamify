"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function getActiveMember(projectId: string) {
  try {
    const members = await prisma.member.findMany({
      where: {
        projectId: projectId,
        isActive: true,
      },
      include: {
        user: true,
      },
    });

    return members;
  } catch (error) {
    console.log("getting active members error", error);
  }
}

export async function getCurrentActiveUser() {
  const currentUser = await getCurrentUser();
  return currentUser;
}
