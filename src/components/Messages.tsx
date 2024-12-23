"use client";

import { type Message as TMessage } from "ai/react";
import { Message } from "./Message";
import { MessageSquare } from "lucide-react";
import { useEffect, useRef } from "react";

interface MessagesProps {
  messages: TMessage[];
}

export const Messages = ({ messages }: MessagesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className={`flex max-h-[calc(100vh-3.5rem-10rem)] flex-1 flex-col overflow-y-auto`} ref={scrollRef}>
      {messages.length ? (
        messages.map((message, i) => (
          <Message
            key={i}
            content={message.content}
            isUserMessage={message.role === "user"}
          />
        ))
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 mx-auto p-10">
          <MessageSquare className="size-8 text-violet-500" />
          <h3 className="font-semibold text-xl text-white text-center">
            Welcome to Solanisation for Solana Devs
          </h3>
          <p className="text-zinc-500 text-sm text-center">
            Ask me anything about Solana and I will try to help you.
          </p>
        </div>
      )}
    </div>
  );
};
