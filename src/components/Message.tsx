import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
}

export const Message = ({ content, isUserMessage }: MessageProps) => {
  return (
    <div
      className={cn({
        "bg-zinc-800": isUserMessage,
        "bg-zinc-900/25": !isUserMessage,
      })}
    >
      <div className="p-6">
        <div className="max-w-3xl mx-auto flex items-start gap-2.5">
          <div
            className={cn(
              "size-10 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center",
              {
                "bg-violet-950 border-violet-700 text-zinc-200": isUserMessage,
              }
            )}
          >
            {isUserMessage ? (
              <User className="size-5" />
            ) : (
              <Bot className="size-5 text-white" />
            )}
          </div>

          <div className="flex flex-col ml-6 w-full">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {isUserMessage ? "You" : "Solana GPT"}
              </span>
            </div>

            <div className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
              <ReactMarkdown
                components={{
                  a: ({ node, ref, ...props }) => (
                    <Link
                      {...props}
                      href={props.href ?? ""}
                      className="text-primary hover:underline"
                    />
                  ),
                  p: ({ node, ...props }) => {
                    return <p {...props} className="mt-3 first:mt-0" />;
                  },
                  ul: ({ node, ...props }) => {
                    return (
                      <ul
                        {...props}
                        className="mt-3 list-inside list-disc first:mt-0"
                      />
                    );
                  },
                  li: ({ node, ...props }) => {
                    return <li {...props} className="mt-1" />;
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
