import client from "../constants/apollo-client";
import { API_URL } from "../constants/urls";

const useLogout = () => {
  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      // Suppress Apollo errors caused by unauthorized queries after logout
      await client.resetStore().catch(() => {});
    } catch (error) {
      // Optionally log or handle other errors
    }
  };
  return { logout };
};

export { useLogout };