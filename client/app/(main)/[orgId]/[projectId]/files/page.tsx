import React from "react";
import FilesHeader from "../_components/files/FilesHeader";
import { prisma } from "@/lib/db";
import Image from "next/image";
import FileOptions from "../_components/files/FileOptions";
import DesktopHeader from "../_components/header/DesktopHeader";

const FilesPage = async ({ params }: { params: { projectId: string } }) => {
  const files = await prisma.file.findMany({
    where: {
      projectId: params.projectId,
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="bg-white w-full">
      <DesktopHeader />
      <FilesHeader />
      <div className="p-2 max-w-screen-2xl mx-auto">
        {files.length === 0 ? (
          <p className="text-xl text-center font-medium mt-4">
            No files are found for this project
          </p>
        ) : (
          files.map((file) => (
            <div
              key={file.id}
              className="flex flex-col md:flex-row items-center justify-between gap-2 my-2 bg-gray-50 p-2 rounded-md"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={file.user.image || ""}
                  alt="user image"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <p className="font-medium">{file.user.name}</p>
              </div>
              <p>Uploaded this</p>
              <p className="text-lg font-semibold">{file.name}</p>
              <FileOptions url={file.url || ""} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FilesPage;
