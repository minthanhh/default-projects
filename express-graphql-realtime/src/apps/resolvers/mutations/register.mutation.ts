import { MutationRegisterArgs, RegisterRespone, User as TypeUser } from '../../generated/schemas'
import { Repository } from 'typeorm'
import { AuthService } from '../../../shared/services/auth.service'
import { User } from '../../../shared/entities/user.entity'

export class Register {
    constructor(private readonly userRepository: Repository<User>, private readonly authService: AuthService) {}

    async register(_: any, { registerDto }: MutationRegisterArgs): Promise<RegisterRespone> {
        const { email, password } = registerDto

        const username = registerDto.username.toLowerCase().trim()

        const foundUsername = await this.userRepository.findOneBy({ username })
        if (foundUsername) throw new Error('Username existing!')

        const foundEmail = await this.userRepository.findOneBy({ email })
        if (foundEmail) throw new Error('Email existing!')

        const hashedPassword = await this.authService.hash(password)

        const newUser: TypeUser = {
            email: email,
            password: hashedPassword,
            username
        }

        await this.userRepository.save(newUser)

        return {
            code: 200,
            success: true,
            message: 'Register successfully',
            user: newUser
        }
    }
}
