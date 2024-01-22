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
exports.OwnerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let OwnerMiddleware = class OwnerMiddleware {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async use(req, res, next) {
        try {
            console.log('MISSDLE WARE RUNRING');
            const id = req.params.placeId;
            const plc = await this.prisma.place.findUnique({
                where: { id: id },
            });
            if (!plc) {
                throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.NOT_FOUND);
            }
            req['place'] = plc;
            return next();
        }
        catch (error) {
            return res.status(500).json({ error: 'Error fetching place' });
        }
    }
};
exports.OwnerMiddleware = OwnerMiddleware;
exports.OwnerMiddleware = OwnerMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], OwnerMiddleware);
//# sourceMappingURL=middleware.js.map