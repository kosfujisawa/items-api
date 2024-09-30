import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    signUp({ name, email, password, status, }: CreateUserDto): Promise<User>;
    signIn({ email, password }: CredentialsDto): Promise<string>;
    readAll(): Promise<User[]>;
    readById(id: string): Promise<User>;
    deleteAll(): Promise<Prisma.BatchPayload>;
    deleteById(id: string): Promise<User>;
}
