import { CreateRoleDto } from './dto/create-role.dto';
import { RoleDocument } from './schemas/role.schema';
import { Model } from "mongoose";
export declare class RolesService {
    private roleModel;
    constructor(roleModel: Model<RoleDocument>);
    createRole(dto: CreateRoleDto): Promise<RoleDocument>;
    getRoleByValue(value: string): Promise<RoleDocument>;
}
