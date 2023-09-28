import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';

@Injectable()
export class MusicsService {
  create(createMusicDto: CreateMusicDto) {
    return 'This action adds a new music';
  }

  findAll() {
    return `This action returns all musics`;
  }

  findOne(id: string) {
    return `This action returns a #${id} music`;
  }
}
