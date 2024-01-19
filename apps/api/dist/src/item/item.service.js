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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ItemService = class ItemService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createItemDto) {
        return await this.prisma.menuItem.create({ data: { ...createItemDto } });
    }
    async findAll(id) {
        return await this.prisma.menuItem.findMany({ where: { categoryId: id } });
    }
    async findOne(id) {
        return await this.prisma.menuItem.findUnique({ where: { id } });
    }
    async update(id, updateItemDto) {
        return await this.prisma.menuItem.update({
            where: { id },
            data: { ...updateItemDto },
        });
    }
    async remove(id) {
        const menuItem = await this.prisma.menuItem.findUnique({
            where: { id },
        });
        console.log({ menuItem });
        return await this.prisma.menuItem.delete({ where: { id } });
    }
};
exports.ItemService = ItemService;
exports.ItemService = ItemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ItemService);
//# sourceMappingURL=item.service.js.map