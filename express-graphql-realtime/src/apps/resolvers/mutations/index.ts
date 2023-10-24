import { AppDataSource } from '../../../shared/database/data-souce'
import { User } from '../../../shared/entities/user.entity'
import { AuthService } from '../../../shared/services/auth.service'
import { Register } from './register.mutation'
import { Login } from './login.mutation'

const userRepository = AppDataSource.getRepository(User)
const authService = new AuthService()
export const RegisterMutation = new Register(userRepository, authService)
export const LoginMutation = new Login(userRepository, authService)
