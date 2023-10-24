import 'reflect-metadata'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import express, { Application as ExApplication } from 'express'
import { ApolloServer } from '@apollo/server'
import { Server as HttpServer, createServer } from 'http'
import { WebSocketServer, Server as WsServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { Disposable } from 'graphql-ws'

import { Middlewares } from './middlewares'
import { Database } from './setupDatabase'
import { schema } from './apps/resolvers/schema'

/**
 *  @function listen() this function run the Application, receives a parameter called PORT type string.
 */
export class Application {
    private app: ExApplication
    private httpServer: HttpServer
    private apolloServer: ApolloServer
    private wsServer: WsServer
    private serverCleanup: Disposable
    static instance: Application

    constructor() {
        this.app = express()
        this.httpServer = createServer(this.app)
    }

    private initDatabase() {
        return new Database()
    }

    private async initMiddlewares() {
        await this.apolloServer.start()
        new Middlewares(this.app, this.apolloServer)
    }

    private initApolloServer() {
        const serverCleanup = this.serverCleanup

        this.apolloServer = new ApolloServer({
            schema,
            plugins: [
                ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
                ApolloServerPluginLandingPageLocalDefault(),
                {
                    async serverWillStart() {
                        return {
                            async drainServer() {
                                await serverCleanup.dispose()
                            }
                        }
                    }
                }
            ]
        })
    }

    private initWsServer() {
        this.wsServer = new WebSocketServer({ server: this.httpServer, path: '/graphql' })
        this.serverCleanup = useServer({ schema }, this.wsServer)
    }

    private initHttpServer(port: number) {
        return new Promise<void>((rs) => this.httpServer.listen({ port }, rs))
    }

    public async listen(port: number) {
        this.initDatabase()
        this.initWsServer()
        this.initApolloServer()
        await this.initHttpServer(port)
        await this.initMiddlewares()
        return this.app
    }

    static create() {
        if (!Application.instance) Application.instance = new Application()
        return Application.instance
    }
}
