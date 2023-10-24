import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity({
    name: 'messages'
})
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column()
    senderId: number

    @Column()
    receiverId: number

    @ManyToOne(() => User, (user) => user.messages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'senderId', referencedColumnName: 'id' })
    user: User
}
