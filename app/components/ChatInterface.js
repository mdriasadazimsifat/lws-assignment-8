"use client";
import { useCallback, useRef, useState } from "react";
import ChatBoard from "./ChatBoard";
import ChatBoardInput from "./ChatBoardInput";

export default function ChatInterface({ chatMessage, conversationId }) {
  const [messages, setMessages] = useState(chatMessage);
  const [streamingResponse, setStreamingResponse] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const messagesEndRef = useRef(null);
  const handleSendPrompt = useCallback(
    async (prompt, isSave = true) => {
      setIsloading(true);
      if (isSave) {
        setMessages((previousMessages) => [
          ...previousMessages,
          { role: "user", content: prompt },
        ]);
      }

      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({
            messages: [...messages, { role: "user", content: prompt }],
            conversationId,
            isSave,
            currentMessage: { role: "user", content: prompt },
          }),
        });
        const decoder = new TextDecoder();
        let aiStream = "";
        for await (const chunk of response.body) {
          const decodeChunk = decoder.decode(chunk);
          aiStream += decodeChunk;
          setStreamingResponse(aiStream);
        }

        setMessages((previousMessages) => [
          ...previousMessages,
          { role: "model", content: aiStream },
        ]);
        setStreamingResponse("");
      } catch (e) {
        console.log(e);
      } finally {
        setIsloading(false);
      }
    },
    [conversationId, messages]
  );

  if (messages.length === 1 && !isLoading) {
    handleSendPrompt(messages[0].content, false);
    setIsloading(true);
  }
  return (
    <>
      <ChatBoard
        messagesEndRef={messagesEndRef}
        messages={messages}
        stream={streamingResponse}
      />

      <ChatBoardInput isLoading={isLoading} onSendPrompt={handleSendPrompt} />
    </>
  );
}
