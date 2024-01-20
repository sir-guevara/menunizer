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
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const menu_service_1 = require("./menu.service");
const create_menu_dto_1 = require("./dto/create-menu.dto");
const update_menu_dto_1 = require("./dto/update-menu.dto");
let MenuController = class MenuController {
    constructor(menuService) {
        this.menuService = menuService;
    }
    create(createOrderDto) {
        return this.menuService.create(createOrderDto);
    }
    createPaymentIntent(payment, placeId, req) {
        console.log(req);
        return this.menuService.createPaymentIntent(payment);
    }
    findMenu(placeId) {
        return this.menuService.findMenu(placeId);
    }
    findOne(id) {
        return this.menuService.findOne(+id);
    }
    update(id, updtateOrderDto) {
        return this.menuService.update(+id, updtateOrderDto);
    }
    remove(id) {
        return this.menuService.remove(+id);
    }
};
exports.MenuController = MenuController;
__decorate([
    (0, common_1.Post)('/order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_menu_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/create-payment-intent'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_menu_dto_1.CreateOrderDto, String, Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "createPaymentIntent", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "findMenu", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_menu_dto_1.UpdtateOrderDto]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "remove", null);
exports.MenuController = MenuController = __decorate([
    (0, common_1.Controller)('/menu/:placeId/'),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuController);
//# sourceMappingURL=menu.controller.js.map