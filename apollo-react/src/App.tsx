import Home from './pages/home/home';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';
import { AuthProvider } from './context/auth.provider';

function App() {
   return (
      <AuthProvider>
         <ApolloProvider client={client}>
            <Home />
         </ApolloProvider>
      </AuthProvider>
   );
}

export default App;
