"use client";
import { updateUnActive } from "@/actions/messages/updateMember";
import useSocket from "@/hooks/useSocket";
import React from "react";

const OrgIdLayout = ({ children }: { children: React.ReactNode }) => {
  const { socket } = useSocket();

  socket?.on("memberUnActive", async (data) => {
    await updateUnActive(data.projectId);
  });

  return <div>{children}</div>;
};

export default OrgIdLayout;
