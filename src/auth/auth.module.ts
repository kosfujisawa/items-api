import { Module, ModuleMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { IAuthModuleOptions, PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    } as IAuthModuleOptions),
    JwtModule.register({
      secret:
        'c9dl7ee04f5b3e553a4cf486dd6cd9b3bdd3aebf65ca84b9f509efe772f5ffc5',
      signOptions: {
        expiresIn: '1h',
      } as JwtSignOptions,
    } as JwtModuleOptions),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
} as ModuleMetadata)
export class AuthModule {}
