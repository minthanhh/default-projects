import { Injectable } from '../../shared/decorators/controllers.decorator';
import { AuthRepository } from '../../shared/repositories/auth.repository';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
   // constructor(private readonly authRepository: AuthRepository) {}

   public login() {
      return 'loginsuccess';
   }
}
