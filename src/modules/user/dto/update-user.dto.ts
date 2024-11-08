import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, isNotEmpty, IsNotEmpty, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
}