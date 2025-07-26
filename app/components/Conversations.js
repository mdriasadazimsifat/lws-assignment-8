import getConversations from "../utils/getConversations";
import Conversation from "./Conversation";

export default async function Conversations() {
  const conversations = await getConversations();
  return (
    <div className="pt-4 ">
      <span className="text-gray-500 text-xs uppercase font-semibold">
        Conversations
      </span>
      <div className="space-y-1  mt-3">
        {conversations.length === 0 && "no conversation found"}
        {conversations.map((conversation) => (
          <Conversation conversation={conversation} key={conversation.id} />
        ))}
      </div>
    </div>
  );
}
