import { UserStatus } from '@prisma/client';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    status: UserStatus;
}
