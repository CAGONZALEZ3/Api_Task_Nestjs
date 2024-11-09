import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class LoginDto{
    @ApiProperty({description: 'Email del usuario, requerido'})
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty({description: 'Contraseña del usuario sin hash'})
    @Length(8,50)
    @IsNotEmpty()
    password:string;
}

export class LoginResponseDto {
    @ApiProperty()
    token: string;
  
    @ApiProperty()
    user: {email : string, sub : number};
  }