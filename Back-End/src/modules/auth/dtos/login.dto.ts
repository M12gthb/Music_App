import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    default: 'mat@mail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    default: '12345678',
  })
  @IsString()
  password: string;
}
