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
exports.ItemController = void 0;
const common_1 = require("@nestjs/common");
const item_service_1 = require("./item.service");
const create_item_dto_1 = require("./dto/create-item.dto");
const update_item_dto_1 = require("./dto/update-item.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ItemController = class ItemController {
    constructor(itemService) {
        this.itemService = itemService;
    }
    create(createItemDto) {
        return this.itemService.create(createItemDto);
    }
    findAll(placeId) {
        return this.itemService.findAll(placeId);
    }
    findOne(id) {
        return this.itemService.findOne(id);
    }
    update(id, updateItemDto) {
        return this.itemService.update(id, updateItemDto);
    }
    remove(id) {
        return this.itemService.remove(id);
    }
};
exports.ItemController = ItemController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_item_dto_1.CreateItemDto]),
    __metadata("design:returntype", void 0)
], ItemController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_item_dto_1.UpdateItemDto]),
    __metadata("design:returntype", void 0)
], ItemController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemController.prototype, "remove", null);
exports.ItemController = ItemController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('/places/:placeId/categories/menu-items'),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], ItemController);
//# sourceMappingURL=item.controller.js.map