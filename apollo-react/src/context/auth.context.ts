// import jwtDecode from 'jwt-decode';
import { IUser } from '../types';
import { createContext } from 'react';

interface ContextState {
   user: IUser | null;
   login: ({ user }: { user: IUser }) => void;
   logout: () => void;
}

export const AuthContext = createContext<ContextState>({
   user: null,
   login: () => {},
   logout: () => {},
});
