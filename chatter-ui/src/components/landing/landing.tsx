import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container, Grid, Card, CardContent, Chip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ForumIcon from "@mui/icons-material/Forum";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StarIcon from "@mui/icons-material/Star";
import router from "../Routes";
import ParticleBackround from "./RandomParticle"

const LandingPage: React.FC = () => {

  const [currentScreen, setCurrentScreen] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [typingText, setTypingText] = useState("");
  const fullText = "Experience the future of communication...";

  

  // Typing animation
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypingText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const phoneScreens = [
    {
      title: "Chat List",
      description: "Beautiful chat interface with real-time conversations",
      bgGradient: "linear-gradient(135deg, #141b2d 0%, #1e2746 100%)",
      features: ["Real-time messaging", "Dark mode", "Group chats"]
    },
    {
      title: "Private Messages", 
      description: "End-to-end encrypted messaging for complete privacy",
      bgGradient: "linear-gradient(135deg, #1e2746 0%, #232e4a 100%)",
      features: ["End-to-end encryption", "File sharing", "Voice messages"]
    },
    {
      title: "Group Chats",
      description: "Connect with multiple people in secure group conversations", 
      bgGradient: "linear-gradient(135deg, #232e4a 0%, #2a3660 100%)",
      features: ["Admin controls", "Media sharing", "Custom themes"]
    }
  ];

  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: "#2196f3" }} />,
      title: "Secure",
      description: "End-to-end encrypted conversations",
      stats: "256-bit encryption"
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: "#2196f3" }} />,
      title: "Fast",
      description: "Instant real-time messaging",
      stats: "<50ms latency"
    },
    {
      icon: <ChatBubbleOutlineIcon sx={{ fontSize: 40, color: "#2196f3" }} />,
      title: "Modern",
      description: "Sleek, responsive dark interface",
      stats: "Mobile first"
    }
  ];

  const testimonials = [
    { name: "Sarah", rating: 5, text: "Amazing chat experience!" },
    { name: "Mike", rating: 5, text: "Super fast and secure." },
    { name: "Emma", rating: 5, text: "Love the dark theme!" }
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0a1020",
        color: "white",
        overflow: "hidden",
        position: "relative"
      }}
    >
        <ParticleBackround />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ pt: 8, pb: 6, textAlign: "left" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <motion.div
                transition={{ duration: 0.6 }}
              >
                <ForumIcon sx={{ 
                  fontSize: 48, 
                  color: "#2196f3", 
                  mr: 2,
                  filter: "drop-shadow(0 0 20px #1976d2aa)"
                }} />
              </motion.div>
              <Typography
                variant="h3"
                fontWeight={800}
                sx={{
                  color: "#fff",
                  letterSpacing: ".2rem",
                  textShadow: "0 0 16px #1976d2aa",
                  fontFamily: "monospace",
                }}
              >
                CHATTER
              </Typography>
            </Box>

            <Typography
              variant="h2"
              fontWeight={900}
              sx={{
                mb: 3,
                fontSize: { xs: "2.5rem", md: "4rem" },
                lineHeight: 1.1,
                color: "#fff"
              }}
            >
              Where Conversations<br />
              Meet<br />
              <motion.span
                style={{ 
                  color: "#2196f3",
                  textShadow: "0 0 25px #1976d2aa"
                }}
                animate={{ 
                  textShadow: [
                    "0 0 25px #1976d2aa",
                    "0 0 35px #1976d2ff",
                    "0 0 25px #1976d2aa"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Beautiful UI
              </motion.span>
            </Typography>

            {/* Typing animation */}
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                color: "#b0c7e8",
                maxWidth: 600,
                fontWeight: 400,
                letterSpacing: ".05rem",
                minHeight: "28px"
              }}
            >
              {typingText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ color: "#2196f3" }}
              >
                |
              </motion.span>
            </Typography>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => router.navigate("/signup")}
                  sx={{
                    bgcolor: "#2196f3",
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    textTransform: "none",
                    boxShadow: "0 8px 32px rgba(33,150,243,0.3)",
                    "&:hover": {
                      bgcolor: "#1976d2",
                      boxShadow: "0 12px 40px rgba(33,150,243,0.4)"
                    }
                  }}
                >
                  Get Started
                </Button>
              </motion.div>

              

             
            </Box>
          </Box>
        </motion.div>

        {/* Interactive Phone Mockups Section */}
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={4}>
            {phoneScreens.map((screen, index) => (
              <Grid item xs={12} md={4} key={index}>
                 <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ 
                    opacity: 1, // Remove: currentScreen === index ? 1 : 0.6,
                    y: 0,
                    scale: 1 // Remove: currentScreen === index ? 1.02 : 1
                  }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ 
                    scale: 1.04,
                    boxShadow: "0 0 32px 8px rgba(33, 150, 243, 0.45)"
                  }}
                  onClick={() => setCurrentScreen(index)}
                  style={{ cursor: "pointer" }}
                >
                  <Card
                    sx={{
                      background: screen.bgGradient,
                      borderRadius: 4,
                      minHeight: 480,
                      position: "relative",
                      overflow: "hidden",
                      border: currentScreen === index 
                        ? "2px solid rgba(33,150,243,0.6)" 
                        : "1px solid rgba(33,150,243,0.2)", // Keep click functionality
                      boxShadow: currentScreen === index 
                        ? "0 0 24px 6px rgba(33, 150, 243, 0.35)"
                        : "0 0 16px 4px rgba(33, 150, 243, 0.25)", // Keep click functionality
                      transition: "all 0.5s ease"
                    }}
                  >
                    <CardContent sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <Box>
                        <Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: "#90caf9" }}>
                          {screen.title}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#b0c7e8", mb: 2 }}>
                          {screen.description}
                        </Typography>
                        
                        {/* Feature tags */}
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                          {screen.features.map((feature, i) => (
                            <Chip
                              key={i}
                              label={feature}
                              size="small"
                              sx={{
                                bgcolor: "rgba(144,202,249,0.2)",
                                color: "#90caf9",
                                fontSize: "0.75rem"
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                      
                      {/* Mockup phone screen content */}
                      <Box
                        sx={{
                          background: "rgba(30,39,70,0.6)",
                          borderRadius: 2,
                          p: 2,
                          backdropFilter: "blur(10px)"
                        }}
                      >
                        <AnimatePresence>
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: 1,
                                  p: 1,
                                  borderRadius: 2,
                                  bgcolor: "#1e2746",
                                  "&:hover": { bgcolor: "#22305a" },
                                  cursor: "pointer"
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    bgcolor: "#232e4a",
                                    mr: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#90caf9",
                                    boxShadow: "0 0 8px #1976d2aa"
                                  }}
                                >
                                  👤
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                  <motion.div
                                    style={{
                                      height: 8,
                                      background: "rgba(144,202,249,0.6)",
                                      borderRadius: 4,
                                      marginBottom: 4,
                                      width: "60%"
                                    }}
                                    animate={{ width: ["60%", "80%", "60%"] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  />
                                  <Box
                                    sx={{
                                      height: 6,
                                      background: "rgba(176,199,232,0.4)",
                                      borderRadius: 4,
                                      width: "80%"
                                    }}
                                  />
                                </Box>
                              </Box>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Screen indicators */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 1 }}>
            {phoneScreens.map((_, index) => (
              <motion.div
                key={index}
                onClick={() => setCurrentScreen(index)}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: currentScreen === index ? "#2196f3" : "rgba(33,150,243,0.3)",
                  cursor: "pointer"
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </Box>
        </Box>

        {/* Enhanced Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Typography variant="h4" fontWeight={700} sx={{ textAlign: "center", mb: 6, color: "#90caf9" }}>
            Why Choose Chatter?
          </Typography>
          
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  whileHover={{ y: -10 }}
                  onHoverStart={() => setHoveredFeature(index)}
                  onHoverEnd={() => setHoveredFeature(null)}
                >
                  <Card
                    sx={{
                      background: hoveredFeature === index 
                        ? "rgba(30,39,70,0.9)" 
                        : "rgba(20,27,45,0.8)",
                      borderRadius: 4,
                      p: 3,
                      textAlign: "center",
                      border: "1px solid rgba(33,150,243,0.2)",
                      backdropFilter: "blur(10px)",
                      boxShadow: hoveredFeature === index
                        ? "0 0 32px 8px rgba(33, 150, 243, 0.3)"
                        : "0 0 16px 4px rgba(33, 150, 243, 0.15)",
                      transition: "all 0.3s ease",
                      minHeight: 200,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  >
                    <motion.div
                      transition={{ duration: 0.6 }}
                    >
                      <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    </motion.div>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: "#90caf9" }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#b0c7e8", mb: 2 }}>
                      {feature.description}
                    </Typography>
                    <Chip 
                      label={feature.stats}
                      size="small"
                      sx={{ 
                        bgcolor: "rgba(33,150,243,0.2)", 
                        color: "#2196f3",
                        fontWeight: 600
                      }} 
                    />
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Typography variant="h4" fontWeight={700} sx={{ textAlign: "center", mb: 4, color: "#90caf9" }}>
            What Users Say
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card
                    sx={{
                      background: "rgba(20,27,45,0.6)",
                      borderRadius: 3,
                      p: 3,
                      textAlign: "center",
                      border: "1px solid rgba(33,150,243,0.1)",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} sx={{ color: "#ffd700", fontSize: 16 }} />
                      ))}
                    </Box>
                    <Typography variant="body2" sx={{ color: "#b0c7e8", mb: 2, fontStyle: "italic" }}>
                      "{testimonial.text}"
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: "#90caf9", fontWeight: 600 }}>
                      - {testimonial.name}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Call to Action with scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ textAlign: "center", marginBottom: 32 }}
        >
          <Typography variant="h5" fontWeight={600} sx={{ color: "#90caf9", mb: 3 }}>
            Ready to get started?
          </Typography>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <KeyboardArrowDownIcon sx={{ color: "#2196f3", fontSize: 32 }} />
          </motion.div>
        </motion.div>

        {/* Footer */}
        <Box sx={{ textAlign: "center", pb: 4 }}>
          <Typography variant="body2" sx={{ color: "#7b7b7b" }}>
            © {new Date().getFullYear()} Chatter. Stay connected with privacy.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;