"use client";

import { type Message as TMessage } from "ai/react";
import { Message } from "./Message";
import { Bot } from "lucide-react";
import { useEffect, useRef } from "react";

interface MessagesProps {
  messages: TMessage[];
  setModel?: (model: "standard" | "advanced") => void;
}

export const Messages = ({ messages, setModel }: MessagesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className={`flex max-h-[calc(100vh-3.5rem-12rem)] flex-1 flex-col overflow-y-auto`}
      ref={scrollRef}
    >
      {messages.length ? (
        messages.map((message, i) => (
          <Message
            key={i}
            content={message.content}
            isUserMessage={message.role === "user"}
          />
        ))
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 mx-auto p-10">
          <Bot className="h-12 w-12 text-violet-500" />
          <h3 className="font-semibold text-xl text-center">
            Welcome to Solanisation for Solana Devs
          </h3>
          <p className="text-zinc-500 text-sm text-center">
            Ask me anything about Solana and I will provide you with the best
            answer.
          </p>
          <div className="flex items-center justify-center gap-6 mt-0 lg:w-[70%] w-full">
            {/* Standard Model Card */}
            <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl bg-white dark:bg-zinc-900">
              <h4 className="text-center text-lg font-bold text-gray-700 dark:text-white">
                Standard Model
              </h4>
              <p className="text-center sm:block hidden text-sm text-gray-500 dark:text-gray-400 mt-2">
                Fast, short and efficient answers for your Solana development
                queries.
              </p>
              <button
                onClick={() => setModel && setModel("standard")}
                className="mt-4 px-4 py-2 text-sm font-medium text-white border dark:bg-violet-950 bg-violet-700 border-violet-700 rounded-[10px] dark:shadow-current dark:shadow-sm shadow-none"
              >
                Select
              </button>
            </div>

            {/* Advanced Model Card */}
            <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl bg-white dark:bg-zinc-900">
              <h4 className="text-center text-lg font-bold text-gray-700 dark:text-white">
                Advanced Model
              </h4>
              <p className="text-center sm:block hidden text-sm text-gray-500 dark:text-gray-400 mt-2">
                Detailed, in-depth and practical answers for your Solana
                development queries.
              </p>
              <button
                onClick={() => setModel && setModel("advanced")}
                className="mt-4 px-4 py-2 text-sm font-medium text-white border dark:bg-violet-950 bg-violet-700 border-violet-700 rounded-[10px] dark:shadow-current dark:shadow-sm shadow-none"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
