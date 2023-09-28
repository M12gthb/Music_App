import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.services';
import { UsersRepository } from './repositories/user.repository';
import { UsersInMemoryRepository } from './repositories/in-memory/users.in-memory.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useClass: UsersInMemoryRepository,
    },
  ],
})
export class UserModule {}
