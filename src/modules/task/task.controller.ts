import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserGuard } from 'src/auth/guard/user.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiHeader, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('task')
@UseGuards(UserGuard)
@ApiHeader({
  name: 'x-api-key',
  description: 'API Key to access the protected route',
  required: true,
},)
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto, description: 'Data to create a new task' })
  @ApiResponse({ status: 201, description: 'Task successfully created', type: CreateTaskDto })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 404, description: 'That user does not exist' })
  @ApiResponse({ status: 401, description: 'The user is not the same' })
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.taskService.create(createTaskDto, req.metadata.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tasks' })
  @ApiResponse({ status: 200, description: 'List of tasks' })
  findAll(@Request() req) {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific task by ID' })
  @ApiParam({ name: 'id', description: 'ID of the task', example: 1 })
  @ApiResponse({ status: 200, description: 'Task data', type: CreateTaskDto })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'The user is not the same' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.taskService.findOne(+id, req.metadata.userId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Retrieve tasks by user ID' })
  @ApiParam({ name: 'userId', description: 'ID of the user', example: 1 })
  @ApiResponse({ status: 200, description: 'List of tasks for the specified user', type: CreateTaskDto })
  @ApiResponse({ status: 401, description: 'The user is not the same' })
  @ApiResponse({ status: 404, description: 'There are no tasks for that user' })
  findByUserId(@Param('userId') userId: string) {
    return this.taskService.findByUserId(+userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific task' })
  @ApiParam({ name: 'id', description: 'ID of the task to update', example: 1 })
  @ApiBody({ type: CreateTaskDto, description: 'Data to update the task' })
  @ApiResponse({ status: 200, description: 'Updated task data', type: CreateTaskDto })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'The user is not the same' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req) {
    return this.taskService.update(+id, updateTaskDto, req.metadata.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific task by ID' })
  @ApiParam({ name: 'id', description: 'ID of the task to delete', example: 1 })
  @ApiResponse({ status: 200, description: 'Task successfully deleted', type: CreateTaskDto })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'The user is not the same' })
  remove(@Param('id') id: string, @Request() req) {
    return this.taskService.remove(+id, req.metadata.userId);
  }
}
