"use client";
import Logout from "@/components/auth/Logout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Bell,
  CircuitBoard,
  File,
  Group,
  LogOut,
  MessageCircle,
  Paintbrush,
  Settings,
  User,
  Video,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import NotificationBell from "./NotificationBell";


const ProjectSidebar = () => {
  const { orgId, projectId } = useParams();




  return (
    <aside className="flex group hover:w-[15rem] rounded-e-md transition-all duration-200 gap-3 p-4 bg-blue-50 h-screen items-start justify-between border-r-2 sticky top-1 ">

      <div className="flex flex-col gap-4 justify-start">
        <Link href={'/'} className="flex items-center gap-2">
          <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
          <p className="group-hover:block font-bold hidden">Teamify</p>
        </Link>
        <Separator />
        <Link
          href={`/${orgId}/${projectId}/tasks`}
          className=" flex items-center gap-2"
        >
          <CircuitBoard />
          <p className="hidden group-hover:block">Tasks</p>
        </Link>
        <Link
          href={`/${orgId}/${projectId}/messages`}
          className="text-muted-foreground flex items-center gap-2"
        >
          <MessageCircle />
          <p className="hidden group-hover:block">Chats</p>
        </Link>
        <Link
          href={`/${orgId}/${projectId}/conference`}
          className="flex items-center gap-2"
        >
          <Video />
          <p className="hidden group-hover:block">Conference</p>
        </Link>
        <Link
          href={`/${orgId}/${projectId}/draws`}
          className="flex items-center gap-2"
        >
          <Paintbrush />
          <p className="hidden group-hover:block">Draws</p>
        </Link>
        <Link
          href={`/${orgId}/${projectId}/files`}
          className=" flex items-center gap-2"
        >
          <File />
          <p className="hidden group-hover:block">Files</p>
        </Link>
        <Link
          href={`/${orgId}/${projectId}/members`}
          className="flex items-center gap-2"
        >
          <User />
          <p className="hidden group-hover:block">Members</p>
        </Link>
        <NotificationBell orgId={orgId as string} projectId={projectId as string}/>
      </div>

      <div className="flex flex-col gap-4 items-center justify-start">
        <Separator />
        <div className="flex items-center gap-2">
          <Settings />
          <p className="hidden group-hover:block">Settings</p>
        </div>
        <div className="flex items-center gap-2" onClick={() => signOut({redirect:true,callbackUrl:'/'})}>
          <LogOut />
          <p className="hidden group-hover:block">Logout</p>
        </div>
      </div>
    </aside>
  );
};

export default ProjectSidebar;
