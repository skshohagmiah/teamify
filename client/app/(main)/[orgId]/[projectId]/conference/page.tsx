"use client";
import React, { useEffect } from "react";

import HMSPrebuiltComponent from "../_components/conferencing/HMSPrebuilt";
import useSocket from "@/hooks/useSocket";
import { createNotification } from "@/actions/notification/createNotification";
import DesktopHeader from "../_components/header/DesktopHeader";

const VideoConferencePage = ({ params }: { params: { projectId: string } }) => {
  const { socket } = useSocket();

  useEffect(() => {
    socket?.emit("notification-indicator", {
      receiverId: params.projectId,
      shouldIndicate: true,
    });

    socket?.emit("group-notification", {
      roomId: params.projectId,
    });
    const handleNotificationCreation = async () => {
      await createNotification({
        content: "Someone has started or joined the conference",
        isGroup: true,
        projectId: params.projectId as string,
        receiverId: null,
      });
    };

    handleNotificationCreation();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <DesktopHeader />
      <HMSPrebuiltComponent />
    </div>
  );
};

export default VideoConferencePage;
