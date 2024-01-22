import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OwnerMiddleware } from 'src/middleware/owner.middleware';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [PrismaModule],
  controllers: [PlacesController],
  providers: [PlacesService, PrismaClient],
})
export class PlacesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OwnerMiddleware).exclude('/places').forRoutes('/places/*');
  }
}
