import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { MusicsModule } from './modules/musics/musics.module';

@Module({
  imports: [UserModule, MusicsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
