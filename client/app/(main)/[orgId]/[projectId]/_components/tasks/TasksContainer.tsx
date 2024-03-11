//@ts-nocheck
"use client";

import React, { Suspense, useEffect, useState } from "react";
import TasksHeader from "./TasksHeader";
import TaskButton from "./TaskButton";
import TaskItem from "./TaskItem";
import { Member, Comment, User, Task } from "@prisma/client";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { reorderTask } from "@/actions/tasks/reorderTask";
import { useParams } from "next/navigation";
import TaskContainerLoading from "./TaskContainerLoading";

interface TaskContainerProps {
  members: (Member & {
    user: User;
  })[];
  tasks: (Task & {
    comments: Comment[];
  })[];
}

const TasksContainer = ({
  members: prevMembers,
  tasks: PrevTasks,
}: TaskContainerProps) => {
  const [tasks, setTasks] = useState(PrevTasks);
  const [members, setMembers] = useState(prevMembers);
  const {projectId} = useParams()
  const [isMounted, setIsMounted] = useState(false);

  const onDragEnd = async(result: any) => {
    const { index: sourceIndex } = result.source;
    const { index: destinationIndex } = result.destination;
    console.log(sourceIndex, destinationIndex);
    console.log(result);

    if (sourceIndex === destinationIndex) {
      return;
    } else {
        if (!result.destination) return;

        const newTasks = Array.from(tasks);
        const [removed] = newTasks.splice(sourceIndex, 1);
        newTasks.splice(destinationIndex, 0, removed);
        newTasks.forEach((item, index) => {
            item.position = index + 1
        })
        setTasks(newTasks);

        await reorderTask({projectId,tasks})

    }
  };


  useEffect(() => {
    setIsMounted(true)
  },[])

  if(!isMounted){
    return null
  }

  // Function to update tasks state with both existing tasks and new task
  const handleStateUpdate = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
   <Suspense fallback={<TaskContainerLoading />}>
     <div>
      <TasksHeader tasks={tasks} setTasks={setTasks} updateState={handleStateUpdate} members={members!} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.length === 0 ? (
                <div className="flex flex-col gap-2 items-center justify-center w-full h-screen">
                  <p className="text-rose-500 font-medium text-xl text-center">
                    No Task Found For This Project, Please Create A Project To
                    Continue
                  </p>
                  <TaskButton  updateState={handleStateUpdate} members={members} />
                </div>
              ) : (
                <div className="p-2 max-w-screen-2xl mx-auto flex items-center gap-4 flex-wrap">
                  {tasks.map((task, index) => (
                    <TaskItem
                      key={task.id}
                      task={task!}
                      members={members!}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
   </Suspense>
  );
};

export default TasksContainer;
