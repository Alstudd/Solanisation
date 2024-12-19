"use client";

import { Message, useChat } from "ai/react";
import { NewChatInput } from "./NewChatInput";
import Sidebar from "./Sidebar";
import ChatNav from "./ChatNav";
import { useEffect, useRef, useState } from "react";
import { Bot } from "lucide-react";

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
        <div className="flex-1 flex flex-col items-center justify-center p-10 mb-36">
          <div className="shadow-current shadow-sm size-20 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center mb-5">
            <Bot className="size-12 text-white" />
          </div>
          <h1 className="text-white text-2xl font-bold">
            Welcome to Solana GPT
          </h1>
          <p className="text-white text-lg mt-2 text-center">
            Solana GPT is a conversational AI that can help you with your
            Solana-related queries.
          </p>
          <p className="text-white text-lg mt-2 text-center">
            You can ask questions about Solana, get the latest Solana price, and
            more.
          </p>
          <p className="text-white text-lg mt-2 text-center">
            To get started, type a message in the chat box below.
          </p>
        </div>
        <NewChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setInput={setInput}
        />
      </div>
    </div>
  );
};

export default NewChatMainWrapper;
