import { CreateUserDto } from '../Dto/create-user.dto';
import { UpdateUserDto } from '../Dto/update-user.dto';
import { User } from '../entities/user.entitie';

export abstract class UsersRepository {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findOne(id: string): Promise<User | null>;
  abstract update(data: UpdateUserDto, id: string): Promise<User>;
  abstract remove(id: string): Promise<void>;
  abstract findByToken(token: string): Promise<User | null>;
  abstract updateToken(email: string, resetToken: string): Promise<void>;
  abstract updatePassword(id: string, password: string): Promise<void>;
}
