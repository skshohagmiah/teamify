import { memberStatus } from "@/actions/notification/memberStatus";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Bell } from "lucide-react";
import { Member } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSocket from "@/hooks/useSocket";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

const NotificationBell = ({
  orgId,
  projectId,
}: {
  orgId: string;
  projectId: string;
}) => {
  const [hasNotification, setHasNotification] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>()
  const {socket} = useSocket()
  const router = useRouter()

  
  useEffect(() => {
    const handleMemberFetch = async () => {
      const data = await memberStatus(projectId);
      setHasNotification(data.member?.hasNotification!);
      setCurrentUser(data.currentUser!)
    };
    handleMemberFetch();

    console.log('currentuser id', currentUser?.id)
    socket?.on(`notification-receive-for-${currentUser?.id}`, (data) => {
      setHasNotification(data.shouldIndicate)
      console.log('notification bell', data)
    })
  
    socket?.on(`notification-receive-for-${projectId}`, (data) => {
      setHasNotification(data.shouldIndicate)
      console.log('notification bell', data)
    })

    // socket?.on('single-notification', (data) => {
    //   router.refresh()
    // })
  
    // socket?.on(`group-notification`, (data) => {
    //   router.refresh()
    //  })

    
  }, [projectId,currentUser?.id,socket, router]);

  return (
    <Link
      href={`/${orgId}/${projectId}/notifications`}
      className="flex items-center gap-2 relative"
    >
      <Bell />
      {hasNotification && (
        <div className="absolute left-3 top-0 size-3 bg-blue-500 rounded-full" />
      )}
      <p>Notifications</p>
    </Link>
  );
};

export default NotificationBell;
