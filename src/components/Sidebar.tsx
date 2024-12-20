"use client";

import { Chat } from "@prisma/client";
import {
  PanelLeftCloseIcon,
  PlusIcon,
  MoreVerticalIcon,
  BarChart,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const Sidebar = ({
  sidebarRef,
  isOpen,
  setIsOpen,
}: {
  sidebarRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [allChats, setAllChats] = useState<Chat[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      const response = await fetch("/api/chatApi");
      const chats = await response.json();
      setAllChats(chats);
    };

    fetchChats();
  }, []);

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

  const handleRenameChat = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newTitle = prompt("Enter new title for the chat:");
    if (newTitle) {
      await fetch("/api/chatApi", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title: newTitle }),
      });
      setAllChats((prev) =>
        prev.map((chat) =>
          chat.id === id ? { ...chat, title: newTitle } : chat
        )
      );
    }
    setDropdownOpen(null);
  };

  const handleDeleteChat = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const confirmation = confirm("Are you sure you want to delete this chat?");
    if (confirmation) {
      await fetch("/api/chatApi", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setAllChats((prev) => prev.filter((chat) => chat.id !== id));
    }
    setDropdownOpen(null);
  };

  const handleChatClick = (id: string) => {
    router.push(`/chat/${id}`);
  };

  return (
    <div
      className={`md:h-screen h-full z-20 md:relative absolute top-0 left-0 w-80 bg-zinc-900 border-r border-zinc-700 ${
        isOpen ? "flex" : "hidden"
      } flex-col`}
      ref={sidebarRef}
    >
      <div className="flex items-center justify-between p-[19px]">
        <h1 className="text-lg font-semibold text-white">Chats</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/chat")}>
            <PlusIcon className="w-7 h-7 text-white" />
          </button>
          <button onClick={() => setIsOpen(false)}>
            <PanelLeftCloseIcon className="w-7 h-7 text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-16">
        {allChats.length > 0 && allChats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center justify-between px-4 py-2 hover:bg-zinc-700 cursor-pointer"
            onClick={() => handleChatClick(chat.id)}
          >
            <span className="text-white">{chat.title}</span>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(dropdownOpen === chat.id ? null : chat.id);
                }}
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

      <div className="absolute bottom-0 w-full flex items-center justify-between p-[19px]">
        <a href="/pricing" className="text-lg font-semibold text-white">
          Pricing
        </a>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/pricing")}>
            <BarChart className="w-7 h-7 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
