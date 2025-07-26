"use client";

import { usePathname } from "next/navigation";

export default function Conversation({ conversation }) {
  const pathName = usePathname();
  return (
    <a
      href={`/conversation/${conversation.id}`}
      className={`flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer ${
        pathName === `/conversation/${conversation.id}` ? "bg-gray-800" : ""
      } `}
    >
      <span className="text-sm text-zinc-300">{conversation.title}</span>
    </a>
  );
}
