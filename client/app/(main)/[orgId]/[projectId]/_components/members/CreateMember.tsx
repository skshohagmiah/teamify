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
import { generateToken } from "@/actions/member/generateToken";
import { useParams } from "next/navigation";

const CreateMember = () => {
    const [isMounted, setIsmounted] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('')
    const {orgId, projectId} = useParams()

    useEffect(() => {
        setIsmounted(true)
    }, [])

    if(!isMounted){
        return null
    }
    const handleTokenGeneration = async() => {
      try {
        setIsCopied(false)
        setLoading(true)
        const token = await generateToken()
        setToken(`https://teamify-tau.vercel.app/${orgId}/${projectId}/members/invite?token=${token}`)

        setLoading(false)
      } catch (error) {
        
      }
    }

    const onCopy = () => {
      navigator.clipboard.writeText(token)
      setIsCopied(true)
    }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={handleTokenGeneration}>Add Member</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add member to the project</DialogTitle>
            <DialogDescription>
              Copy and share the link to the member withIn five Minutes
            </DialogDescription>
          </DialogHeader>
          <div className="p-2 rounded-md bg-gray-300 overflow-scroll">
            {loading ? 'generating token...' : token}
          </div>
          <div className="flex items-center justify-end">
            <Button onClick={onCopy}>{isCopied ? 'Copied' : 'Copy'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateMember;
