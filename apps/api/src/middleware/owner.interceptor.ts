import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';

@Injectable()
export class OwnerCheckInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if (request.place) {
      if (request.place.ownerId == request.user.id) {
        const user = request.user;
        const place = request.place;
        console.log(`${user.username} owns ${place.name}`);
        return next.handle();
      } else {
        const place = request?.place;
        throw new HttpException(
          `Unauthorized access to ${place?.name} Admin`,
          403,
        );
      }
    }
    return next.handle();
  }
}
