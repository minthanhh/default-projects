import { gql } from '@apollo/client';

export const GET_MESSAGE_BY_USER = gql`
   query MessageByUser($receiverId: Int!) {
      messageByUser(receiverId: $receiverId) {
         content
         id
         receiverId
         senderId
      }
   }
`;

export const NEW_MESSAGE_SUBSCRIPTION = gql`
   subscription NewMessage {
      newMessage {
         id
         content
         receiverId
         senderId
      }
   }
`;

export const LOGIN = gql`
   mutation Mutation($loginDto: LoginDto!) {
      login(loginDto: $loginDto) {
         message
         success
         code
         user {
            id
            username
            email
            password
            accessToken
         }
      }
   }
`;

export const SEND_MESSAGE = gql`
   mutation SendMessage($receiverId: Int!, $content: String!) {
      sendMessage(receiverId: $receiverId, content: $content) {
         content
         id
         receiverId
         senderId
      }
   }
`;
