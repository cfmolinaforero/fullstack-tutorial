import {
   ApolloClient,
   NormalizedCacheObject,
   ApolloProvider,
} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import injectStyles from './styles';
import { cache } from './cache';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
   uri: 'http://localhost:4000/',
   cache,
   headers: {
      authorization: localStorage.getItem('token') || '',
   }
});

cache.writeData({
   data: {
      isLoggedIn: !!localStorage.getItem('token'),
      cartItems: [],
   }
})

injectStyles();
ReactDOM.render(
   <ApolloProvider client={client}>
      <Pages></Pages>
   </ApolloProvider>,
   document.getElementById('root')
);
