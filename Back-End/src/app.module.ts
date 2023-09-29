import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { MusicsModule } from './modules/musics/musics.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, MusicsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
