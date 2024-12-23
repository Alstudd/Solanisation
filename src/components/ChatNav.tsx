import { UserButton } from "@clerk/nextjs";
import { Bot, Menu, PanelRightCloseIcon } from "lucide-react";

const ChatNav = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <div className="flex items-center justify-between px-5 h-[4rem] bg-zinc-800">
      {!isOpen && (
        <button className="md:hidden block" onClick={() => setIsOpen(true)}>
          <Menu className="w-7 h-7 text-white" />
        </button>
      )}
      <div className="flex items-center gap-3">
        {!isOpen && (
          <button
            className="md:block hidden mr-0"
            onClick={() => setIsOpen(true)}
          >
            <PanelRightCloseIcon className="w-7 h-7 text-white" />
          </button>
        )}
        <div className="size-11 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center">
          <Bot className="size-6 text-white" />
        </div>
        <h1 className="text-lg font-semibold text-white">Solanisation</h1>
      </div>
      <div className="flex items-center gap-3">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            // baseTheme: theme === "dark" ? dark : undefined,
            elements: { avatarBox: { width: "2.3rem", height: "2.3rem" } },
          }}
        />
      </div>
    </div>
  );
};

export default ChatNav;
