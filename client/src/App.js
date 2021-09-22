import "./App.css";
import Products from "./Components/Products";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});
function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Products />
      </ApolloProvider>
    </div>
  );
}

export default App;
