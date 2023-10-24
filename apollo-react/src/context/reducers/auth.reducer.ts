import { IUser } from '../../types';
import { InitialState } from '../auth.provider';

interface Payload {
   type: string;
   payload: IUser | null;
}
export function authReducer(state: InitialState, action: Payload) {
   switch (action.type) {
      case 'LOGIN':
         return { ...state, user: action.payload };
      case 'LOGOUT':
         return { ...state, user: null };
      default:
         return state;
   }
}
