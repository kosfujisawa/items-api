import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, User } from '@prisma/client';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signUp(createUserDto);
  }

  @Post('signin')
  async signIn(@Body() credentialsDto: CredentialsDto): Promise<string> {
    return await this.authService.signIn(credentialsDto);
  }

  @Get()
  async readAll(): Promise<User[]> {
    return await this.authService.readAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async readById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.authService.readById(id);
  }

  @Delete()
  async deleteAll(): Promise<Prisma.BatchPayload> {
    return await this.authService.deleteAll();
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.authService.deleteById(id);
  }
}
