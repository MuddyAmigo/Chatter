import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useTheme, useMediaQuery } from "@mui/material";
import { useGetChats } from "../../hooks/useGetChats";
import { usePath } from "../../hooks/usePath";
import ChatListItem from "./chat-list-item/ChatListitem";
import ChatListHeader from "./chal-list-header/ChatListHeader";
import ChatListAdd from "./chat-list-add/ChatListAdd";

const SAMPLE_CHATS = new Array(12).fill(null).map((_, i) => ({
  id: `chat-${i}`,
  title: "Brunch this weekend?",
  subtitle: "Ali Connors — I'll be in your neighborhood doing errands this…",
}));

const ChatList: React.FC = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const headerHeight = isSmall ? 56 : 64;
  const {data} = useGetChats();
  const { path } = usePath();

  useEffect(() => {
    const pathSplit = path.split("chats/");
    if (pathSplit.length === 2) {
      setSelectedChatId(pathSplit[1]);
    }
  }, [path]);
  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />

      <Box
        sx={{
          width: 340,
          minWidth: 280,
          // place the list below the header
          position: "fixed",
          left: 0,
          top: `${headerHeight}px`,
          height: `calc(100vh - ${headerHeight}px)`,
          p: 1.5,
          boxSizing: "border-box",
          // blue glow / shadow on the left column
          boxShadow:
            "inset 8px 0 24px rgba(30,60,180,0.08), 0 8px 32px rgba(30,60,180,0.16)",
          bgcolor: "rgba(20,24,35,0.95)",
          borderRight: "1px solid rgba(255,255,255,0.03)",
          display: "flex",
          flexDirection: "column",
          zIndex: 30,
        }}
      >
        <Stack spacing={1} sx={{ height: "100%" }}>
          <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />

          <Divider sx={{ borderColor: "rgba(255,255,255,0.04)" }} />

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              mt: 1,
              pb: 2,
            }}
          >
            <List
              sx={{
                p: 0,
                m: 0,
                bgcolor: "transparent",
              }}
            >
              {data?.chats
                .map((c) => (
                  <React.Fragment key={c._id}>
                    <Divider sx={{ borderColor: "rgba(255,255,255,0.02)" }} />
                    <ChatListItem chat={c} selected={c._id === selectedChatId} />
                  </React.Fragment>
                ))
                .reverse()}

              {data?.chats.length === 0 && (
                <Box sx={{ p: 3 }}>
                  <Typography color="text.secondary" align="center">
                    No chats yet
                  </Typography>
                </Box>
              )}
            </List>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default ChatList;