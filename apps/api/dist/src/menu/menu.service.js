"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const stripe_1 = require("stripe");
let MenuService = class MenuService {
    constructor(prisma, stripeClient) {
        this.prisma = prisma;
        this.stripeClient = stripeClient;
    }
    async create(createOrderDto) {
        return await this.prisma.order.create({
            data: { ...createOrderDto },
        });
    }
    async findMenu(placeId) {
        return await this.prisma.place.findUnique({
            where: { id: placeId },
            include: { categories: { include: { items: true } } },
        });
    }
    findOne(id) {
        return `This action returns a #${id} menu`;
    }
    async update(id, updtateOrderDto) {
        return await this.prisma.order.update({
            where: { id: id },
            data: { ...updtateOrderDto },
        });
    }
    async remove(id) {
        return await this.prisma.order.delete({ where: { id: id } });
    }
    async createPaymentIntent(payment) {
        try {
            const { paymentMethod, ...rest } = payment;
            const paymentIntent = await this.stripeClient.paymentIntents.create({
                amount: payment.amount * 100,
                currency: 'usd',
                payment_method: paymentMethod.id,
                off_session: true,
                confirm: true,
            });
            const order = await this.create({
                ...rest,
                paymentIntent: paymentIntent.id,
            });
            return order;
        }
        catch (error) {
            throw new Error(`Error creating Payment Intent: ${error.message}`);
        }
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('STRIPE_CLIENT')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        stripe_1.default])
], MenuService);
//# sourceMappingURL=menu.service.js.map