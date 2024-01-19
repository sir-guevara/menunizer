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
exports.PlacesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PlacesService = class PlacesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(_createPlaceDto) {
        return this.prisma.place.create({
            data: { ..._createPlaceDto },
        });
    }
    findAllByOwner(ownerId) {
        return this.prisma.place.findMany({ where: { ownerId: ownerId } });
    }
    findOne(id) {
        return this.prisma.place.findUnique({
            where: { id },
            include: {
                categories: {
                    include: {
                        items: true,
                    },
                },
            },
        });
    }
    update(id, _updatePlaceDto) {
        return this.prisma.place.update({
            where: { id },
            data: _updatePlaceDto,
            include: {
                categories: {
                    include: {
                        items: true,
                    },
                },
            },
        });
    }
    remove(id) {
        return this.prisma.place.delete({ where: { id } });
    }
};
exports.PlacesService = PlacesService;
exports.PlacesService = PlacesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlacesService);
//# sourceMappingURL=places.service.js.map