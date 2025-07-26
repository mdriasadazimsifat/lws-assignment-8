"use client";
import { useEffect, useRef, useState } from "react";
import { updateTitle } from "../actions/conversation";
import Dropdown from "./Dropdown";

export default function ChatHeader({ title, conversationId }) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(title);
  const [previousText, setPreviousText] = useState(title);
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current && edit) {
      inputRef.current.focus();
    }
  }, [edit]);

  return (
    <div className="px-8 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>

          <input
            ref={inputRef}
            onBlur={async () => {
              setEdit(false);
              if (previousText !== text) {
                await updateTitle(conversationId, text);
                setPreviousText(text);
              }
            }}
            className={`${
              !edit && "hidden"
            } text-gray-800 font-semibold outline-none border p-2 rounded-md border-gray-200`}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <h1
            className={`${
              edit && "hidden"
            } text-lg font-semibold text-gray-800`}
          >
            {text}
          </h1>
        </div>
        <Dropdown
          onEdit={() => {
            setEdit(true);
          }}
          conversationId={conversationId}
        />
      </div>
    </div>
  );
}
