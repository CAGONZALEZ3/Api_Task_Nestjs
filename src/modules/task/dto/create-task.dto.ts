import { IsNotEmpty, IsEnum, IsOptional, IsInt } from 'class-validator';
import { Status } from '../enums/status.enum';

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    description?: string;

    @IsEnum(Status)
    @IsOptional()
    status?: Status;

    @IsInt()
    @IsNotEmpty()
    userId: number;
}
