'use client'
import ProjectSidebar from "./_components/sidebar/Sidebar";
import MobileHeader from "./_components/header/MobileHeader";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { updateActive} from "@/actions/messages/updateMemberActive";
import useSocket from "@/hooks/useSocket";

const ProjectIdLayout = ({ children }: { children: React.ReactNode }) => {
  const {projectId} = useParams()
  const {socket} = useSocket();

  useEffect(() => {

    const onLoad = async() => {
      await updateActive(projectId as string)
    }
    onLoad()

    return () => {
      socket?.emit('memberUnActive', {projectId})
    }

  },[projectId, socket])

  return (
    <div className="flex flex-col md:flex-row max-w-screen-2xl mx-auto w-full  relative">
        <div className="hidden md:block ">
        <ProjectSidebar />
        </div>
        <div className="md:hidden">
          <MobileHeader />
        </div>
        {children}
    </div>
  );
};

export default ProjectIdLayout;
