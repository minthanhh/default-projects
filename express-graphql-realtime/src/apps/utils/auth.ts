import { SignOptions, sign } from 'jsonwebtoken'
import { User } from '../../shared/entities/user.entity'

const options: SignOptions = {
    expiresIn: process.env.PRIVATE_EXPIRES_IN
}

export const createToken = (user: User) =>
    sign(
        {
            userId: user.id
        },
        process.env.PRIVATE_JWT_SECRET,
        options
    )
