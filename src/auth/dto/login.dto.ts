import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class LoginDto{
    @ApiProperty({description: 'Email of user'})
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty({description: 'Pasword without has'})
    @Length(8,50)
    @IsNotEmpty()
    password:string;
}

export class LoginResponseDto {
    @ApiProperty({
      description: 'JWT token used for authentication',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    token: string;
  
    @ApiProperty({
      description: 'User information returned upon successful login',
      example: { email: 'camiloc.j04@gmail.com', sub: 1 },
    })
    user: { 
      email: string;
      sub: number;
    };
  }