import React from "react";
import Header from "./_components/header/Header";
import { prisma } from "@/lib/db";
import CreateProjectModal from "./_components/project/CreateProjectModal";
import Link from "next/link";
import DeleteProject from "./_components/project/DeleteProject";
import { getCurrentUser } from "@/lib/getCurrentUser";

const OrganizationIdPage = async ({
  params,
}: {
  params: { orgId: string };
}) => {
  const currentUser = await getCurrentUser()
  const projects = await prisma.project.findMany({
    where: {
      organizationId: params.orgId,
      members:{
        some:{
          userId:currentUser?.id
        }
      }
    },
  });

  const randomColors = [
    "bg-red-300",
    "bg-blue-300",
    "bg-lime-300",
    "bg-gray-300",
    "bg-slate-300",
    "bg-purple-300",
    "bg-green-300",
    "bg-rose-300",
    "bg-sky-300",
    "bg-fuchsia-300",
  ];

  const generateRandomNumber = () => Math.floor(Math.random() * 10);

  return (
    <div className="bg-gray-100 h-screen">
      <Header />
    <div className="max-w-screen-2xl mx-auto mt-2 md:mt-0 ">
      {projects.length === 0 ? (
        <div className="h-screen w-full flex-col flex items-center justify-center gap-2">
          <p className="text-xl text-center font-semibold text-capitalize m-2 p-2 bg-red-300 rounded-md">
            Sorry, No Project is Found. Please Create a Project To Collaborate.
          </p>
          <CreateProjectModal />
        </div>
      ) : (
        <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap md:p-4">
          {projects.map((project) => (
            <div className="relative group" key={project.id}>
            <Link
              href={`/${params.orgId}/${project.id}`}
              key={project.id}
              className={`${
                randomColors[generateRandomNumber()]
              } w-[95vw] md:w-[300px] h-[200px] rounded-md hover:opacity-60 transition shadow-md flex items-center justify-center flex-col gap-2`}
            >
              <p className="text-xl font-medium capitalize">{project.name}</p>
              <small>{project.description}</small>
            </Link>
              {currentUser?.id === project.ownerId && (
                <div className="absolute top-2 right-2 hidden group-hover:block opacity-100">
                <DeleteProject projectId={project.id}/>
              </div>
              )}
            </div>
          ))}
          <CreateProjectModal />
        </div>
      )}
    </div>
    </div>
  );
};

export default OrganizationIdPage;
