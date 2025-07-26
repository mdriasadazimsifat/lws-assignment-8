import ChatInterface from "@/app/components/ChatInterface";
import getMessages from "@/app/utils/getMessages";
import { notFound } from "next/navigation";
import ChatHeader from "../../components/ChatHeader";

export default async function ConversationPage({ params: { conversationId } }) {
  const { messages, title } = await getMessages(conversationId);

  if (messages.length === 0) {
    notFound();
  }
  return (
    <div className="flex-1 flex flex-col bg-white">
      <ChatHeader conversationId={conversationId} title={title} />
      <ChatInterface chatMessage={messages} conversationId={conversationId} />
    </div>
  );
}
