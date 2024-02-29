import { deleteSingleNotification } from "@/actions/notification/deleteNotification";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Notification } from "@prisma/client";
import React, { useState } from "react";

const NotificationDeleteBtn = ({
  notificationId,
  orgId,
  projectId,
  notifications,
  setNotifications,
}: {
  notificationId: string;
  orgId: string;
  projectId: string;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const deleteNotification = async () => {
    setIsDeleting(true);
    try {
      await deleteSingleNotification(notificationId as string,projectId as string,orgId); 
      setNotifications(
        notifications.filter((noti: Notification) => noti.id !== notificationId)
      ); 
    } catch (error) {
      console.error("notification deletion error:", error);
    } finally {
      setIsDeleting(false); 
    }
  };

  return (
    <Button onClick={deleteNotification} variant={"destructive"} size={"sm"}>
      {isDeleting ? <Loader2 className="animate-spin" /> : <Trash />}
    </Button>
  );
};

export default NotificationDeleteBtn;
