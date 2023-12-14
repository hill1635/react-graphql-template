import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import gql from 'graphql-tag';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
  cache: new InMemoryCache()
});

// const { data } = await client.query({
//     query: gql`
//     query {
//         User {
//           name
//           email
//         }
//       }
      
//     `
//   })
//   console.log(data);

root.render(
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
);

reportWebVitals(console.log);