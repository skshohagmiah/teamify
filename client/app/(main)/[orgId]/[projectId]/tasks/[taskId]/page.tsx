import React from "react";
import DesktopHeader from "../../_components/header/DesktopHeader";
import DeleteTask from "../../_components/tasks/DeleteTask";
import { prisma } from "@/lib/db";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Comment from "../../_components/tasks/Comment";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Progress } from "@/components/ui/progress";

const TaskIdPage = async ({
  params,
}: {
  params: { taskId: string; projectId: string; orgId: string };
}) => {
  const currentUser = await getCurrentUser();
  const { taskId, orgId } = params;

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
    },
    include: {
      comments: {
        include: {
          user: true,
        },
      },
    },
  });

  const member = await prisma.member.findFirst({
    where: {
      id: task?.assignee[0],
    },
    include: {
      user: true,
    },
  });

  const orgOwner = await prisma.organization.findUnique({
    where: {
      id: orgId,
    },
    select: {
      ownerId: true,
    },
  });

  return (
    <div className="w-full">
      <DesktopHeader />
      <div className="flex items-center justify-between p-2 border-b-2 max-w-screen-2xl mx-auto">
        <h3 className="text-lg font-medium">Task Details</h3>
        <DeleteTask
          ownerId={orgOwner?.ownerId!}
          memberId={member?.userId!}
          userId={currentUser?.id!}
          task={task!}
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center bg-gray-50 max-w-screen-2xl mx-auto p-2">
        <div className="w-full h-auto space-y-4 lg:space-y-0 lg:grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white p-6 rounded-sm lg:w-[60%] shadow-md">
          <div>
            <Label>Task Title</Label>
            <p>{task?.title}</p>
          </div>
          <div>
            <Label>Task Description</Label>
            <p>{task?.description}</p>
          </div>
          <div className="text-rose-500">
            <Label>Task Deadlined</Label>
            <p>{task?.deadline?.toDateString()}</p>
          </div>
          <div className="text-sky-500">
            <Label>Task Status</Label>
            <p>{task?.status}</p>
          </div>
          <div>
            <Label>Task Assigned On </Label>
            <div className="flex items-center gap-2">
              <Image
                src={member?.user.image || ""}
                alt="image"
                width={30}
                height={30}
                className="rounded-full"
              />
              <p>{member?.user.name}</p>
            </div>
          </div>
          <div>
            <Label>Task Attahments</Label>
            {task?.assignee?.length || [].length === 0 ? (
              <p>No Attahment Found !</p>
            ) : (
              <Link
                href={task?.attachments[0] as string}
                className="block underline"
              >
                {task?.attachments[0]}
              </Link>
            )}
          </div>
          <div className="w-full p-4 text-center flex items-center gap-2 col-span-2">
            <p className="whitespace-nowrap">Total Progress :</p>
            <div className="w-full">
              <Progress
                value={task?.progress}
                className="m-2 bg-slate-300 text-green-500 w-full"
              />
              <p className="text-lg font-bold">{task?.progress}%</p>
            </div>
          </div>

          <Separator className="col-span-2" />
          <Comment comments={task?.comments!} />
        </div>
      </div>
    </div>
  );
};

export default TaskIdPage;
