"use client";
import { formatDate } from "@/lib/formatedDate";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Notification, User } from "@prisma/client";
import useSocket from "@/hooks/useSocket";
import { useParams, useRouter } from "next/navigation";
import { notificationFalse } from "@/actions/notification/memberStatus";
import NotificationDeleteBtn from "./NotificationDeleteBtn";
import NotificationHeader from "./NotificationHeader";

interface NotificationBodyProps {
  prevNotifications: Notification[];
  currentUser: User;
}

const NotificationBody = ({
  prevNotifications,
  currentUser,
}: NotificationBodyProps) => {
  const [notifications, setNotifications] =
    useState<Notification[]>(prevNotifications);

  const { socket } = useSocket();
  const { projectId, orgId } = useParams();
  const router = useRouter();

  useEffect(() => {
    // Single member notification
    const handleNotificationFalse = async () => {
      await notificationFalse(projectId as string);
    };
    handleNotificationFalse();


    socket?.emit("notification-indicator", {
      receiverId: currentUser.id,
      shouldIndicate: false,
    });
    router.refresh();
  }, [projectId, socket, currentUser.id, router]);

  return (
    <>
      <NotificationHeader setNotifications={setNotifications} />
      <div className="p-2 bg-white  max-w-screen-2xl mx-auto">
        {notifications.length === 0 ? (
          <div className="text-center font-xl m-4">
            Sorry, no notifications found for you!
          </div>
        ) : (
          <div>
            {notifications.map((noti) => (
              <div
                key={noti.id}
                className="flex flex-col md:flex-row items-center justify-between gap-2 flex-wrap bg-gray-50 p-2 rounded-md my-1"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={noti.senderImage || ""}
                    alt="sender image"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <p>{noti.senderName}</p>
                </div>
                <p className="tex-lg font-bold text-center">{noti.content}</p>
                <p>{formatDate(noti.createdAt)}</p>
                <NotificationDeleteBtn
                  notifications={notifications}
                  setNotifications={setNotifications}
                  notificationId={noti.id}
                  projectId={projectId as string}
                  orgId={orgId as string}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationBody;
