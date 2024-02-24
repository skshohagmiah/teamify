import Logout from "@/components/auth/Logout";
import { prisma } from "@/lib/db";
import { Settings } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ProjectHeaderProps<T> {
  projectId: T;
}


const ProjectHeader = async ({ projectId }: ProjectHeaderProps<string>) => {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: { 
      members: true,
      organization: true,
    },
  });

  const members = await prisma.member.findMany({
    where: {
      projectId: project?.id,
    },
    include: {
      user: true,
    },
  });

  return (
    <header className="p-2 border-b-2 flex items-center justify-between">
      <div className="flex gap-2 items-center">
        {project?.organization.logo && (
          <Image
            src={project?.organization.logo || ""}
            alt="logo"
            width={30}
            height={30}
          />
        )}
        <p className="text-lg font-medium capitalize">
          {project?.organization.name} /{" "}
          <span className="font-light">{project?.name}</span>
        </p>
      </div>
    </header>
  );
};

export default ProjectHeader;
