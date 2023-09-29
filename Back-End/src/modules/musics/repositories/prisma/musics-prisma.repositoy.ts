import { Injectable } from '@nestjs/common';
import { MusicRepository } from '../music.repository';
import { CreateMusicDto } from '../../dto/create-music.dto';
import { Music } from '../../entities/music.entity';
import { PrismaService } from 'src/modules/database/prisma.service';

@Injectable()
export class MusicPrismaRepository implements MusicRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateMusicDto, userId: string): Promise<Music> {
    const music = new Music();
    Object.assign(music, {
      ...data,
    });
    const newMusic = await this.prisma.music.create({
      data: {
        id: music.id,
        name: music.name,
        album: music.album,
        artist: music.artist,
        genre: music.genre,
        year: music.year,
        cover_image: music.cover_image,
        music_url: music.music_url,
        userId,
      },
    });

    return newMusic;
  }

  async findOne(id: string): Promise<Music> {
    const music = await this.prisma.music.findFirst({
      where: { id },
    });
    return music;
  }

  async findAll(): Promise<Music[]> {
    const music = await this.prisma.music.findMany();
    return music;
  }
}
