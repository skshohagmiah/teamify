import { memberStatus } from "@/actions/notification/memberStatus";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Bell } from "lucide-react";
import { Member } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSocket from "@/hooks/useSocket";

const NotificationBell = ({
  orgId,
  projectId,
}: {
  orgId: string;
  projectId: string;
}) => {
  const [hasNotification, setHasNotification] = useState(false);
  const {socket} = useSocket()

  socket?.on('notificationChange', (data) => {
   setHasNotification(data)
  })

  useEffect(() => {
    const handleMemberFetch = async () => {
      const fetchMember = await memberStatus(projectId);
      setHasNotification(fetchMember?.hasNotification!);
    };
    handleMemberFetch();
  }, [projectId]);

  return (
    <Link
      href={`/${orgId}/${projectId}/notifications`}
      className="flex items-center gap-2 relative"
    >
      <Bell />
      {hasNotification && (
        <div className="absolute left-3 top-0 size-3 bg-blue-500 rounded-full" />
      )}
      <p className="hidden group-hover:block">Notifications</p>
    </Link>
  );
};

export default NotificationBell;
