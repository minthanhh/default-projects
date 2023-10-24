import { AppDataSource } from './shared/database/data-souce'

export class Database {
    static instance: Database
    /**
     *  @function initialize Initialize Typeorm and connected database
     */
    constructor() {
        this.initDataSource()
    }

    private initDataSource() {
        AppDataSource.initialize()
            .then(() => console.log('Data Source has been initialized!'))
            .catch((err) => console.error('Error during Data Source initialization:', err))
    }

    static initialize() {
        if (!Database.instance) Database.instance = new Database()
        return Database.instance
    }
}
