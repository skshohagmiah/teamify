'use client'
import { deleteTask } from "@/actions/tasks/deleteTask";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {Task} from '@prisma/client'
import React, { useState } from "react";
import EditTask from "./EditTask";

interface DeleteTaskProps {
  ownerId: string;
  memberId: string;
  userId: string;
  task:Task
}

const DeleteTask = ({ memberId, ownerId, userId, task }: DeleteTaskProps) => {
  const {orgId, projectId, taskId} = useParams()
  const [loading,setLoading] = useState(false);
  const router = useRouter()
  console.log(memberId, ownerId,userId)

  const handleTaskDelete = async() => {
    setLoading(true);
    await deleteTask(taskId as string, orgId as string, projectId as string);
    setLoading(false)
    router.replace(`/${orgId}/${projectId}/tasks`)
  }

  return (
    <div className="flex gap-2 items-center">
      <EditTask task={task} memberId={memberId} userId={userId} ownerId={ownerId}/>
      <Button
       onClick={handleTaskDelete}
       disabled={!(memberId === userId || userId === ownerId)}
        className=""
        size={"sm"}
        variant={"destructive"}
      >
        {loading ? <Loader2 className="animate-spin"/> : 'Delete Task'}
      </Button>
    </div>
  );
};

export default DeleteTask;
