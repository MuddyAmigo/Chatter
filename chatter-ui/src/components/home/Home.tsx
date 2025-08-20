import React from "react";
import ChatList from "../chat-list/ChatList";

const Home: React.FC = () => {
  const chatListWidth = 340;
  const chatListMinWidth = 280;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a1020",
        overflow: "hidden", // prevent page-level scrolling
      }}
    >
      <div
        style={{
          display: "flex",
          height: `calc(100vh)`, // full viewport (header is fixed and content container already padded)
          overflow: "hidden",
        }}
      >
        {/* spacer to reserve left column for the fixed ChatList */}
        <div
          style={{
            width: chatListWidth,
            minWidth: chatListMinWidth,
            flex: "0 0 auto",
          }}
          aria-hidden
        />

        {/* right pane: fixed content area — no scroll here */}
        <main
          style={{
            flex: 1,
            height: "100%",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* ChatList is fixed and handles its own internal scrolling */}
      <ChatList />
    </div>
  );
};

export default Home;