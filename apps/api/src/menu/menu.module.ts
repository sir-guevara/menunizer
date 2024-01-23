import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [PrismaModule, StripeModule],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
