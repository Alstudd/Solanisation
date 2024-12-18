"use client";

import { Message, useChat } from "ai/react";
import { Messages } from "./Messages";
import { ChatInput } from "./ChatInput";
import Sidebar from "./Sidebar";
import ChatNav from "./ChatNav";

const MainWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: Message[];
}) => {
  const { messages, handleInputChange, input, setInput, handleSubmit } =
    useChat({
      api: "/api/chat-stream",
      body: { sessionId },
      initialMessages,
    });
  return (
    <div className="flex min-h-full">
      <Sidebar />
      <div className="w-full relative bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between">
        <ChatNav />
        <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
          <Messages messages={messages} />
        </div>
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setInput={setInput}
        />
      </div>
    </div>
  );
};

export default MainWrapper;
