import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './Dto/create-user.dto';
import { UsersRepository } from './repositories/user.repository';
import { UpdateUserDto } from './Dto/update-user.dto';
import { randomUUID } from 'node:crypto';
import { MailService } from 'src/utils/mail.service';

@Injectable()
export class UsersService {
  constructor(
    private usersRepositoy: UsersRepository,
    private mailService: MailService,
  ) {}
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

  async sendEmailResetPassword(email: string) {
    const user = await this.usersRepositoy.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User Not found!');
    }

    const resetToken = randomUUID();

    await this.usersRepositoy.updateToken(email, resetToken);

    const resetPasswordTemplate = this.mailService.resetPasswordTemplate(
      email,
      user.name,
      resetToken,
    );

    await this.mailService.sendEmail(resetPasswordTemplate);
  }

  async resetPassword(password: string, resetToken: string) {
    const user = await this.usersRepositoy.findByToken(resetToken);

    if (!user) {
      throw new NotFoundException('User Not found!');
    }

    await this.usersRepositoy.updatePassword(user.id, password);
  }
}
