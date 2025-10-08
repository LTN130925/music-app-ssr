// import {Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
//
// @Injectable()
// export class AuthenticatedMiddleware implements CanActivate {
//     canActivate(context: ExecutionContext) {
//         const req = context.switchToHttp().getRequest();
//         return req.isAuthenticated();
//     }
// }