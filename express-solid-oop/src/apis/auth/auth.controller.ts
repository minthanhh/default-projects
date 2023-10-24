// import Controller from '../../shared/decorators/controllers.decorator';
// import { Get } from '../../shared/decorators/handlers.decorator';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { Controller, Get } from '../../shared/decorators/controllers.decorator';

// @Controller('/api/v1/auth')

@Controller('/api')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Get()
   login(req: any, res: any) {
      return res.send('Message');
   }
}
