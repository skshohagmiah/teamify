"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TaskDatePicker } from "./TaskDatePicker";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { User, Member, Task } from "@prisma/client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { createTask } from "@/actions/tasks/createTask";
import { Loader2 } from "lucide-react";
import { createNotification } from "@/actions/notification/createNotification";
import useSocket from "@/hooks/useSocket";

interface TasksButtonProps {
  members: (Member & { user: User })[];
  updateState: (newTask: Task) => void;
}

const TaskButton = ({ members, updateState }: TasksButtonProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [memberId, setMemberId] = useState("");
  const [deadlineDate, setDeadlineDate] = useState<Date>();
  const [attahment, setAttahment] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { projectId } = useParams();
  const router = useRouter();
  const { socket } = useSocket();

  const handleTaskCreation = async () => {
    setLoading(true);

    let task = await createTask(
      title,
      description,
      memberId,
      deadlineDate!,
      attahment,
      projectId as string
    );

    const memberUserId = members.find(
      (member) => member.id === memberId
    )?.userId;

    await createNotification({
      content: "has assigned you a task",
      isGroup: false,
      projectId: projectId as string,
      receiverId: memberUserId as string,
    });
    socket?.emit("notification-indicator", {
      receiverId: memberUserId,
      shouldIndicate: true,
    });

    updateState(task!);
    setLoading(false);
    setIsOpen(false);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogTrigger>
          <Button size={"lg"} onClick={() => setIsOpen(true)}>
            Create Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
            <DialogDescription>
              Create task for the project to manage team efficiently.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="title">Task Title :</Label>
              <Input
                placeholder="task title"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2"
              />
            </div>
            <div>
              <Label htmlFor="description">Task description :</Label>
              <Input
                placeholder="task description"
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2"
              />
            </div>
            <div>
              <Label>Assign Members to Task</Label>
              <Select onValueChange={(e) => setMemberId(e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Members" />
                </SelectTrigger>
                <SelectContent>
                  {members.map((member) => (
                    <SelectItem
                      key={member.id}
                      value={member.id}
                      className="flex items-center justify-between w-full"
                    >
                      <Image
                        src={member.user.image || ""}
                        alt="member image"
                        width={30}
                        height={30}
                        className="rounded-full inline"
                      />
                      <p className="inline ml-4">{member.user.name}</p>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Specify Deadline Date</Label>
              <TaskDatePicker
                date={deadlineDate as Date}
                setDeadline={(date) => setDeadlineDate(date)}
              />
            </div>
            <div className="flex items-start justify-between">
              <Label>Add Any Attahments</Label>
              <UploadButton
                endpoint="pdfUploader"
                onClientUploadComplete={(res) => setAttahment(res[0].url)}
              />
            </div>
            <div className="flex items-center justify-end">
              <Button
                type="submit"
                disabled={loading || !title || !description}
                onClick={handleTaskCreation}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskButton;
