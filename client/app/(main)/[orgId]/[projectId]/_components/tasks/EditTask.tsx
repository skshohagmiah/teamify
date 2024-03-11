"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/lib/uploadthing";
import { Loader2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { TaskDatePicker } from "./TaskDatePicker";
import { useParams, useRouter } from "next/navigation";
import { updateTask } from "@/actions/tasks/updateTask";
import {TaskStatus,Task} from '@prisma/client'

interface EditTaskProps {
  ownerId: string;
  memberId: string;
  userId: string;
  task:Task
}

const EditTask = ({ memberId, ownerId, userId, task }: EditTaskProps) => {
  const [description, setDescription] = useState(task.description);
  const [deadlineDate, setDeadlineDate] = useState<Date>(task.deadline as Date);
  const [status, setStatus] = useState(task.status);
  const [attahment, setAttahment] = useState('');
  const [progres, setProgress] = useState(task.progress)
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {taskId } = useParams();
  const router = useRouter();


  const handleTaskUpdate = async() => {
    setLoading(true);
    await updateTask(taskId as string,description,deadlineDate as Date,status,attahment, progres)
    setLoading(false)
    router.refresh()
    setIsOpen(false)
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogTrigger>
          <Button
            size={"sm"}
            onClick={() => setIsOpen(true)}
            disabled={memberId !== userId || ownerId !== userId}
          >
            Edit Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Edit task for the efficient update.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="description">Change description :</Label>
              <Input
                placeholder="task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2"
              />
            </div>
            <div>
              <Label htmlFor="progresss">Update progress in percentage :</Label>
              <Input
                placeholder="update progres in number"
                type="number"
                value={progres}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full p-2"
              />
            </div>
            <div>
              <Label>Change Deadline Date</Label>
              <TaskDatePicker
                date={deadlineDate as Date}
                setDeadline={(date) => setDeadlineDate(date!)}
              />
            </div>
            <div>
              <Label>Update Task Status</Label>
              <Select onValueChange={(e:any) => setStatus(e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Change Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value={TaskStatus.To_do}
                    className="flex items-center justify-between w-full"
                  >
                    {TaskStatus.To_do}
                  </SelectItem>
                  <SelectItem
                    value={TaskStatus.In_Progress}
                    className="flex items-center justify-between w-full"
                  >
                    {TaskStatus.In_Progress}
                  </SelectItem>
                  <SelectItem
                    value={TaskStatus.Review}
                    className="flex items-center justify-between w-full"
                  >
                    {TaskStatus.Review}
                  </SelectItem>
                  <SelectItem
                    value={TaskStatus.Done}
                    className="flex items-center justify-between w-full"
                  >
                    {TaskStatus.Done}
                  </SelectItem>
                </SelectContent>
              </Select>
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
                disabled={loading}
                onClick={handleTaskUpdate}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Update"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditTask;
