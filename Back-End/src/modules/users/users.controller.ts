import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.services';
import { CreateUserDto } from './Dto/create-user.dto';
import { UpdateUserDto } from './Dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  find() {
    return this.userService.find();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto, id);
  }

  @HttpCode(204)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
