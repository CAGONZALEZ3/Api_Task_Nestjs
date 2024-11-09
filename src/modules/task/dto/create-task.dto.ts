import { IsNotEmpty, IsEnum, IsOptional, IsInt } from 'class-validator';
import { Status } from '../enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @ApiProperty({
      description: 'Title of the task',
      example: 'Complete the report'
    })
    @IsNotEmpty()
    title: string;

    @ApiProperty({
      description: 'Description of the task',
      example: 'This task involves completing the quarterly report',
      required: false
    })
    @IsOptional()
    description?: string;

    @ApiProperty({
      description: 'Status of the task',
      example: 'pending',
      enum: Status,
      required: false
    })
    @IsEnum(Status)
    @IsOptional()
    status?: Status;

    @ApiProperty({
      description: 'ID of the user assigned to the task',
      example: 1
    })
    @IsInt()
    @IsNotEmpty()
    userId: number;
}
