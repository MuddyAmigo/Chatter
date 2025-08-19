import { Stack, Button, TextField, Typography, Box, Avatar, useTheme, useMediaQuery, Link, Divider } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React from "react";
// FIX: correct import name
import ParticleBackground from "../landing/RandomParticle";

interface AuthProps {
  submitLabel: string;
  onSubmit: (credential: { email: string; password: string }) => Promise<void>;
  children?: React.ReactNode;
  error?: string;
  fieldErrors?: { email?: string; password?: string; general?: string };
}

const Auth: React.FC<AuthProps> = ({ submitLabel, onSubmit, error, fieldErrors }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a1020 0%, #1a2740 50%, #0f172a 100%)",
        px: 2,
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Particle background behind content */}
      <ParticleBackground />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: isSmall ? 2 : 5,
          width: "100%",
            maxWidth: 420,
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(33,150,243,0.25)",
          background: "rgba(20,27,45,0.92)",
          border: "1px solid rgba(33,150,243,0.25)",
          backdropFilter: "blur(12px)"
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Avatar
            sx={{
              bgcolor: "#2196f3",
              width: 60,
              height: 60,
              boxShadow: "0 0 18px rgba(33,150,243,0.5)"
            }}
          >
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography
            variant="h5"
            component="h1"
            fontWeight={700}
            sx={{
              letterSpacing: ".05rem",
              color: "#90caf9",
              textShadow: "0 0 12px rgba(33,150,243,0.4)"
            }}
          >
            {submitLabel}
          </Typography>

            {error && (
            <Box
              sx={{
                width: "100%",
                bgcolor: "error.main",
                color: "error.contrastText",
                p: 1,
                borderRadius: 1,
                fontSize: 14,
                textAlign: "center"
              }}
            >
              {error}
            </Box>
          )}

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!fieldErrors?.email}
            helperText={fieldErrors?.email}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(30,39,70,0.55)",
                backdropFilter: "blur(6px)",
                "& fieldset": { borderColor: "rgba(144,202,249,0.25)" },
                "&:hover fieldset": { borderColor: "#2196f3" },
                "&.Mui-focused fieldset": { borderColor: "#2196f3" }
              },
              "& .MuiInputLabel-root": { color: "#90caf9" },
              "& .MuiOutlinedInput-input": { color: "#fff" }
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!fieldErrors?.password}
            helperText={fieldErrors?.password}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(30,39,70,0.55)",
                backdropFilter: "blur(6px)",
                "& fieldset": { borderColor: "rgba(144,202,249,0.25)" },
                "&:hover fieldset": { borderColor: "#2196f3" },
                "&.Mui-focused fieldset": { borderColor: "#2196f3" }
              },
              "& .MuiInputLabel-root": { color: "#90caf9" },
              "& .MuiOutlinedInput-input": { color: "#fff" }
            }}
          />

          {(fieldErrors?.general || (!fieldErrors && error)) && (
            <Box
              sx={{
                width: "100%",
                bgcolor: "error.main",
                color: "error.contrastText",
                p: 1,
                borderRadius: 1,
                fontSize: 13,
                textAlign: "center"
              }}
            >
              {fieldErrors?.general || error}
            </Box>
          )}

          <Box width="100%" textAlign="right">
            <Link
              href="#"
              underline="hover"
              sx={{
                color: "#2196f3",
                fontSize: 14,
                "&:hover": { color: "#90caf9" }
              }}
            >
              Forgot password?
            </Link>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 1,
              fontWeight: 600,
              letterSpacing: 1,
              bgcolor: "#2196f3",
              boxShadow: "0 8px 28px rgba(33,150,243,0.35)",
              "&:hover": {
                bgcolor: "#1976d2",
                boxShadow: "0 10px 38px rgba(33,150,243,0.5)"
              }
            }}
            onClick={() => onSubmit({ email, password })}
          >
            {submitLabel}
          </Button>

          <Divider
            sx={{
              width: "100%",
              my: 1,
              borderColor: "rgba(255,255,255,0.08)",
              color: "#5f7290",
              "&::before,&::after": { borderColor: "rgba(255,255,255,0.08)" }
            }}
          >
            or
          </Divider>

          <Button
            variant="outlined"
            fullWidth
            size="large"
            sx={{
              fontWeight: 600,
              letterSpacing: 1,
              borderColor: "#2196f3",
              color: "#90caf9",
              "&:hover": {
                borderColor: "#1976d2",
                bgcolor: "rgba(33,150,243,0.08)"
              }
            }}
            onClick={() =>
              window.location.assign(
                submitLabel === "Login" ? "/signup" : "/login"
              )
            }
          >
            {submitLabel === "Login" ? "Sign up" : "Login"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Auth;