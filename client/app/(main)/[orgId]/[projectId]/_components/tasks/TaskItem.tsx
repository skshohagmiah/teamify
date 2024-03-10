"use client";
import React, { ReactNode, useState } from "react";
import { Task, Comment, Member, User } from "@prisma/client";
import { Progress } from "@/components/ui/progress";

import Image from "next/image";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useParams } from "next/navigation";
import Link from "next/link";

interface TaskItemProps {
  index: number;
  task: Task & {
    comments: Comment;
  };
  members: (Member & {
    user: User;
  })[];
  key: number;
}

const TaskItem = ({ task, members, index, key }: TaskItemProps) => {
  const { orgId, projectId } = useParams();
  const showMember = (id: string) => {
    const member = members.find((mem) => mem.id === id);

    return (
      <div key={key} className="flex items-center  flex-wrap gap-4">
        <Image
          src={member?.user.image || ""}
          alt="member iamge"
          width={30}
          height={30}
          className="rounded-full"
        />
        <p>{member?.user.name}</p>
      </div>
    );
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Link
          href={`/${orgId}/${projectId}/tasks/${task.id}`}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="p-4 w-full max-w-[420px] flex flex-col gap-2 items-center justify-center rounded-md bg-gray-50 shadow-md  relative"
        >
          <small className="absolute top-2 right-2">
            <span className="text-sky-500">Status :</span> {task.status}
          </small>
          <p className="text-lg font-medium text-center capitalize">
            {task.title}
          </p>
          <p className="text-sm text-center">{task.description.slice(0,50)}</p>
          <p className="text-rose-500">
            Deadline: {task.deadline?.toDateString()}
          </p>
          <p>Assigned To</p>
          <p>{task.assignee.map((ass) => showMember(ass))}</p>
          <div className="w-full p-4 text-center">
            <Progress
              value={task.progress}
              className="m-2 bg-slate-300 text-green-500 w-full"
            />
            <p className="text-lg font-bold">{task.progress}%</p>
          </div>
        </Link>
      )}
    </Draggable>
  );
};

export default TaskItem;
