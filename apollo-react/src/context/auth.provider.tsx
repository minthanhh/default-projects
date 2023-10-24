import { useReducer } from 'react';
import { authReducer } from './reducers/auth.reducer';
import { IUser } from '../types';
import { AuthContext } from './auth.context';
import jwtDecode from 'jwt-decode';

export interface InitialState {
   user: IUser | null;
}

const initialState: InitialState = {
   user: null,
};

interface Decoded extends IUser {
   exp: number;
}

if (localStorage.getItem('accessToken')) {
   const decodedToken: Decoded = jwtDecode(
      localStorage.getItem('accessToken')!
   );

   if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('accessToken');
   } else {
      initialState.user = {
         email: decodedToken.email,
         username: decodedToken.username,
         id: decodedToken.id,
      };
   }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [state, dispatch] = useReducer(authReducer, initialState);

   const login = ({ user }: { user: IUser }) => {
      localStorage.setItem('accessToken', user?.accessToken || '');
      dispatch({ type: 'LOGIN', payload: user });
   };

   const logout = () => {
      localStorage.removeItem('accessToken');
      dispatch({ type: 'LOGOUT', payload: null });
   };

   return (
      <AuthContext.Provider value={{ user: state.user, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};
