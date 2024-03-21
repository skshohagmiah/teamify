'use client'
import React, { useEffect } from "react";
import DesktopHeader from "./_components/header/DesktopHeader";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const ProjectIdPage = ({
  params,
}: {
  params: {
    projectId: string,
    orgId:string,
  };
}) => {
const router = useRouter()
const {orgId,projectId} = params

  useEffect(() => {
    router.replace(`/${orgId}/${projectId}/tasks`)
  },[orgId,projectId,router])

  return (
    <div className="w-full h-screen bg-white">
      <DesktopHeader />
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="animate-spin w-12 h-12"/>
      </div>
    </div>
  );
};

export default ProjectIdPage;
