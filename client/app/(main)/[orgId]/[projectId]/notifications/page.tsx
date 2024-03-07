import React from "react";
import NotificationHeader from "../_components/notifications/NotificationHeader";
import NotificationBody from "../_components/notifications/NotificationBody";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/db";
import DesktopHeader from "../_components/header/DesktopHeader";

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
    },
    orderBy:{
      createdAt:'desc'
    }
  });



  return (
    <div className="w-full bg-white min-h-screen">
      <DesktopHeader />
      <NotificationBody
        prevNotifications={notifications!}
        currentUser={currentUser!}
      />
    </div>
  );
};

export default NotificationPage;
