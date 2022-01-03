import { Permission } from "./permissions";

export class Role {
    constructor(
        public id: number = 0,
        public name: string = '',
        public permission: Permission = new Permission()
    ) {}
}