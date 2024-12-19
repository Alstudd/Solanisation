import { PanelLeftCloseIcon, PlusIcon } from "lucide-react";

const Sidebar = ({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <div className={`z-20 md:relative absolute top-0 left-0 md:h-auto h-full w-80 bg-zinc-800 border-r border-zinc-700 ${isOpen ? "flex" : "hidden"} flex-col`}>
      <div className="flex items-center justify-between p-[19px]">
        <h1 className="text-lg font-semibold text-white">Chats</h1>
        <div className="flex items-center gap-3">
          <button>
            <PlusIcon className="w-7 h-7 text-white" />
          </button>
          <button onClick={() => setIsOpen(false)}>
            <PanelLeftCloseIcon className="w-7 h-7 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
