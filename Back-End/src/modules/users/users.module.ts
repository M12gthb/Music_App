import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.services';
import { UsersRepository } from './repositories/user.repository';
import { UserPrismaRepository } from './repositories/prisma/users-prisma.repository';
import { PrismaService } from '../database/prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from 'src/utils/mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        defaults: {
          from: 'mat43214@gmail.com',
        },
      },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    MailService,
    {
      provide: UsersRepository,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [UsersService],
})
export class UserModule {}
