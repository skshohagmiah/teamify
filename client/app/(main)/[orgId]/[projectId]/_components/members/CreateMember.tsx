'use client'
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
import { Input } from "@/components/ui/input";

const CreateMember = () => {
    const [isMounted, setIsmounted] = useState(false)

    useEffect(() => {
        setIsmounted(true)
    }, [])

    if(!isMounted){
        return null
    }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Member</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add member to the project</DialogTitle>
            <DialogDescription>
              Copy and share the link to the member
            </DialogDescription>
          </DialogHeader>
          <form action="">
            <Input placeholder="search member" className="w-full"/>
          </form>
          <div className="flex items-center justify-end">
            <Button>Copy</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateMember;
