import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtPayload } from '../types/jwtPayload';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp({
    name,
    email,
    password,
    status,
  }: CreateUserDto): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password: await hash(password, 10),
        status,
      } as Prisma.UserCreateInput,
    } as Prisma.UserCreateArgs);
  }

  async signIn({ email, password }: CredentialsDto): Promise<string> {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        email,
      } as Prisma.UserWhereUniqueInput,
    } as Prisma.UserFindUniqueArgs);

    if (user && (await compare(password, user.password))) {
      return this.jwtService.sign({
        sub: user.id,
        username: user.name,
        status: user.status,
      } as JwtPayload);
    }

    throw new UnauthorizedException();
  }

  async readAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async readById(id: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      } as Prisma.UserWhereUniqueInput,
    } as Prisma.UserFindUniqueArgs);
  }

  async deleteAll(): Promise<Prisma.BatchPayload> {
    return await this.prismaService.user.deleteMany();
  }

  async deleteById(id: string): Promise<User> {
    return await this.prismaService.user.delete({
      where: {
        id,
      } as Prisma.UserWhereUniqueInput,
    } as Prisma.UserDeleteArgs);
  }
}
