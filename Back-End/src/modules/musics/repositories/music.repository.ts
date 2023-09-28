import { CreateMusicDto } from '../dto/create-music.dto';
import { Music } from '../entities/music.entity';

export abstract class MusicRepository {
  abstract create(data: CreateMusicDto, userId: string): Promise<void>;
  abstract findOne(id: string): Promise<Music | undefined>;
  abstract findAll(): Promise<Music[]>;
}
