import { verify } from 'jsonwebtoken'
import { AppDataSource } from '../../shared/database/data-souce'
import { Message, User } from '../../shared/entities'
import { LoginMutation, RegisterMutation } from './mutations'
import { User as UserType } from '../generated/schemas'
import { withFilter, PubSub } from 'graphql-subscriptions'

const messageRepository = AppDataSource.getRepository(Message)
const userRepository = AppDataSource.getRepository(User)

export async function isAuthenticated(token: string): Promise<UserType> {
    try {
        const { id } = verify(token.split(' ')[1], process.env.PRIVATE_JWT_SECRET) as { id: number }

        return await userRepository.findOneBy({ id })
    } catch (error) {
        throw new Error('Unauthorize')
    }
}

const pubsub = new PubSub()

export const resolvers = {
    Mutation: {
        register: RegisterMutation.register.bind(RegisterMutation),
        login: LoginMutation.login.bind(LoginMutation),
        sendMessage: async (_, { receiverId, content }, context: any) => {
            const user = await isAuthenticated(context.token)
            if (!user) throw new Error('Yout have to log in!')

            const message = messageRepository.create({
                content,
                receiverId,
                user
            })

            pubsub.publish('NEW_MESSAGE', {
                newMessage: message
            })

            await message.save()

            return message
        }
    },
    Query: {
        getUser: async (_: any, _args: any, { token }: any): Promise<UserType> => {
            const user = await isAuthenticated(token)
            if (!user) throw new Error('Yout have to log in!')

            const userAndMessage = await userRepository.findOne({
                where: {
                    id: user.id
                },
                relations: {
                    messages: true
                }
            })

            return userAndMessage
        },
        messageByUser: async (_, { receiverId }, { token }: any) => {
            const user = await isAuthenticated(token)
            if (!user) throw new Error('Yout have to log in!')

            const messages = await messageRepository.find({
                where: [
                    { senderId: user.id, receiverId },
                    { senderId: receiverId, receiverId: user.id }
                ]
            })

            return messages
        }
    },
    Subscription: {
        newMessage: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(['NEW_MESSAGE']),
                (payload, variables) => {
                    console.log(variables, payload)
                    return true
                    // const isAuthUserSenderOrReceiver =
                    //     newMessage.receiverId === receiverId && newMessage.senderId === userId
                    // const isUserSenderOrReceiver =
                    //     newMessage.receiverId === userId && newMessage.senderId === receiverId
                    // return isAuthUserSenderOrReceiver || isUserSenderOrReceiver
                }
            )
        }
    }
}
