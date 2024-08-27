import { ApolloClient, InMemoryCache } from "@apollo/client";

const apollo = new ApolloClient({
  uri: "https://api.openbeta.io/",
  cache: new InMemoryCache(),
});

export default apollo;
