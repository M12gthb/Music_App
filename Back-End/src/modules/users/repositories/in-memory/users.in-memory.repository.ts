import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../Dto/create-user.dto';
import { User } from '../../entities/user.entitie';
import { UsersRepository } from '../user.repository';
import { UpdateUserDto } from '../../Dto/update-user.dto';
import { triggerAsyncId } from 'async_hooks';

@Injectable()
export class UsersInMemoryRepository implements UsersRepository {
  private database: User[] = [];
  async create(data: CreateUserDto): Promise<User> {
    const newUser = new User();
    Object.assign(newUser, { ...data });
    this.database.push(newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.database;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.database.find((user) => user.email === email);
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = this.database.find((user) => user.id === id);
    return user;
  }

  async update(data: UpdateUserDto, id: string): Promise<User> {
    const userIndex = this.database.findIndex((user) => user.id === id);
    this.database[userIndex] = {
      ...this.database[userIndex],
      ...data,
    };
    return this.database[userIndex];
  }

  async remove(id: string): Promise<void> {
    const userIndex = this.database.findIndex((user) => user.id === id);
    this.database.splice(userIndex, 1);
  }
}
