import { MessageCircle } from "lucide-react";
export default function CreateConversationButton() {
  return (
    <div className="space-y-1">
      <a
        href="/"
        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="text-sm">Create Chat</span>
      </a>
    </div>
  );
}
