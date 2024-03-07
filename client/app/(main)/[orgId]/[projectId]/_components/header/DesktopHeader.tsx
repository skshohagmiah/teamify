"use client";
import React from "react";
import { Menu, PaintBucket, PaintRoller, Paintbrush } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Bell,
  CircuitBoard,
  File,
  Group,
  LogOut,
  MessageCircle,
  Settings,
  User,
  Video,
} from "lucide-react";
import Link from "next/link";
import NotificationBell from "../sidebar/NotificationBell";
import { signOut } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "@/app/(marketing)/_components/header/Logo";
import Logout from "@/components/auth/Logout";

const DesktopHeader = () => {
  const { orgId, projectId } = useParams();
  const pathname = usePathname();
  return (
    <header className="bg-white shadow-md w-full  sticky z-50 top-0">
      <div className="hidden items-center justify-center lg:justify-between p-2 max-w-screen-2xl mx-auto flex-wrap md:flex">
        <div className="flex gap-2 justify-center items-center text-sm">
          <Logo />
          <hr  className="h-[2.5rem] w-[.1rem] rotate-12 bg-black"/>
          <Link
            href={`/${orgId}/${projectId}/tasks`}
            className={cn(
              "bg-blue-300 rounded-full p-2 flex items-center gap-2 hover:bg-blue-200",
              pathname.includes("tasks") === true
                ? "bg-blue-300 rounded-full"
                : "bg-transparent"
            )}
          >
            <CircuitBoard />
            <p>Tasks</p>
          </Link>
          <Link
            href={`/${orgId}/${projectId}/messages`}
            className={cn(
              "bg-blue-300 rounded-full p-2 flex items-center gap-2 hover:bg-blue-200",
              pathname.includes("messages") === true
                ? "bg-blue-300 rounded-full"
                : "bg-transparent"
            )}
          >
            <MessageCircle />
            <p>Messages</p>
          </Link>
          <Link
            href={`/${orgId}/${projectId}/conference`}
            className={cn(
              "bg-blue-300 rounded-full p-2 flex items-center gap-2 hover:bg-blue-200",
              pathname.includes("conference") === true
                ? "bg-blue-300 rounded-full"
                : "bg-transparent"
            )}
          >
            <Video />
            <p>Conference</p>
          </Link>
          <Link
            href={`/${orgId}/${projectId}/draws`}
            className={cn(
              "bg-blue-300 rounded-full p-2 flex items-center gap-2 hover:bg-blue-200",
              pathname.includes("draws") === true
                ? "bg-blue-300 rounded-full"
                : "bg-transparent"
            )}
          >
            <Paintbrush />
            <p>Draws</p>
          </Link>
          <Link
            href={`/${orgId}/${projectId}/files`}
            className={cn(
              "bg-blue-300 rounded-full p-2 flex items-center gap-2 hover:bg-blue-200",
              pathname.includes("files") === true
                ? "bg-blue-300 rounded-full"
                : "bg-transparent"
            )}
          >
            <File />
            <p>Files</p>
          </Link>
          <Link
            href={`/${orgId}/${projectId}/members`}
            className={cn(
              "bg-blue-300 rounded-full p-2 flex items-center gap-2 hover:bg-blue-200",
              pathname.includes("members") === true
                ? "bg-blue-300 rounded-full"
                : "bg-transparent"
            )}
          >
            <User />
            <p>Members</p>
          </Link>
          <div
            className={cn(
              "bg-blue-300 rounded-full p-2 flex items-center gap-2 hover:bg-blue-200",
              pathname.includes("notifications") === true
                ? "bg-blue-300 rounded-full"
                : "bg-transparent"
            )}
          >
            <NotificationBell
              orgId={orgId as string}
              projectId={projectId as string}
            />
          </div>
        </div>

        <div className="flex gap-4 items-center justify-start text-sm">
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
