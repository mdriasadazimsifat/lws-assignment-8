"use client";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { deleteConversation } from "../actions/conversation";
export default function Dropdown({ conversationId, onEdit }) {
  const deleteConversationWithId = deleteConversation.bind(
    null,
    conversationId
  );
  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  useEffect(() => {
    function removeMenu(e) {
      if (!menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("click", removeMenu);
    return () => {
      document.removeEventListener("click", removeMenu);
    };
  }, []);

  function toggleDropdown() {
    setShowMenu(!showMenu);
  }

  async function handleDeleteConversation() {
    try {
      await deleteConversationWithId();
      router.push("/");
    } catch (e) {}
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
        onClick={toggleDropdown}
      >
        <MoreHorizontal className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
      </button>
      {/* Dropdown Menu  */}
      {showMenu && (
        <div
          id="conversationDropdown"
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1  z-20"
        >
          <button
            onClick={() => {
              setShowMenu(false);
              onEdit();
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span>Rename conversation</span>
          </button>

          <hr className="my-1 opacity-10" />
          <button
            onClick={() => {
              setShowMenu(false);
              handleDeleteConversation();
            }}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete conversation</span>
          </button>
        </div>
      )}
    </div>
  );
}
