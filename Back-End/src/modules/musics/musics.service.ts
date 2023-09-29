import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { MusicRepository } from './repositories/music.repository';

@Injectable()
export class MusicsService {
  constructor(private musicRepository: MusicRepository) {}
  async create(createMusicDto: CreateMusicDto, userId: string) {
    const music = await this.musicRepository.create(createMusicDto, userId);
    return music;
  }

  async findAll() {
    return this.musicRepository.findAll();
  }

  async findOne(id: string) {
    const findMusic = await this.musicRepository.findOne(id);
    if (!findMusic) {
      throw new NotFoundException('Music not found');
    }
    return findMusic;
  }
}
