"use client";

import { Button, Textarea } from "@nextui-org/react";
import { Loader2, Send, Repeat } from "lucide-react";
import { type useChat } from "ai/react";

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"];
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"];
type SetInput = ReturnType<typeof useChat>["setInput"];

interface ChatInputProps {
  model: "standard" | "advanced";
  setModel: (model: "standard" | "advanced") => void;
  input: string;
  handleInputChange: HandleInputChange;
  handleSubmit: HandleSubmit;
  setInput: SetInput;
  isLoading: boolean;
  type: "chat" | "newChat";
}

export const ChatInput = ({
  model,
  setModel,
  handleInputChange,
  handleSubmit,
  input,
  setInput,
  isLoading,
  type,
}: ChatInputProps) => {
  const toggleModel = () => {
    setModel(model === "standard" ? "advanced" : "standard");
  };

  return (
    <div className="z-10 dark:bg-zinc-800 bg-white absolute bottom-0 left-0 w-full">
      <div className="mx-4 flex flex-col md:mx-auto md:max-w-lg lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Current Model:{" "}
            <span className="font-semibold text-violet-700 dark:text-violet-500">
              {model === "standard" ? "Standard" : "Advanced"}
            </span>
          </span>
          <button
            onClick={toggleModel}
            className="dark:shadow-current dark:shadow-sm sm:flex hidden items-center px-3 py-2 text-sm font-medium text-white bg-violet-700 rounded-xl shadow-md dark:bg-violet-950 hover:bg-violet-800 dark:hover:bg-violet-800"
          >
            <Repeat className="w-4 h-4 mr-2" />
            Switch to {model === "standard" ? "Advanced" : "Standard"}
          </button>
          <button
            onClick={toggleModel}
            className="dark:shadow-current dark:shadow-sm sm:hidden flex items-center px-3 py-2 text-sm font-medium text-white bg-violet-700 rounded-xl shadow-md dark:bg-violet-950 hover:bg-violet-800 dark:hover:bg-violet-800"
          >
            <Repeat className="w-4 h-4 mr-2" />
            {model === "standard" ? "Advanced" : "Standard"}
          </button>
        </div>
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-1 mb-4 dark:bg-zinc-900 bg-zinc-100 rounded-xl dark:shadow-current dark:shadow-sm shadow-none backdrop-blur-xl backdrop-saturate-200">
            <form onSubmit={handleSubmit}>
              <Textarea
                variant="bordered"
                classNames={{
                  inputWrapper: ["!cursor-text", "!border-transparent"],
                }}
                minRows={4}
                maxRows={6}
                autoFocus
                onChange={handleInputChange}
                value={input}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                    setInput("");
                  }
                }}
                placeholder="Enter your question..."
                className="resize-none text-base"
                disabled={isLoading}
              />

              <Button
                size="sm"
                type="submit"
                disabled={isLoading}
                className={`${
                  type === "newChat" && "animate-bounce"
                } dark:shadow-current dark:shadow-sm shadow-none absolute z-10 border dark:bg-violet-950 bg-violet-700 border-violet-700 right-2 bottom-2`}
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin text-white" />
                ) : (
                  <Send className="size-4 text-white" />
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
