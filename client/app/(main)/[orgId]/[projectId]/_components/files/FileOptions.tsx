'use client'
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LucideDownload, MoreHorizontal } from "lucide-react";
import Link from "next/link";

const FileOptions = ({ url }: { url: string }) => {
  // Extracting the filename from the URL
  const filename = url.substring(url.lastIndexOf('/') + 1);

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <MoreHorizontal />
        </PopoverTrigger>
        <PopoverContent className="text-center space-y-2">
          <Link
            className="flex items-center justify-center cursor-pointer underline gap-2"
            href={url}
            download={filename} // Use the filename for the download attribute
          >
            <LucideDownload />
            download
          </Link>
          <a className="underline" href={url}>Open</a>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FileOptions;

