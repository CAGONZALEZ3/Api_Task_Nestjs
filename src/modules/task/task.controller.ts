import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserGuard } from 'src/auth/guard/user.guard';

@Controller('task')
//@UseGuards(AuthGuard)
@UseGuards(UserGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto,@Request() req) {
    return this.taskService.create(createTaskDto,req.metadata.userId);
  }

  @Get()
  findAll(@Request() req) {
    //console.log(req.metadata);
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string,@Request() req) {
    return this.taskService.findOne(+id,req.metadata.userId);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: String){
    return this.taskService.findByUserId(+userId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto,@Request() req) {
    return this.taskService.update(+id, updateTaskDto,req.metadata.userId);
  }

  //@Patch('status/')

  @Delete(':id')
  remove(@Param('id') id: string,@Request() req) {
    return this.taskService.remove(+id,req.metadata.userId);
  }
}
