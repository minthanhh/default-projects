import { genSalt, compare, hash } from 'bcrypt'

export class AuthService {
    private readonly saltRounds = 10

    public genSalt() {
        return genSalt(this.saltRounds)
    }

    public async hash(password: string) {
        return await hash(password, await this.genSalt())
    }

    public async compare(password: string, hashedPassword: string) {
        return await compare(password, hashedPassword)
    }
}
