import { Module } from '../../shared/decorators/controllers.decorator';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
   services: [AuthService],
   controllers: [AuthController],
})
export class AppModule {}
