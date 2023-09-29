import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createMusicDto: CreateMusicDto, @Request() req) {
    return this.musicsService.create(createMusicDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.musicsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.musicsService.findOne(id);
  }
}
