import 'dotenv/config'
import { Application } from './setupServer'

const boostrap = async () => {
    const app = Application.create()
    await app.listen(+process.env.PORT)
}

boostrap()
