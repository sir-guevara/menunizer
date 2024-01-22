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
exports.PlacesController = void 0;
const common_1 = require("@nestjs/common");
const places_service_1 = require("./places.service");
const create_place_dto_1 = require("./dto/create-place.dto");
const update_place_dto_1 = require("./dto/update-place.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const owner_interceptor_1 = require("../middleware/owner.interceptor");
let PlacesController = class PlacesController {
    constructor(placesService) {
        this.placesService = placesService;
    }
    create(createPlaceDto, request) {
        createPlaceDto.ownerId = request.user.id;
        return this.placesService.create(createPlaceDto);
    }
    findAll(request) {
        const id = request.user.id;
        return this.placesService.findAllByOwner(id);
    }
    findOne(placeId) {
        return this.placesService.findOne(placeId);
    }
    update(placeId, updatePlaceDto) {
        return this.placesService.update(placeId, updatePlaceDto);
    }
    remove(placeId) {
        return this.placesService.remove(placeId);
    }
};
exports.PlacesController = PlacesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_place_dto_1.CreatePlaceDto, Object]),
    __metadata("design:returntype", void 0)
], PlacesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlacesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':placeId'),
    __param(0, (0, common_1.Param)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlacesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':placeId'),
    __param(0, (0, common_1.Param)('placeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_place_dto_1.UpdatePlaceDto]),
    __metadata("design:returntype", void 0)
], PlacesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':placeId'),
    __param(0, (0, common_1.Param)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlacesController.prototype, "remove", null);
exports.PlacesController = PlacesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(owner_interceptor_1.OwnerCheckInterceptor),
    (0, common_1.Controller)('places'),
    __metadata("design:paramtypes", [places_service_1.PlacesService])
], PlacesController);
//# sourceMappingURL=places.controller.js.map