"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = require("stripe");
let StripeModule = class StripeModule {
};
exports.StripeModule = StripeModule;
exports.StripeModule = StripeModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: 'STRIPE_CLIENT',
                useFactory: async (configService) => {
                    const stripeSecretKey = configService.get('STRIPE_SECRET_KEY');
                    return new stripe_1.default(stripeSecretKey, { apiVersion: '2023-10-16' });
                },
                inject: [config_1.ConfigService],
            },
        ],
        exports: ['STRIPE_CLIENT'],
    })
], StripeModule);
//# sourceMappingURL=stripe.module.js.map