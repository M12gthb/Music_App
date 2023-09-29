import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.services';
import { UsersRepository } from './repositories/user.repository';
import { UserPrismaRepository } from './repositories/prisma/users-prisma.repository';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
