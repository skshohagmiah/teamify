"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image } from "lucide-react";
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import useSocket from "@/hooks/useSocket";
import { useParams, useRouter } from "next/navigation";
import { createMessage } from "@/actions/messages/createMessage";
import { updateLastSeen } from "@/actions/messages/updateLastSeen";
import { formatDate } from "@/lib/formatedDate";
import { createNotification } from "@/actions/notification/createNotification";
import { User } from "@prisma/client";

const MessageInput = ({
  user,
  memberId,
  otherUserId,
}: {
  user: User;
  memberId: string;
  otherUserId: string;
}) => {
  const { socket } = useSocket();
  const { conversationId, projectId } = useParams();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket?.emit("message-send", {
      conversationId,
      text,
      imageUrl,
      userId: user.id,
    });
    await createMessage(conversationId as string, text, imageUrl);
    await createNotification({
      content: `${text}`,
      projectId: projectId as string,
      isGroup: false,
      receiverId: otherUserId,
    });
    socket?.emit("notification-on-off", true);
    socket?.emit("send-notification", {
      content: text,
      senderName: user.name,
      senderImage: user.image,
      receiverId: otherUserId,
    });

    let timeOutID;

    if (timeOutID) {
      clearTimeout(timeOutID);
    } else {
      timeOutID = setTimeout(async () => {
        const lastSeen = await updateLastSeen(memberId, new Date());
        if (lastSeen) {
          router.refresh();
        }
      }, 60000);
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex items-center justify-between gap-2 p-4 bg-gray-200 w-full sticky  bottom-0"
    >
      <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 rounded-sm"
      />
      <Button type="submit">Send</Button>
    </form>
  );
};

export default MessageInput;
