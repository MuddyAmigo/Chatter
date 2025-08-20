import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Branding from "./Branding";
import MobileNavigation from "./mobile/MobileNavigation";
import MobileBranding from "./mobile/MobileBranding";
import Navigation from "./Navigation";
import Settings from "./Settings";
import { useReactiveVar } from "@apollo/client";
import { authenticatedVar } from "../../constants/authenticated";
import { Page } from "../../interfaces/page.interface";

const pages: Page[] = [
  { title: "Home", path: "/home" },
];

const unauthenticatedPages: Page[] = [
  { title: "Login", path: "/login" },
  { title: "Signup", path: "/signup" },
];

const Header = () => {
  const authenticated = useReactiveVar(authenticatedVar);

  return (
    <AppBar
      position="fixed"                       // <-- changed to fixed
      elevation={0}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        position: "fixed",
        background: "linear-gradient(135deg, #03060dff 0%, #1e242fff 100%)",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        boxShadow:
          "0 8px 32px rgba(14, 42, 120, 0.55), 0 20px 80px rgba(14, 42, 120, 0.30)",
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -10,
          height: 28,
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(30,60,180,0.55), rgba(31,38,135,0.25) 60%, transparent 80%)",
          filter: "blur(24px)",
          zIndex: -1,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />
          <MobileNavigation pages={(authenticated ? pages : unauthenticatedPages).map(page => page.title)} />
          <MobileBranding />
          <Navigation pages={authenticated ? pages : unauthenticatedPages} />
          {authenticated && <Settings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;