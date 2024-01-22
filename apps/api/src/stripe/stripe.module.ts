import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'STRIPE_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const stripeSecretKey = configService.get<string>('STRIPE_SECRET_KEY');
        return new Stripe(stripeSecretKey, { apiVersion: '2023-10-16' }); // You can adjust the API version as needed
      },
      inject: [ConfigService],
    },
  ],
  exports: ['STRIPE_CLIENT'],
})
export class StripeModule {}
