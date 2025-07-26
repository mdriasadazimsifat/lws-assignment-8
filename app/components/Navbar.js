import Conversations from "./Conversations";
import CreateConversationButton from "./CreateConversationButton";

export default function Navbar() {
  return (
    <nav className="flex-1 p-4 space-y-2  overflow-y-auto">
      <CreateConversationButton />
      <Conversations />
    </nav>
  );
}
