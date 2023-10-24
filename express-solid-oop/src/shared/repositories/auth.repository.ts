import { IAuthRepository } from './interfaces/auth.interface';

export class AuthRepository implements IAuthRepository {
   /**
    * @function login
    */
   constructor() {}

   login() {
      return 'Login Successfully';
   }
}
