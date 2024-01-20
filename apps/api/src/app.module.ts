import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PlacesModule } from './places/places.module';
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [UsersModule, AuthModule, PlacesModule, CategoryModule, ItemModule, MenuModule],
})
export class AppModule {}
