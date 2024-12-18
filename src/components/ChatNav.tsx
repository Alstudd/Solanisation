const ChatNav = () => {
  return (
    <div className="flex items-center justify-between px-5 h-[4rem] bg-zinc-800">
      <div className="flex items-center gap-3">
        <img src="/file.svg" alt="Logo" className="h-8" />
        <h1 className="text-lg font-semibold text-white">Solana GPT</h1>
      </div>
      <img src="/globe.svg" alt="User Avatar" className="h-8" />
    </div>
  );
};

export default ChatNav;
