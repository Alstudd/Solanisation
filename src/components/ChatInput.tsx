"use client";

import { Button, Textarea } from "@nextui-org/react";
import { Loader2, Send } from "lucide-react";
import { type useChat } from "ai/react";

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"];
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"];
type SetInput = ReturnType<typeof useChat>["setInput"];

interface ChatInputProps {
  input: string;
  handleInputChange: HandleInputChange;
  handleSubmit: HandleSubmit;
  setInput: SetInput;
  isLoading: boolean;
  type: "chat" | "newChat";
}

export const ChatInput = ({
  handleInputChange,
  handleSubmit,
  input,
  setInput,
  isLoading,
  type,
}: ChatInputProps) => {

  return (
    <div className="z-10 bg-zinc-800 absolute bottom-0 left-0 w-full">
      <div className="mx-2 flex flex-row gap-3 md:mx-auto md:max-w-lg md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-1 mb-4 mx-4 bg-zinc-900 rounded-xl shadow-current shadow-sm backdrop-blur-xl backdrop-saturate-200">
            <form onSubmit={handleSubmit} className="">
              <Textarea
                variant="bordered"
                classNames={{
                  inputWrapper: [
                    "!cursor-text",
                    "!border-transparent",
                  ],
                }}
                minRows={4}
                maxRows={7}
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
                className={`${type === "newChat" && "animate-bounce"} shadow-current shadow-sm absolute z-10 border bg-violet-950 border-violet-700 right-2 bottom-2`}
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
