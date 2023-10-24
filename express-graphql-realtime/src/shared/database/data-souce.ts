import { DataSource } from 'typeorm'
import { Session, User, Message } from '../entities'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: true,
    entities: [User, Session, Message],
    subscribers: []
    // migrations: [`src/shared/database/migrations/*.{ts,js}`]
})
