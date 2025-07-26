"use client";
import { Zap } from "lucide-react";
import { useFormStatus } from "react-dom";
import { createConversation } from "../actions/conversation";

export default function Suggestion({ prompt, setIsSubmiting }) {
  const createConversationWithPrompt = createConversation.bind(null, prompt);
  const { pending } = useFormStatus();
  return (
    <div
      onClick={async () => {
        if (pending) {
          return;
        }
        setIsSubmiting(true);
        await createConversationWithPrompt();
        setIsSubmiting(false);
      }}
      className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer text-left"
    >
      <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0" />
      <span className="text-gray-700">{prompt}</span>
    </div>
  );
}
