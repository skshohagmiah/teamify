"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TaskButton from "./TaskButton";
import { User, Member, Task, TaskStatus } from "@prisma/client";
import ActiveMember from "@/components/user/ActiveMember";

interface TasksHeaderProps {
  members: (Member & { user: User })[];
  tasks: (Task & {
    comments: Comment[];
  })[];
  updateState: (newTask: Task) => void;
  setTasks: (prevTasks: Task[]) => void;
}

const TasksHeader = ({
  members,
  updateState,
  tasks,
  setTasks,
}: TasksHeaderProps) => {
  const [newTasks, setNewTasks] = useState(tasks);

  const handleFilterByStatus = (e: TaskStatus) => {
    const filterdState = newTasks.filter((task) => task.status === e);
    setTasks(filterdState);
  };

  return (
    <div className="flex items-center justify-between p-2 max-w-screen-2xl mx-auto border-b-2">
      <div className=" items-center gap-2 hidden md:flex">
        <h3 className="text-lg font-semibold hidden md:block">All Tasks</h3>
        <hr className="h-[2rem] w-[.1rem] rotate-12 bg-black"/>
        <ActiveMember />
      </div>
      <div className="flex items-center gap-4">
        <p className="hidden md:block">Filter By </p>
        <Select onValueChange={handleFilterByStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TaskStatus.To_do}>{TaskStatus.To_do}</SelectItem>
            <SelectItem value={TaskStatus.In_Progress}>
              {TaskStatus.In_Progress}
            </SelectItem>
            <SelectItem value={TaskStatus.Review}>
              {TaskStatus.Review}
            </SelectItem>
            <SelectItem value={TaskStatus.Done}>{TaskStatus.Done}</SelectItem>
          </SelectContent>
        </Select>
        <TaskButton members={members} updateState={updateState} />
      </div>
    </div>
  );
};

export default TasksHeader;
