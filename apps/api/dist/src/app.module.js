"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const places_module_1 = require("./places/places.module");
const category_module_1 = require("./category/category.module");
const item_module_1 = require("./item/item.module");
const menu_module_1 = require("./menu/menu.module");
const order_module_1 = require("./order/order.module");
const owner_middleware_1 = require("./middleware/owner.middleware");
const category_controller_1 = require("./category/category.controller");
const places_controller_1 = require("./places/places.controller");
const prisma_service_1 = require("./prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(owner_middleware_1.OwnerMiddleware)
            .exclude('/places')
            .forRoutes(category_controller_1.CategoryController, places_controller_1.PlacesController);
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            places_module_1.PlacesModule,
            category_module_1.CategoryModule,
            item_module_1.ItemModule,
            menu_module_1.MenuModule,
            order_module_1.OrderModule,
        ],
        providers: [jwt_1.JwtService, prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map