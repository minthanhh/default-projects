import { Application } from 'express'

export class Routes {
    private readonly baseUrl = '/api/v1'
    private _app: Application

    /**
     *
     */
    constructor(app: Application) {
        this._app = app
        this.defaultRoutingPath()
    }

    private defaultRoutingPath() {
        this._app.use(this.baseUrl)
    }
}
