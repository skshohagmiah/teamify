"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import NotificationBell from "../sidebar/NotificationBell";
import { FaDrawPolygon } from "react-icons/fa";

const MenuComponent = () => {
  const { orgId, projectId } = useParams();
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <aside className="flex  transition-all duration-200 flex-col gap-3 p-4 bg-white/80 items-start justify-between ">
            <div className="flex flex-col gap-4 justify-start">
              <Link
                href={`/${orgId}/${projectId}/tasks`}
                className=" flex items-center gap-2"
              >
                <CircuitBoard />
                <p>Tasks</p>
              </Link>
              <Link
                href={`/${orgId}/${projectId}/messages`}
                className="flex items-center gap-2"
              >
                <MessageCircle />
                <p>Messaging</p>
              </Link>
              <Link
                href={`/${orgId}/${projectId}/conference`}
                className="flex items-center gap-2"
              >
                <Video />
                <p>Conferencing</p>
              </Link>
              <Link
                href={`/${orgId}/${projectId}/draws`}
                className="flex items-center gap-2"
              >
                <Paintbrush />
                <p>Draws</p>
              </Link>
              <Link
                href={`/${orgId}/${projectId}/files`}
                className=" flex items-center gap-2"
              >
                <File />
                <p>Files</p>
              </Link>
              <Link
                href={`/${orgId}/${projectId}/members`}
                className="flex items-center gap-2"
              >
                <User />
                <p>Members</p>
              </Link>
              <div className="flex items-center gap-2">
                <NotificationBell
                  orgId={orgId as string}
                  projectId={projectId as string}
                />
              </div>
            </div>

            <Separator />
            <div className="flex flex-col gap-4 items-center justify-start">
              <div
                className="flex items-center gap-2"
                onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              >
                <LogOut />
                <p>Logout</p>
              </div>
            </div>
          </aside>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MenuComponent;
