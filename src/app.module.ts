import { Module, ModuleMetadata } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ItemsModule, AuthModule],
} as ModuleMetadata)
export class AppModule {}
