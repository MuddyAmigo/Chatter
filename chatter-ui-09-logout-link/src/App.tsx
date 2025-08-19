import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client";
import Header from "./components/header/Header";
import Snackbar from "./components/snackbar/SnackBar";
import React from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  // keep simple responsive padding top to match header height
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const headerHeight = isSmall ? 56 : 64;

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        {/* Push app content below the fixed header to avoid overlap and to prevent page scroll moving the header */}
        <div
          style={{
            minHeight: "100vh",
            width: "100vw",
            background: "#0a1020",
            paddingTop: headerHeight, // <-- ensures header stays fixed and content starts below it
            boxSizing: "border-box",
            overflow: "hidden", // prevent overall page scrolling
          }}
        >
          <RouterProvider router={router} />
        </div>
        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;