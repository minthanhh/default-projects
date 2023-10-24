import { Repository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import { LoginRespone, MutationLoginArgs } from '../../generated/schemas'
import { User } from '../../../shared/entities/user.entity'
import { AuthService } from '../../../shared/services/auth.service'

export class Login {
    constructor(private readonly userRepository: Repository<User>, private readonly authService: AuthService) {}

    async login(_: any, { loginDto }: MutationLoginArgs, context): Promise<LoginRespone> {
        const { username, password } = loginDto

        const userExists = await this.userRepository.findOneBy({ username })
        if (!userExists) throw new Error('User does not existing!')

        const match = this.authService.compare(password, userExists.password)
        if (!match) throw new Error('Password does not match!')

        const token = sign({ ...userExists }, process.env.PRIVATE_JWT_SECRET, {
            expiresIn: '24h'
        })

        return {
            code: 200,
            success: true,
            message: 'Register successfully',
            user: {
                ...userExists,
                accessToken: token
            }
        }
    }
}
