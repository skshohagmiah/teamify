'use client'
import React, { useEffect } from "react";
import DesktopHeader from "./_components/header/DesktopHeader";
import { useRouter } from "next/navigation";

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
    </div>
  );
};

export default ProjectIdPage;
