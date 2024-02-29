"use client";
import useSocket from "@/hooks/useSocket";
import { formatDate } from "@/lib/formatedDate";
import { User } from "@prisma/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";

interface messageInterface {
  id: string;
  text: string;
  imageUrl: string | null;
  userId: string;
  createdAt: Date;
}

const ConversationBody = ({
  currentUser,
  otherUser,
  storedMessages
}: {
  currentUser: User;
  otherUser: User;
  storedMessages: messageInterface[]
}) => {
  const [messages, setMessages] = useState<messageInterface[]>(storedMessages);
  const { socket } = useSocket();
  const { conversationId } = useParams();
  const messageRef = useRef<HTMLDivElement>(null);

  socket?.on(`${conversationId}`, (data) => {
    const newMessages = [...messages, data];
    setMessages(newMessages);
  });

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  return (
    <div className="min-h-screen overflow-y-scroll flex-col flex justify-end">
      {messages?.map((message) => (
        <div key={message.id} className="" ref={messageRef}>
          {message.userId === currentUser.id ? (
            <div className="flex items-center gap-2 text-left bg-gradient-to-r from-purple-200 to-purple-400 p-2 m-2 rounded-lg mb-2">
              <Image
                src={currentUser.image || ""}
                alt="image"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex items-start justify-start flex-col ">
                {message.imageUrl && (
                  <Image
                    src={message.imageUrl || ""}
                    alt="attachment"
                    width={200}
                    height={200}
                    className="rounded-md object-cover my-2"
                  />
                )}
                <p className="text-lg font-medium">{message.text}</p>
                <small>{formatDate(message.createdAt)}</small>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-right flex-row-reverse bg-gradient-to-r from-purple-200 to-purple-400 p-2 m-2 rounded-sm mb-2">
              <Image
                src={otherUser.image || ""}
                alt="image"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex items-start justify-start flex-col ">
                {message.imageUrl && (
                  <Image
                    src={message.imageUrl || ""}
                    alt="attachment"
                    width={200}
                    height={200}
                    className="rounded-md object-cover my-2"
                  />
                )}
                <p className="text-lg font-medium">{message.text}</p>
                <small>{formatDate(message.createdAt)}</small>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConversationBody;
