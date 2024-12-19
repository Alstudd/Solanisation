"use client";

import { Message, useChat } from "ai/react";
import { Messages } from "./Messages";
import { ChatInput } from "./ChatInput";
import Sidebar from "./Sidebar";
import ChatNav from "./ChatNav";
import { useEffect, useRef, useState } from "react";

const NewChatMainWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: Message[];
}) => {
  const { messages, handleInputChange, input, setInput, handleSubmit } =
    useChat({
      api: "/api/chatStream",
      body: { sessionId },
      initialMessages,
    });

  const [isOpen, setIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    setIsOpen(screenWidth > 768);
  }, [screenWidth]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        screenWidth <= 768
      ) {
        setIsOpen(false);
      }
    };

    if (screenWidth > 768 || !isOpen) return;

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, screenWidth]);

  return (
    <div className="flex min-h-full relative">
      <Sidebar sidebarRef={sidebarRef} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full relative bg-zinc-800 flex flex-col justify-between">
        <ChatNav isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
          <Messages messages={messages} />
        </div>
        {/* <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setInput={setInput}
        /> */}
      </div>
    </div>
  );
};

export default NewChatMainWrapper;
