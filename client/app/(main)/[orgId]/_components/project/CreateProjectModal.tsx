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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import UserSelection from "./UserSelection";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { createProject } from "@/actions/project/createProject";
import { Loader2 } from "lucide-react";

const CreateProjectModal = () => {
  const router = useRouter();
  const { orgId } = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await createProject(name, description,orgId as string);
      if (res.ok) {
        toast("project created succesfully");
        router.push(`/${orgId}/${res.id}`);
        setLoading(false);
      }
    } catch (error) {
      console.log("project creating erorr", error);
    }
  };


  useEffect(() => {
  setIsMounted(true)
  },[])

  if(!isMounted){
    return null
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="w-[300px] h-[200px] rounded-mdshadow-md flex items-center justify-center m-2 border-[3px] border-dotted border-blue-400 text-xl font-medium">          
              Create New Project
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Create a new project to collaborate together.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Project Name:</Label>
              <Input onChange={(e) => setName(e.target.value)} required id="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Project description:</Label>
              <Input onChange={(e) => setDescription(e.target.value)} required id="description" />
            </div>

            <div className="flex justify-end my-2">
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="animate-spin"/> : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProjectModal;
