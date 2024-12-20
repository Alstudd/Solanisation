"use client";

import { Message, useChat } from "ai/react";
import { Messages } from "./Messages";
import { ChatInput } from "./ChatInput";
import Sidebar from "./Sidebar";
import ChatNav from "./ChatNav";
import { useEffect, useRef, useState } from "react";
import { Chat, Message as MessageModel } from "@prisma/client";
const MainWrapper = ({
  chat,
  initialMessages,
}: {
  chat: Chat & { messages: MessageModel[] };
  initialMessages: Message[];
}) => {
  const {
    messages,
    handleInputChange,
    input,
    setInput,
    handleSubmit,
    isLoading,
  } = useChat({
    api: "/api/chatStream",
    body: {
      chatId: chat.id,
    },
    initialMessages,
  });

  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsOpen(window.innerWidth > 768);
  }, []);

  useEffect(() => {
    if (window.innerWidth > 768 || !isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex min-h-full relative">
      <Sidebar sidebarRef={sidebarRef} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full relative bg-zinc-800 flex flex-col justify-between">
        <ChatNav isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
          <Messages messages={messages} />
        </div>
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setInput={setInput}
          isLoading={isLoading}
          type={"chat"}
        />
      </div>
    </div>
  );
};

export default MainWrapper;
