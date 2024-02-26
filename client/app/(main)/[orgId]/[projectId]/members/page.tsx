import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import Image from "next/image";
import React from "react";
import CreateMember from "../_components/members/CreateMember";
import DeleteMember from "../_components/members/DeleteMember";

const MembersPage = async ({ params }: { params: { projectId: string } }) => {
  const members = await prisma.member.findMany({
    where: {
      projectId: params.projectId,
    },
    include: {
      user: true,
      project: true,
    },
  });


  return (
    <div className="w-full bg-gray-100 h-screen">
      <div className="flex items-center justify-between border-b-2 p-2 bg-white">
        <p className="text-xl font-semibold">All Members</p>
        <CreateMember />
      </div>
      <div className="p-2">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-around flex-col md:flex-row gap-2 bg-gray-200 p-1 rounded-sm mb-2"
          >
            <Image
              src={member.user.image as string}
              alt="member"
              width={50}
              height={50}
              className="rounded-full hidden md:block"
            />
            <h3 className="text-lg font-medium">{member.user.name}</h3>
            <p>{member.user.email}</p>
            <p
              className={
                member.user.id === (member.project && member.project.ownerId)
                  ? "text-red-500 font-bold"
                  : "text-black"
              }
            >
              {member.user.id === (member.project && member.project.ownerId)
                ? "Admin"
                : "Member"}
            </p>
            {
              member.user.id === (member.project && member.project.ownerId) && (
                <DeleteMember disabled={member.user.id === (member.project && member.project.ownerId)} memberId={member.id}/>
              )
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersPage;
