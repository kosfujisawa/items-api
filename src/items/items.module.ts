import { Module, ModuleMetadata } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { PrismaModule } from '../prisma/prisma.module';
import { IAuthModuleOptions, PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    } as IAuthModuleOptions),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
} as ModuleMetadata)
export class ItemsModule {}
