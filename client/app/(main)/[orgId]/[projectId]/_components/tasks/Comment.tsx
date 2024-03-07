'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";
import {Comment as CommentType,User} from '@prisma/client'
import { createComment } from "@/actions/comment/createComment";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";


interface CommentProps {
    comments:(CommentType & {
        user:User
    })[]
}


const Comment = ({comments}:CommentProps) => {
    const [content , setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const {orgId,projectId,taskId} = useParams()

    const handleCommentCreation = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        await createComment(orgId as string,projectId as string,taskId as string,content)
        setContent('')
        setLoading(false)
    }




    return (
    <div className="col-span-2">
      <p className="text-lg font-medium">Tasks Comments</p>
      <form className="flex items-center gap-2" onSubmit={handleCommentCreation}>
        <Input
          className="p-2 w-full md:w-[50%]"
          name="content"
          required
          value={content}
          placeholder="write a comment"
          onChange={(e) => setContent(e.target.value)}
        />
        <Button disabled={loading} type="submit">{loading ? <Loader2 className="animate-spin"/> : "Send"}</Button>
      </form>
      {comments.length === 0 ? (
        <p className="py-4 text-rose-500">No Comment Found For This Task !</p>
      ) : (
        comments.map((com) => (
          <div
            key={com.id}
            className="flex items-center justify-center md:justify-start flex-wrap gap-4 p-2 rounded-md bg-gray-50 mt-2"
          >
            <Image
              src={com.user.image || ""}
              alt="coment user pic"
              width={30}
              height={30}
              className="rounded-full"
            />
            <p>{com.user.name}</p>
            <div className="flex items-end md:items-start gap-2">
              <p className="">{com.content}</p>
              <small className="-mt-2">{com.createdAt.toDateString()}</small>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Comment;
