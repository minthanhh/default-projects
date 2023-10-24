import { useEffect, useState, useContext } from 'react';
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import {
   GET_MESSAGE_BY_USER,
   NEW_MESSAGE_SUBSCRIPTION,
   SEND_MESSAGE,
} from '../../apollo/queries';
import Login from '../auth/Login';
import { AuthContext } from '../../context/auth.context';

interface Message {
   senderId: number;
   id?: number;
   receiverId?: number;
   content: string;
}

const Home = () => {
   const { user } = useContext(AuthContext);
   const [getMessagesQuery] = useLazyQuery(GET_MESSAGE_BY_USER);
   const { data } = useSubscription(NEW_MESSAGE_SUBSCRIPTION);
   const [sendMessage] = useMutation(SEND_MESSAGE);
   const [messages, setMessages] = useState<Message[]>([]);
   const [content, setContent] = useState('');

   useEffect(() => {
      if (data) {
         const message = data.newMessage;
         setMessages((prev) => [...prev, message]);
      }
   }, [data, user?.id]);

   useEffect(() => {
      async function getMessages() {
         const { data } = await getMessagesQuery({
            variables: {
               receiverId: 2,
            },
         });

         setMessages(data.messageByUser);
      }

      getMessages();
   }, [getMessagesQuery]);

   const handleSubmitSendMessage = async (
      e: React.FormEvent<HTMLFormElement>
   ) => {
      e.preventDefault();

      await sendMessage({
         variables: {
            receiverId: 2,
            content,
         },
      });
      setContent('');
   };

   return (
      <div className="w-full flex justify-center h-screen">
         <Login />

         <div className="w-3/5 h-full flex flex-col p-2">
            <div className="flex flex-col gap-2">
               {messages?.map((message) => (
                  <span
                     key={message.id}
                     className={`flex items-center w-max ${
                        message.senderId === user?.id
                           ? 'bg-white text-black py-2 px-4 rounded-xl ml-auto'
                           : 'py-2 px-4 bg-slate-700 rounded-xl mr-auto'
                     }`}
                  >
                     {message.content}
                  </span>
               ))}
            </div>

            <form onSubmit={handleSubmitSendMessage} className="mt-auto">
               <div className="flex items-center gap-2">
                  <input
                     type="text"
                     className="py-2 flex-1 px-4 outline-none rounded-md"
                     placeholder="Aa"
                     onChange={(e) => setContent(e.target.value)}
                     value={content}
                  />
                  <button
                     className="py-2 px=4 rounded-md bg-slate-400"
                     type="submit"
                  >
                     Send
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Home;
