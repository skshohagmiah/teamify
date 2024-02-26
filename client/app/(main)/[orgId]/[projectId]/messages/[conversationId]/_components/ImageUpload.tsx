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
import { Image as ImageIcon } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";

const ImageUpload = () => {
    const [imageUrl, setImageUrl] = useState('');

  return (
    <div>
      <Dialog>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <DialogTrigger><ImageIcon /></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="p-2">Upload Image As A Message Attachment</DialogTitle>
            {
                imageUrl ? (
                   <div className="flex items-center justify-center flex-col gap-4">
                     <Image src={imageUrl} alt="message image" width={300} height={300} className="rounded-full"/>
                    <p>Image Upload Conpleted.</p>
                   </div>
                ):(
                    <UploadDropzone endpoint="imageUploader" onClientUploadComplete={(res) => setImageUrl(res[0].url)}/>
                )
            }
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUpload;
