import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
      description: 'Email of the user',
      example: 'user@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
      description: 'Password of the user (8 to 50 characters)',
      example: 'SecurePass1234'
    })
    @Length(8, 50)
    @IsNotEmpty()
    password: string;

    @ApiProperty({
      description: 'Name of the user',
      example: 'John Doe',
      required: false
    })
    @Length(2, 50)
    name?: string;
}
