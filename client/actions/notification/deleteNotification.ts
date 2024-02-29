"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { revalidatePath } from "next/cache";

export async function deleteSingleNotification(
  id: string,
  projectId: string,
  orgId: string
) {
  const currentUser = await getCurrentUser();
  try {
    const dnoet = await prisma.notification.delete({
      where: {
        id,
        receiverId: currentUser?.id,
        projectId: projectId,
      },
    });
    console.log(dnoet);
  } catch (error) {
    console.log("notification deletetion error", error);
  } finally {
    revalidatePath(`/${orgId}/${projectId}/notifications`);
  }
}

export async function deleteAllNotifications(projectId: string, orgId: string) {
  const currentUser = await getCurrentUser();
  try {
    await prisma.notification.deleteMany({
      where: {
        receiverId: currentUser?.id,
        projectId: projectId,
      },
    });
  } catch (error) {
    console.log("notification deletetion error", error);
  } finally {
    revalidatePath(`/${orgId}/${projectId}/notifications`);
  }
}
