import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { API_URL } from "./urls";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";

const logoutLink = onError((error) => {
  const is401 = error.graphQLErrors?.some(
    (err) => {
      const originalError = err.extensions?.originalError;
      return typeof originalError === "object" && originalError !== null && "statusCode" in originalError && (originalError as { statusCode?: number }).statusCode === 401;
    }
  );
  if (is401 && !excludedRoutes.includes(window.location.pathname)) {
    onLogout();
  }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql`, credentials: "include" });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
});

export default client;