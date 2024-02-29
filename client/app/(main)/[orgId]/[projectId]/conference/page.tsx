"use client";
import React, { useEffect } from "react";

import HMSPrebuiltComponent from "../_components/conferencing/HMSPrebuilt";
import useSocket from "@/hooks/useSocket";
import { createNotification } from "@/actions/notification/createNotification";

const VideoConferencePage = ({ params }: { params: { projectId: string } }) => {
  const { socket } = useSocket();

  socket?.emit("notification-on-off", true);

  useEffect(() => {
    socket?.emit("group-notification", {
      roomId: params.projectId,
      data: {
        senderName: "Group",
        senderImage:
          "https://utfs.io/f/d6420ed2-af9f-4c74-830b-ae53315d4ca9-5ls31v.webp",
        content: "Someone has started or joined the conference",
      },
    });

    const handleNotificationCreation = async () => {
      await createNotification({
        content:"Someone has started or joined the conference",
        isGroup:true,
        projectId:params.projectId as string,
        receiverId:null
      });
    };

    handleNotificationCreation();
  }, [params.projectId]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <HMSPrebuiltComponent />
    </div>
  );
};

export default VideoConferencePage;
