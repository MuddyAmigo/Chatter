import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { API_URL, WS_URL } from "./urls";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";


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
const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${WS_URL}/graphql`,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(splitLink),
});

export default client;