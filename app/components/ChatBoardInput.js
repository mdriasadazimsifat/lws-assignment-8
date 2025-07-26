"use client";

import { ArrowRight, Loader, Sparkles } from "lucide-react";
import { useState } from "react";
export default function ChatBoardInput({ onSendPrompt, isLoading }) {
  const [prompt, setPrompt] = useState("");

  function handleInputChange(e) {
    setPrompt(e.target.value);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (prompt.length < 2) {
          return;
        }
        onSendPrompt(prompt);
        setPrompt("");
      }}
      className="p-6 border-t border-gray-200"
    >
      <div className="relative">
        <input
          value={prompt}
          onChange={handleInputChange}
          name="prompt"
          type="text"
          placeholder="Ask me Anything"
          className="w-full p-4 pr-20 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
        </div>
      </div>
      <div className="flex items-end justify-end mt-3">
        <div className="flex items-end space-x-4">
          <span className="text-sm text-gray-500">{prompt.length}/1000</span>
          {isLoading ? (
            <button
              disabled={isLoading}
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <Loader className="animate-spin" />
            </button>
          ) : (
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
