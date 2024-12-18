import { UserButton } from "@clerk/nextjs";

const ChatNav = () => {
  return (
    <div className="flex items-center justify-between px-5 h-[4rem] bg-zinc-800">
      <div className="flex items-center gap-3">
        <img src="/file.svg" alt="Logo" className="h-8" />
        <h1 className="text-lg font-semibold text-white">Solana GPT</h1>
      </div>
      <div className="flex items-center gap-3">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            // baseTheme: theme === "dark" ? dark : undefined,
            elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } },
          }}
        />
      </div>
    </div>
  );
};

export default ChatNav;
