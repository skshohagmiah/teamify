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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/lib/uploadthing";
import { Image as ImageIcon, Text, Video } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { createFile } from "@/actions/file/createFIle";
import { toast } from "sonner";
import { createNotification } from "@/actions/notification/createNotification";
import useSocket from "@/hooks/useSocket";

const FileUploadDialog = () => {
  const [selectedType, setSelectedType] = useState("image");
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { projectId } = useParams();
  const { socket } = useSocket();
  const router = useRouter();

  const handleFileUpload = async (url: string, name: string, type: string) => {
    setIsOpen(false);

    await createFile(name, url, type, projectId as string);
    await createNotification({
      content: "Someone has uploaded an file to the project",
      receiverId: null,
      projectId: projectId as string,
      isGroup: true,
    });
    socket?.emit("notification-indicator", {
      receiverId: projectId,
      shouldIndicate: true,
    });

    router.refresh();
    toast("file added successfully");
  };

  let SelectedDropZone: any;
  if (selectedType === "image") {
    SelectedDropZone = (
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) =>
          handleFileUpload(res[0].url, res[0].name, "image")
        }
      />
    );
  } else if (selectedType === "pdf") {
    SelectedDropZone = (
      <UploadDropzone
        endpoint="pdfUploader"
        onClientUploadComplete={(res) =>
          handleFileUpload(res[0].url, res[0].name, "pdf")
        }
      />
    );
  } else if (selectedType === "video") {
    SelectedDropZone = (
      <UploadDropzone
        endpoint="videUploader"
        onClientUploadComplete={(res) =>
          handleFileUpload(res[0].url, res[0].name, "video")
        }
      />
    );
  } else {
    SelectedDropZone = (
      <UploadDropzone
        endpoint="textUploader"
        onClientUploadComplete={(res) =>
          handleFileUpload(res[0].url, res[0].name, "text")
        }
      />
    );
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogTrigger>
          <Button onClick={() => setIsOpen(true)}>Add File</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload project files</DialogTitle>
            <DialogDescription>
              share files between all project members
            </DialogDescription>
          </DialogHeader>
          <div className="text-center m-2 ">
            <p className="border-b-2">Select File Type</p>
            <div className="flex items-center justify-center p-2 gap-4">
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <div
                    onClick={() => setSelectedType("image")}
                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-50"
                  >
                    <ImageIcon className="w-6 h-6" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Image File</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <div
                    onClick={() => setSelectedType("pdf")}
                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-50"
                  >
                    <FaFilePdf className="w-6 h-6" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Pdf File</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <div
                    onClick={() => setSelectedType("video")}
                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-50"
                  >
                    <Video className="w-6 h-6" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Video File</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <div
                    onClick={() => setSelectedType("text")}
                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-50"
                  >
                    <Text className="w-6 h-6" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Text File</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div>{SelectedDropZone}</div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default FileUploadDialog;
