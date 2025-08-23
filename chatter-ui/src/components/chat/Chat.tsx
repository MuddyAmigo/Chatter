import { useParams, useLocation } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Grid,
  Avatar,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useState, useRef, useEffect } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { useMessageCreated } from "../../hooks/useMessageCreated";


const Chat = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const chatId = params._id!;
  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage(chatId);
  const { data: messages } = useGetMessages({ chatId });
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { data: latestMessage } = useMessageCreated({ chatId });
  const [allMessages, setAllMessages] = useState<any[]>([]);


  console.log("=== CHAT DEBUG ===");
  console.log("Current chatId:", chatId);
  console.log("Latest message data:", latestMessage);
  console.log("All messages count:", allMessages.length);
  console.log("Fetched messages count:", messages?.messages?.length || 0);
  if (allMessages.length > 0) {
    console.log("Message chatIds:", allMessages.map((m: any) => ({ id: m._id, chatId: m.chatId, content: m.content.substring(0, 20) })));
  }
  console.log("==================");

  // New improved scroll function that only scrolls the messages container
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 100);
    }
  };

   useEffect(() => {
    if (messages?.messages) {
      const sorted = [...messages.messages].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      // Only update if we don't have messages yet, or if we have fewer messages than what's fetched
      setAllMessages((prev) => {
        if (prev.length === 0 || sorted.length > prev.length) {
          return sorted;
        }
        // If fetched messages are the same or fewer, keep existing messages and merge any new ones
        const existingIds = new Set(prev.map((m: any) => m._id));
        const newMessages = sorted.filter((m) => !existingIds.has(m._id));
        if (newMessages.length > 0) {
          return [...prev, ...newMessages].sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
        return prev;
      });
    }
  }, [messages]);

  // Merge in latest subscription message (avoid duplicates) and keep sort
  useEffect(() => {
    const incoming = (latestMessage as any)?.messageCreated;
    if (incoming?._id) {
      // Check if this message belongs to the current chat
      if (incoming.chatId !== chatId) {
        console.log("Ignoring message from different chat:", incoming.chatId, "current:", chatId);
        return;
      }
      
      setAllMessages((prev: any) => {
        // Check if message already exists
        if (prev.some((m: any) => m._id === incoming._id)) return prev;
        
        // Add new message and sort
        const merged = [...prev, incoming].sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        
        console.log("Added new real-time message to chat:", chatId, incoming);
        return merged;
      });
    }
  }, [latestMessage, chatId]);



  // Scroll on path change
  useEffect(() => {
    setMessage("");
    scrollToBottom();
  }, [location.pathname]);

  // Scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  const handleCreateMessage = async () => {
    if (!message.trim()) return;
    
    await createMessage({
      variables: { createMessageInput: { content: message.trim(), chatId } },
    });
    setMessage("");
  };

  return (
    <Stack sx={{ 
      height: "100%", 
      position: "relative",
      overflow: "hidden", // Prevent background scrolling
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Sticky Header */}
      <Box 
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "linear-gradient(180deg, rgba(10,16,32,1) 0%, rgba(10,16,32,0.9) 90%)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          px: 3,
          py: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 600,
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            letterSpacing: "-0.5px",
          }}
        >
          {data?.chat?.name || "Chat"}
        </Typography>
      </Box>

      {/* Scrollable Message Area - Use ref here instead of on a div at the bottom */}
      <Box 
        ref={messagesContainerRef}
        sx={{ 
          flexGrow: 1,
          overflow: "auto",
          px: 3, 
          py: 2,
          maxHeight: "calc(100vh - 200px)", // Adjust based on header and input heights
          display: "flex",
          flexDirection: "column",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255,255,255,0.05)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.2)",
            borderRadius: "4px",
          }
        }}
      >
        {allMessages
          ?.filter((msg: any) => msg.chatId === chatId) // Filter messages for current chat only
          ?.map((message: any, index: number) => (
          <Grid container alignItems="center" marginBottom="1.2rem" key={message._id || index}>
            <Grid item xs={3} md={1}>
              <Avatar 
                src="" 
                sx={{ 
                  width: 52, 
                  height: 52,
                  bgcolor: 'rgba(30, 60, 180, 0.8)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }} 
              />
            </Grid>
            <Grid item xs={9} md={11}>
              <Stack>
                <Paper 
                  elevation={2}
                  sx={{ 
                    width: "fit-content",
                    borderRadius: "16px",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                    }
                  }}
                >
                  <Typography 
                    sx={{ 
                      padding: "0.9rem",
                      color: "white",
                      fontWeight: 400
                    }}
                  >
                    {message.content}
                  </Typography>
                </Paper>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    marginLeft: "0.5rem",
                    marginTop: "0.2rem",
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: "0.75rem"
                  }}
                >
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        ))}
        {/* We don't need the divRef element anymore since we're using a different scrolling method */}
      </Box>

      {/* Fixed Input Area */}
      <Box 
        sx={{ 
          position: "sticky", 
          bottom: 0,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          backgroundColor: "rgba(10,16,32,0.9)",
          backdropFilter: "blur(10px)",
          p: 3,
          pt: 2,
          zIndex: 10 // Ensure it stays on top
        }}
      >
        <Paper
          sx={{
            p: "4px 6px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            borderRadius: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.05)", // Dark theme input
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}
        >
          <InputBase
            sx={{ 
              ml: 1.5, 
              flex: 1, 
              width: "100%",
              color: "white", // Text color
              fontSize: "0.95rem",
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(255, 255, 255, 0.5)",
                opacity: 1
              }
            }}
            onChange={(event) => setMessage(event.target.value)}
            value={message}
            placeholder="Type a message..."
            onKeyDown={async (event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                await handleCreateMessage();
              }
            }}
          />
          <Divider sx={{ 
            height: 28, 
            m: 0.5, 
            backgroundColor: "rgba(255,255,255,0.1)" 
          }} orientation="vertical" />
          <IconButton
            onClick={handleCreateMessage}
            color="primary"
            sx={{ 
              p: "10px",
              mr: 0.5
            }}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </Stack>
  );
};

export default Chat;