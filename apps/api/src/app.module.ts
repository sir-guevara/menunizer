import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PlacesModule } from './places/places.module';
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { OwnerMiddleware } from './middleware/owner.middleware';
import { CategoryController } from './category/category.controller';
import { PlacesController } from './places/places.controller';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { OrderController } from './order/order.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PlacesModule,
    CategoryModule,
    ItemModule,
    MenuModule,
    OrderModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'client', 'dist'),
    }),
  ],
  providers: [JwtService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OwnerMiddleware)
      .exclude('/places')
      .forRoutes(CategoryController, PlacesController, OrderController);
  }
}
