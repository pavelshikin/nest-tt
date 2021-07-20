"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesModule = void 0;
const common_1 = require("@nestjs/common");
const roles_service_1 = require("./roles.service");
const roles_controller_1 = require("./roles.controller");
const auth_module_1 = require("../auth/auth.module");
const mongoose_1 = require("@nestjs/mongoose");
const role_schema_1 = require("./schemas/role.schema");
let RolesModule = class RolesModule {
};
RolesModule = __decorate([
    common_1.Module({
        providers: [roles_service_1.RolesService],
        controllers: [roles_controller_1.RolesController],
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: role_schema_1.Role.name, schema: role_schema_1.RoleSchema }]),
            common_1.forwardRef(() => auth_module_1.AuthModule)
        ],
        exports: [
            roles_service_1.RolesService
        ]
    })
], RolesModule);
exports.RolesModule = RolesModule;
//# sourceMappingURL=roles.module.js.map