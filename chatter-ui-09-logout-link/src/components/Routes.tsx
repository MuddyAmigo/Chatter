import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./home/Home";
import Guard from "./auth/Guard";
import LandingPage from "./landing/landing";
import ChatLayout from "./chat/ChatLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: (
      <Guard>
        <Home />
      </Guard>
    ),
  },
  {
  path: "/chats/:_id",
  element: (
    <Guard>
      <ChatLayout />
    </Guard>
  ),
},
]);

export default router;