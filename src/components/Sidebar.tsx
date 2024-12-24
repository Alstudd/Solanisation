"use client";

import { Chat } from "@prisma/client";
import {
  PanelLeftCloseIcon,
  PlusIcon,
  MoreVerticalIcon,
  BarChart,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import ChatTitleRenameDialog from "./ChatTitleRenameDialog";
import ChatDeleteDialog from "./ChatDeleteDialog";

const Sidebar = ({
  sidebarRef,
  isOpen,
  setIsOpen,
  initialChats,
}: {
  sidebarRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  initialChats: Chat[];
}) => {
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [chatTitle, setChatTitle] = useState<string>("");
  const [id, setId] = useState<string | null>(null);
  const [allChats, setAllChats] = useState<Chat[]>(initialChats);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

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

  const handleRenameOpenDialog = async (id: string, title: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setRenameOpen(true);
    setId(id);
    setChatTitle(title);
    setDropdownOpen(null);
  };

  const handleDeleteOpenDialog = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setDeleteOpen(true);
    setId(id);
    setDropdownOpen(null);
  };

  const handleChatClick = (id: string) => {
    if (pathname !== `/chat/${id}`) {
      router.push(`/chat/${id}`);
    }
  };

  return (
    <div
      className={`md:h-screen h-full z-20 md:relative absolute top-0 left-0 w-80 dark:bg-zinc-900 bg-zinc-100 border-r dark:border-zinc-700 border-zinc-200 ${
        isOpen ? "flex" : "hidden"
      } flex-col`}
      ref={sidebarRef}
    >
      <div className="flex items-center justify-between p-[19px]">
        <h1 className="text-lg font-semibold dark:text-white text-zinc-900">Chats</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/chat")}>
            <PlusIcon className="w-7 h-7 dark:text-white text-zinc-900" />
          </button>
          <button onClick={() => setIsOpen(false)}>
            <PanelLeftCloseIcon className="w-7 h-7 dark:text-white text-zinc-900" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-16">
        {allChats?.length > 0 &&
          allChats
            .map((chat) => (
              <div
                key={chat.id}
                className={`${
                  pathname === `/chat/${chat.id}` ? "dark:bg-zinc-800 bg-white" : ""
                } relative flex items-center justify-between px-4 py-2 dark:hover:bg-zinc-700 hover:bg-zinc-200 cursor-pointer`}
                onClick={() => handleChatClick(chat.id)}
              >
                {pathname === `/chat/${chat.id}` && (
                  <div className="absolute left-0 w-1 h-full bg-violet-700" />
                )}
                <span className="dark:text-white text-zinc-900">{chat.title.length > 20 ? chat.title.slice(0, 20) + "..." : chat.title}</span>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpen(
                        dropdownOpen === chat.id ? null : chat.id
                      );
                    }}
                  >
                    <MoreVerticalIcon className="w-5 h-5 dark:text-white text-zinc-900" />
                  </button>
                  {dropdownOpen === chat.id && (
                    <div
                      ref={dropdownRef}
                      className="z-30 absolute right-0 mt-2 w-36 bg-zinc-700 border border-zinc-600 rounded-xl shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={(e) => handleRenameOpenDialog(chat.id, chat.title, e)}
                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-600 rounded-t-xl"
                      >
                        Rename
                      </button>
                      <button
                        onClick={(e) => handleDeleteOpenDialog(chat.id, e)}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-zinc-600 rounded-b-xl"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
      </div>

      <div className="absolute bottom-0 w-full flex items-center justify-between p-[19px]">
        <a href="/pricing" className="text-lg font-semibold dark:text-white text-zinc-900">
          Pricing
        </a>
        <div className="flex items-center gap-3">
          <a href="/pricing">
            <BarChart className="w-7 h-7 dark:text-white text-zinc-900" />
          </a>
        </div>
      </div>
      <ChatTitleRenameDialog id={id} chatTitle={chatTitle} setAllChats={setAllChats} open={renameOpen} setOpen={setRenameOpen} />
      <ChatDeleteDialog id={id} setAllChats={setAllChats} open={deleteOpen} setOpen={setDeleteOpen} />
    </div>
  );
};

export default Sidebar;
