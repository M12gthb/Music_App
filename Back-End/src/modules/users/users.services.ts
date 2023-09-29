import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './Dto/create-user.dto';
import { UsersRepository } from './repositories/user.repository';
import { UpdateUserDto } from './Dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepositoy: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const findUser = await this.usersRepositoy.findByEmail(createUserDto.email);

    if (findUser) {
      throw new ConflictException('User already exists');
    }

    const user = await this.usersRepositoy.create(createUserDto);

    return user;
  }

  async find() {
    const users = this.usersRepositoy.findAll();
    return users;
  }

  async findOne(id: string) {
    const user = await this.usersRepositoy.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found !');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepositoy.findByEmail(email);
    return user;
  }

  async update(data: UpdateUserDto, id: string) {
    const user = this.usersRepositoy.update(data, id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async remove(id: string) {
    await this.usersRepositoy.remove(id);
  }
}
