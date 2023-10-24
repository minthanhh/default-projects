"use strict";var Main;function _define_property(){let e=require("@swc/helpers/_/_define_property");return _define_property=function(){return e},e}function _interop_require_default(){let e=require("@swc/helpers/_/_interop_require_default");return _interop_require_default=function(){return e},e}function _http(){let e=require("http");return _http=function(){return e},e}function _express(){let e=_interop_require_default()._(require("express"));return _express=function(){return e},e}Object.defineProperty(exports,"__esModule",{value:!0}),require("reflect-metadata");const _appsetting=_interop_require_default()._(require("./configs/app-setting")),_authcontroller=require("./apis/auth/auth.controller"),_metadatakeys=require("./shared/metadata/metadata.keys");!function(e){class t{setupRoutes(e){e.forEach(e=>{let t=new e,r=Reflect.getMetadata(_metadatakeys.MetadataKeys.BASE_PATH,e),n=Reflect.getMetadata(_metadatakeys.MetadataKeys.ROUTERS,e);console.log(t,n,r),_express().default.Router()}),// routers.forEach(
//    ({ method, handlerPath, middlewares, handlerName }) => {
//       if (middlewares) {
//          expressRouter[method](
//             handlerPath,
//             ...middlewares,
//             controllerInstance[String(handlerName)].bind(
//                controllerInstance
//             )
//          );
//       } else {
//          expressRouter[method](
//             handlerPath,
//             controllerInstance[String(handlerName)].bind(
//                controllerInstance
//             )
//          );
//       }
//       info.push({
//          api: `${method.toLocaleLowerCase()} ${
//             basePath + handlerPath
//          }`,
//          handler: `${Controller.name}.${String(handlerName)}`,
//       });
//    }
// );
// this.app.use(basePath, expressRouter);
console.table([])}startHttpServer(){let e=(0,_http().createServer)(this.app);return e.listen(_appsetting.default.PORT,()=>console.log("Application has been initialized"))}static getInstance(){return this.instance||(this.instance=new t),this.instance}constructor(){_define_property()._(this,"app",void 0),this.app=(0,_express().default)(),this.startHttpServer(),this.setupRoutes([_authcontroller.AuthController])}}_define_property()._(t,"instance",void 0),e.Application=t}(Main||(Main={})),Main.Application.getInstance()/*#__PURE__*//*#__PURE__*/;
//# sourceMappingURL=main.js.map