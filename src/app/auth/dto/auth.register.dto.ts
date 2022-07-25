import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/user.entity';

export class AuthRegisterDto {
  @ApiProperty({
    name: 'email',
    description: 'Email address of the new User',
  })
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @ApiProperty({
    name: 'password',
    description: 'Password of new User',
  })
  @IsNotEmpty()
  @IsString()
  public readonly password: string;

  public toUser(): User {
    const { ...params } = this;

    return Object.assign(new User(), params);
  }
}
