import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import type { User } from "../gql/graphql";

const getMeDocument = graphql(`
  query Me {
    me {
      _id
      email
    }
  }
`);


const useGetMe = () => {
  return useQuery<{ me: User }>(getMeDocument, {
    errorPolicy: "ignore", // <--- Add this line
  });
}

export { useGetMe };