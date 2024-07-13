import { ChatPanel } from "@/components/chat/panel";
import { SideNavBar } from "@/components/side-navbar";

const Chat = () => {
  return (
    <div className="flex gap-4 w-full h-screen max-h-screen overflow-hidden px-2 pl-0">
      <SideNavBar />

      <ChatPanel id={null} />
    </div>
  );
};

export default Chat;
