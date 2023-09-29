import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { PrismaService } from '../database/prisma.service';
import { MusicRepository } from './repositories/music.repository';
import { MusicPrismaRepository } from './repositories/prisma/musics-prisma.repositoy';

@Module({
  controllers: [MusicsController],
  providers: [
    MusicsService,
    PrismaService,
    {
      provide: MusicRepository,
      useClass: MusicPrismaRepository,
    },
  ],
})
export class MusicsModule {}
