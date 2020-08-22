import React from 'react';
import { gql, useMutation, ApolloClient, useApolloClient } from '@apollo/client';
import * as LoginTypes from './__generated__/login'
import { LoginForm } from '../components';

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export default function Login() {
  const client: ApolloClient<any> = useApolloClient();
  const [login, { data }] = useMutation<LoginTypes.login, LoginTypes.loginVariables>(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem('token', login as string);
      
    }
  });
  return <LoginForm login={login} />;
}