import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, User } from '@prisma/client';
import { CredentialsDto } from './dto/credentials.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDto): Promise<User>;
    signIn(credentialsDto: CredentialsDto): Promise<string>;
    readAll(): Promise<User[]>;
    readById(id: string): Promise<User>;
    deleteAll(): Promise<Prisma.BatchPayload>;
    deleteById(id: string): Promise<User>;
}
