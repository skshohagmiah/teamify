'use client'
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProject } from "@/actions/project/deleteProject";
import { toast } from "sonner";
import { useParams } from "next/navigation";

const DeleteProject = ({projectId}:{projectId:string}) => {
    const [loading, setLoading] = useState(false)
    const { orgId} = useParams();


    const handleDelete = async() => {
        setLoading(true)
        const {ok} = await deleteProject(projectId as string, orgId as string);
        if(ok){
            toast('project deleted successfully');
            setLoading(false)
        }
    }
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Trash />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure to delete this project ?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              project and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-end gap-4">
            <Button onClick={handleDelete} variant={'destructive'} size={'lg'}>
                {loading ? <Loader2 className="animate-spin"/> : 'Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteProject;
