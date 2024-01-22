"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacesModule = void 0;
const common_1 = require("@nestjs/common");
const places_service_1 = require("./places.service");
const places_controller_1 = require("./places.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const owner_middleware_1 = require("../middleware/owner.middleware");
const client_1 = require("@prisma/client");
let PlacesModule = class PlacesModule {
    configure(consumer) {
        consumer.apply(owner_middleware_1.OwnerMiddleware).exclude('/places').forRoutes('/places/*');
    }
};
exports.PlacesModule = PlacesModule;
exports.PlacesModule = PlacesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [places_controller_1.PlacesController],
        providers: [places_service_1.PlacesService, client_1.PrismaClient],
    })
], PlacesModule);
//# sourceMappingURL=places.module.js.map