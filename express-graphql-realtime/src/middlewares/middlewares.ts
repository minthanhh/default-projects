import { Application } from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { TypeormStore } from 'connect-typeorm'
import compression from 'compression'

/**
 * @description All middlewares will be imported here.
 */
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'

import { Session } from '../shared/entities/session.entity'
import { AppDataSource } from '../shared/database/data-souce'

export class Middlewares {
    private _app: Application
    private _apolloServer: ApolloServer
    /**
     * @param app Receive express app
     * @param apolloServer Receive apollo server to apply expressMiddleware
     */
    constructor(app: Application, apolloServer: ApolloServer) {
        this._app = app
        this._apolloServer = apolloServer

        this.sessionStoreMiddelwares()
        this.securityMiddlewares()
        this.apolloMiddlewares()
    }

    private securityMiddlewares() {
        this._app.use(cors())
        this._app.use(bodyParser.json())
        this._app.use(
            compression({
                level: 6,
                threshold: 100 * 1000
            })
        )
    }

    private sessionStoreMiddelwares() {
        this._app.use(
            session({
                resave: false,
                saveUninitialized: false,
                store: new TypeormStore({
                    cleanupLimit: 2,
                    limitSubquery: true, // If using MariaDB.
                    ttl: 86400
                }).connect(AppDataSource.getRepository(Session)),
                secret: 'keyboard cat'
            })
        )
    }

    private apolloMiddlewares() {
        this._app.use(
            '/graphql',
            expressMiddleware(this._apolloServer, {
                context: async ({ req }) => ({ token: req.headers.authorization })
            })
        )
    }
}
