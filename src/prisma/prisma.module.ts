import { Module, ModuleMetadata } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
} as ModuleMetadata)
export class PrismaModule {}
