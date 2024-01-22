"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerCheckInterceptor = void 0;
const common_1 = require("@nestjs/common");
let OwnerCheckInterceptor = class OwnerCheckInterceptor {
    intercept(context, next) {
        console.log('Checking for user...');
        const request = context.switchToHttp().getRequest();
        if (request.place) {
            if (request.place.ownerId == request.user.id) {
                const user = request.user;
                const place = request.place;
                console.log(`${user.username} owns ${place.name}`);
                return next.handle();
            }
            else {
                const user = request?.user;
                const place = request?.place;
                console.log(`${user?.username} Not owner of ${place?.name}`);
                throw new common_1.HttpException(`Unauthorized access to ${place?.name} Admin`, 403);
            }
        }
        return next.handle();
    }
};
exports.OwnerCheckInterceptor = OwnerCheckInterceptor;
exports.OwnerCheckInterceptor = OwnerCheckInterceptor = __decorate([
    (0, common_1.Injectable)()
], OwnerCheckInterceptor);
//# sourceMappingURL=min.middleare.js.map