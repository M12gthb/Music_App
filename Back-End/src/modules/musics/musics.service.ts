import { unlink } from 'node:fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { MusicRepository } from './repositories/music.repository';
import { v2 as cloudinary } from 'cloudinary';
import { error } from 'node:console';
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

  async upload(
    cover_image: Express.Multer.File,
    music: Express.Multer.File,
    musicId: string,
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    const findMusic = await this.musicRepository.findOne(musicId);

    if (!findMusic) {
      throw new NotFoundException('Music not found');
    }

    const uploadImage = await cloudinary.uploader.upload(
      cover_image.path,
      {
        resource_type: 'image',
      },
      (error, result) => result,
    );

    const uploadMusic = await cloudinary.uploader.upload(
      music.path,
      {
        resource_type: 'video',
      },
      (error, result) => result,
    );

    const updateMusic = await this.musicRepository.update(
      {
        cover_image: uploadImage.secure_url,
        music_url: uploadMusic.secure_url,
      },
      musicId,
    );

    unlink(cover_image.path, (error) => {
      if (error) console.log(error);
    });

    unlink(music.path, (error) => {
      if (error) console.log(error);
    });

    return updateMusic;
  }
}
