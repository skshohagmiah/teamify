"use client";
import { formatDate } from "@/lib/formatedDate";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Notification, User, Member } from "@prisma/client";
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
  const [notifications, setNotifications] = useState(prevNotifications);

  const { socket } = useSocket();
  const { projectId, orgId } = useParams();

  socket?.emit("notification-on-off", false);

  //single member notification
  socket?.on(`${currentUser.id}`, (data) => {
    setNotifications([...notifications, data]);
  });

  //group notification
  socket?.on(`${projectId}`, (data: any) => {
    console.log(data);
    setNotifications([...notifications, data]);
  });

  useEffect(() => {
    const handleNotificationFalse = async () => {
      await notificationFalse(projectId as string);
    };
    handleNotificationFalse();
  }, [projectId]);

  return (
    <>
      <NotificationHeader setNotifications={setNotifications} />
      <div className="p-2">
        {notifications.length === 0 ? (
          <div className="text-center font-xl m-4">
            Sorry no notification is found for you !
          </div>
        ) : (
          <div>
            {notifications.map((noti) => (
              <div
                key={noti.id}
                className="flex flex-col md:flex-row items-center justify-between gap-2 flex-wrap bg-blue-100 p-2 rounded-md mt-2"
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
                <p>has sent</p>
                <p className="tex-lg font-bold text-center">{noti.content}</p>
                <p>{formatDate(noti.createdAt)}</p>
                <NotificationDeleteBtn
                  notifications={notifications!}
                  setNotifications={setNotifications}
                  notificationId={noti.id}
                  orgId={orgId as string}
                  projectId={projectId as string}
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
