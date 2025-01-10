import { UserButton } from "@clerk/nextjs";
import { Bot, Menu, PanelRightCloseIcon } from "lucide-react";
import ThemeToggleButton from "./ThemeToggleButton";

const ChatNav = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <div className="flex items-center justify-between px-5 h-[4rem] dark:bg-zinc-800 bg-white">
      {!isOpen && (
        <button className="md:hidden block" onClick={() => setIsOpen(true)}>
          <Menu className="w-7 h-7 dark:text-white text-zinc-900" />
        </button>
      )}
      <div className="flex items-center gap-3">
        {!isOpen && (
          <button
            className="md:block hidden mr-0"
            onClick={() => setIsOpen(true)}
          >
            <PanelRightCloseIcon className="w-7 h-7 dark:text-white text-zinc-900" />
          </button>
        )}
        <div className="size-10 shrink-0 aspect-square rounded-full dark:shadow-current dark:shadow-sm shadow-none border dark:bg-violet-950 bg-violet-700 border-violet-700 flex justify-center items-center">
          <Bot className="size-6 text-white" />
        </div>
        <h1 className="text-lg font-semibold dark:text-white text-zinc-900">
          Solanisation
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggleButton />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            // baseTheme: theme === "dark" ? dark : undefined,
            elements: { avatarBox: { width: "2.25rem", height: "2.25rem" } },
          }}
        />
      </div>
    </div>
  );
};

export default ChatNav;
