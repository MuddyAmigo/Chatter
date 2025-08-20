import React from "react";
import ChatList from "../chat-list/ChatList";
import Chat from "./Chat";

const ChatLayout: React.FC = () => {
  const chatListWidth = 340;
  const chatListMinWidth = 280;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a1020",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "calc(100vh - 64px)", // Account for header
          overflow: "hidden",
        }}
      >
        {/* Left side: ChatList */}
        <div
          style={{
            width: chatListWidth,
            minWidth: chatListMinWidth,
            flex: "0 0 auto",
            position: "relative",
          }}
        >
          <ChatList />
        </div>

        {/* Right side: Chat component */}
        <main
          style={{
            flex: 1,
            height: "100%",
            overflow: "auto",
            background: "#0a1020",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Chat />
        </main>
      </div>
    </div>
  );
};

export default ChatLayout;