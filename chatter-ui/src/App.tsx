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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const headerHeight = isSmall ? 56 : 64;

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <div
          style={{
            minHeight: "100vh",
            width: "100vw",
            background: "#0a1020",
            paddingTop: headerHeight,
            boxSizing: "border-box",
            overflow: "hidden",
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