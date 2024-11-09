import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Status } from './enums/status.enum';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository : Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository : Repository<User>,
  ){}

  async create(createTaskDto: CreateTaskDto, userId : number) {
    try {
      this.compareUsers(userId,createTaskDto.userId)
      const user = await this.userRepository.findOne({where :{id :createTaskDto.userId}});
      if (!user) {
        throw new NotFoundException('That user does not exist');
      }
      const task = this.taskRepository.create(createTaskDto);
      return  this.taskRepository.save(task);
    } catch (error) {
      throw error
    }

  }

  findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: number,userId : number) {
    const task = await this.taskRepository.findOneBy({id});
    if (!task) {
      throw new NotFoundException('The task with that id does not exist')
    }
    this.compareUsers(userId, task.userId);

    return task;
  }

  async findByUserId(userId: number){
    const task = await this.taskRepository.findBy({userId});
      if (!task) {
        throw new NotFoundException('There are no tasks for that user');
      }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId : number) {
    try {
      this.compareUsers(userId,updateTaskDto.userId)
      const existingTask = await this.taskRepository.findOneBy({ id, userId });
      if (!existingTask) {
        throw new NotFoundException('No existe la tarea')
      }

      return this.taskRepository.update(id,updateTaskDto)

    } catch (error) {
      
    }
  }
  
  async updateTaskStatus(id: number, status: Status){
    try {
      const existingTask = await this.taskRepository.findOneBy({id});
      if (!existingTask) {
        throw new NotFoundException('The task with that id does not exist')
      }

      return this.taskRepository.update(id, {status});
      
    } catch (error) {
      throw error
    }
  }

  async remove(id: number,userId : number) {
    try {
      const task = await this.taskRepository.findOneBy({id});
      if (!task) {
        throw new NotFoundException('The task with that id does not exist')
      }
      this.compareUsers(userId, task.userId);

      return this.taskRepository.remove(task)
    } catch (error) {
      throw error
    }
  }

  compareUsers(user: number, userId: number) {
    if (user !== userId){
      throw new UnauthorizedException('The user is not the same');
    }
  }
}
