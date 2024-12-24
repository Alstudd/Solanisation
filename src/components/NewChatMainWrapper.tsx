"use client";

import { useChat } from "ai/react";
import { ChatInput } from "./ChatInput";
import Sidebar from "./Sidebar";
import ChatNav from "./ChatNav";
import { useEffect, useRef, useState } from "react";
import { Bot } from "lucide-react";
import { useRouter } from "next/navigation";
import { Messages } from "./Messages";
import { Chat } from "@prisma/client";

const NewChatMainWrapper = ({
  initialChats
}: {
  initialChats: Chat[];
}) => {
  const { messages, handleInputChange, input, setInput } = useChat({
    api: "/api/chat",
    body: {
      chatId: null,
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e?: any) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    let tempInput = input;
    setIsLoading(true);

    try {
      setInput("");
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [tempInput],
          chatId: null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error:", error.error);
        return;
      }

      const data = await response.json();

      if (data.redirectUrl) {
        router.push(data.redirectUrl);
      }
    } catch (error) {
      console.error("Error submitting chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
      <Sidebar initialChats={initialChats} sidebarRef={sidebarRef} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full relative flex flex-col justify-between">
        <ChatNav isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* <div className="flex-1 flex flex-col items-center justify-center p-10 mb-36">
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
        </div> */}
        <div className="flex-1 dark:text-white text-zinc-900 dark:bg-zinc-800 bg-white justify-between flex flex-col">
          <Messages messages={[]} />
        </div>
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setInput={setInput}
          isLoading={isLoading}
          type={"newChat"}
        />
      </div>
    </div>
  );
};

export default NewChatMainWrapper;
