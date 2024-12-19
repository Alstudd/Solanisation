import { PanelLeftCloseIcon, PlusIcon, MoreVerticalIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Sidebar = ({
  sidebarRef,
  isOpen,
  setIsOpen,
}: {
  sidebarRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [chats, setChats] = useState([
    { id: 1, title: "Chat 1" },
    { id: 2, title: "Chat 2" },
    { id: 3, title: "Chat 3" },
  ]);

  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNewChat = () => {
    const newTitle = prompt("Enter title for the new chat:");
    if (newTitle) {
      setChats([...chats, { id: chats.length + 1, title: newTitle }]);
    }
  };

  const handleRenameChat = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const newTitle = prompt("Enter new title for the chat:");
    if (newTitle) {
      setChats(
        chats.map((chat) =>
          chat.id === id ? { ...chat, title: newTitle } : chat
        )
      );
    }
    setDropdownOpen(null);
  };

  const handleDeleteChat = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setChats(chats.filter((chat) => chat.id !== id));
    setDropdownOpen(null);
  };

  return (
    <div
      className={`md:h-auto h-full z-20 md:relative absolute top-0 left-0 w-80 bg-zinc-900 border-r border-zinc-700 ${
        isOpen ? "flex" : "hidden"
      } flex-col`}
      ref={sidebarRef}
    >
      <div className="flex items-center justify-between p-[19px]">
        <h1 className="text-lg font-semibold text-white">Chats</h1>
        <div className="flex items-center gap-3">
          <button onClick={handleNewChat}>
            <PlusIcon className="w-7 h-7 text-white" />
          </button>
          <button onClick={() => setIsOpen(false)}>
            <PanelLeftCloseIcon className="w-7 h-7 text-white" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center justify-between px-4 py-2 hover:bg-zinc-700 cursor-pointer"
          >
            <span className="text-white">{chat.title}</span>
            <div className="relative">
              <button
                onClick={() =>
                  setDropdownOpen(dropdownOpen === chat.id ? null : chat.id)
                }
              >
                <MoreVerticalIcon className="w-5 h-5 text-white" />
              </button>
              {dropdownOpen === chat.id && (
                <div
                  ref={dropdownRef}
                  className="z-30 absolute right-0 mt-2 w-36 bg-zinc-700 border border-zinc-600 rounded-md shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={(e) => handleRenameChat(chat.id, e)}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-600"
                  >
                    Rename
                  </button>
                  <button
                    onClick={(e) => handleDeleteChat(chat.id, e)}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-zinc-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
