import 'reflect-metadata';
import { createServer } from 'http';
import express, { Handler, Application as ExpressApp } from 'express';
import AppSettings from './configs/app-setting';
import { AuthController } from './apis/auth/auth.controller';
import { MetadataKeys } from './shared/metadata/metadata.keys';
import { Response, Request } from 'express';
import { IRouter } from './shared/decorators/handlers.decorator';
import {
   CONTROLLER_KEY,
   METHOD_KEY,
   MODULE_KEY,
   ROUTE_KEY,
} from './shared/decorators/controllers.decorator';
import { AppModule } from './apis/auth/auth.module';

export class Application {
   static instance: Application;
   // private app: ExpressApp;
   private app: ExpressApp;

   constructor() {
      this.app = express();
      // this.startHttpServer();
      // this.setupRoutes([AuthController]);
   }

   // private setupRoutes(controllers: any[]) {
   //    const info: Array<{ api: string; handler: string }> = [];

   //    controllers.forEach((Controller) => {
   //       const controllerInstance: { [handleName: string]: Handler } =
   //          new Controller();

   //       console.log(controllerInstance['authService']);

   //       const basePath: string = Reflect.getMetadata(
   //          MetadataKeys.BASE_PATH,
   //          Controller
   //       );
   //       const routers: IRouter[] = Reflect.getMetadata(
   //          MetadataKeys.ROUTERS,
   //          Controller
   //       );

   //       // console.log(controllerInstance, routers, basePath);

   //       const expressRouter = express.Router();

   //       routers.forEach(
   //          ({ method, handlerPath, middlewares, handlerName }) => {
   //             if (middlewares) {
   //                expressRouter[method](
   //                   handlerPath,
   //                   ...middlewares,
   //                   controllerInstance[String(handlerName)].bind(
   //                      controllerInstance
   //                   )
   //                );

   //                console.log(
   //                   controllerInstance[String(handlerName)].bind(
   //                      controllerInstance
   //                   )
   //                );
   //             } else {
   //                expressRouter[method](
   //                   handlerPath,
   //                   controllerInstance[String(handlerName)].bind(
   //                      controllerInstance
   //                   )
   //                );
   //             }

   //             info.push({
   //                api: `${method.toLocaleLowerCase()} ${
   //                   basePath + handlerPath
   //                }`,
   //                handler: `${Controller.name}.${String(handlerName)}`,
   //             });
   //          }
   //       );

   //       this.app.use(basePath, expressRouter);
   //    });

   //    console.table(info);
   // }

   // startHttpServer() {
   //    const httpServer = createServer(this.app);
   //    return httpServer.listen(AppSettings.PORT, () =>
   //       console.log('Application has been initialized')
   //    );
   // }

   // static getInstance() {
   //    if (!this.instance) {
   //       this.instance = new Application();
   //    }
   //    return this.instance;
   // }

   static create(module: any) {
      const factory = new Application();

      // Fetch metadata from the AppModule
      const moduleMetadata = Reflect.getMetadata(MODULE_KEY, module);

      // Create an instance of the providers
      const instances = moduleMetadata.usecases.map(
         (provider: any) => new provider()
      );

      // Get controllers and add routes to Elysia
      moduleMetadata.controllers.forEach((Controller: any) => {
         const prefix = Reflect.getMetadata(CONTROLLER_KEY, Controller);
         const controller = new Controller(...instances);
         Object.getOwnPropertyNames(Object.getPrototypeOf(controller)).forEach(
            (property) => {
               if (property !== 'constructor') {
                  const method = Reflect.getMetadata(
                     METHOD_KEY,
                     controller,
                     property
                  );
                  const route = Reflect.getMetadata(
                     ROUTE_KEY,
                     controller,
                     property
                  );

                  if (route && method !== null) {
                     console.log(
                        `🍳🥓☕ Adding route ${method.toUpperCase()} ${prefix}${route}`
                     );
                     // @ts-ignore

                     factory.app[method](
                        prefix + route,
                        (req: any, res: any) => controller[property](req, res)
                        // {
                        //    type: 'json',
                        // }
                     );
                  }
               }
            }
         );
      });

      return factory;
   }

   public async listen(port: number) {
      this.app.listen(port);
      console.log(`🦊 Express is running on port ...`);
   }
}

// Main.Application.getInstance();
async function bootstrap() {
   const app = Application.create(AppModule);

   await app.listen(3000);
}

bootstrap();
