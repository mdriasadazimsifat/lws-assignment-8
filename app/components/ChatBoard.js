"use client";
import "highlight.js/styles/mono-blue.css";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import AiResponse from "./AiResponse";
import HumanMessage from "./HumanMessage";
export default function ChatBoard({ messages, stream, messagesEndRef }) {
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messagesEndRef]);
  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto space-y-6 flex-grow ">
      {messages.map((message) => {
        if (message.role === "model") {
          return (
            <AiResponse key={message.id}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {message.content}
              </ReactMarkdown>
            </AiResponse>
          );
        }
        return <HumanMessage key={message.id}>{message.content}</HumanMessage>;
      })}
      {stream?.length > 0 && (
        <AiResponse>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{stream}</ReactMarkdown>
        </AiResponse>
      )}
      <div className="h-[50px]" ref={messagesEndRef} />
    </div>
  );
}
