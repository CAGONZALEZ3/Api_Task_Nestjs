import { IsEmail, isNotEmpty, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email:string;
    
    @Length(8,50)
    @IsNotEmpty()
    password:string;
    
    @Length(2,50)
    name?:string;
}
