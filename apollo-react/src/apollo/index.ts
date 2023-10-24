import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
   uri: 'http://localhost:4080/graphql',
});

const wsLink = new GraphQLWsLink(
   createClient({
      url: 'ws://localhost:4080/graphql',
      connectionParams: {
         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
   })
);

const authLink = setContext((_, { headers }) => {
   const token = localStorage.getItem('accessToken');
   return {
      headers: {
         ...headers,
         authorization: token ? `Bearer ${token}` : '',
      },
   };
});

const splitLink = split(
   ({ query }) => {
      const definition = getMainDefinition(query);
      return (
         definition.kind === 'OperationDefinition' &&
         definition.operation === 'subscription'
      );
   },
   wsLink,
   authLink.concat(httpLink)
);

export const client = new ApolloClient({
   link: splitLink,
   cache: new InMemoryCache(),
});
