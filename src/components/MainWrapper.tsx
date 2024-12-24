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
  initialChats,
}: {
  chat: Chat & { messages: MessageModel[] };
  initialMessages: Message[];
  initialChats: Chat[];
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(window.innerWidth > 768);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [model, setModel] = useState<"standard" | "advanced">("standard");

  const {
    messages,
    handleInputChange,
    input,
    setInput,
    handleSubmit,
    isLoading,
  } = useChat({
    api: model === "standard" ? "/api/standardChat" : "/api/advancedChat",
    body: {
      chatId: chat.id,
    },
    initialMessages,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
      <Sidebar
        sidebarRef={sidebarRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialChats={initialChats}
      />
      <div className="w-full relative dark:bg-zinc-800 bg-white flex flex-col justify-between">
        <ChatNav isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex-1 text-black dark:bg-zinc-800 bg-white justify-between flex flex-col">
          <Messages messages={messages} />
        </div>
        <ChatInput
          model={model}
          setModel={setModel}
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
