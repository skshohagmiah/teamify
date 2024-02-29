import React from "react";
import NotificationHeader from "../_components/notifications/NotificationHeader";
import NotificationBody from "../_components/notifications/NotificationBody";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/db";

const NotificationPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const currentUser = await getCurrentUser();
  const notifications = await prisma.notification.findMany({
    where: {
      receiverId: currentUser?.id,
      projectId: params.projectId,
    }
  });



  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <NotificationBody
        prevNotifications={notifications!}
        currentUser={currentUser!}
      />
    </div>
  );
};

export default NotificationPage;
