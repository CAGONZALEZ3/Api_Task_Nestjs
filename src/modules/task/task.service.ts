import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
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

  async create(createTaskDto: CreateTaskDto) {
    try {
      const user = await this.userRepository.findOne({where :{id :createTaskDto.userId}});
      if (!user) {
        throw new NotFoundException('No existe ese usuario');
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

  async findOne(id: number) {
    const task = await this.taskRepository.findOneBy({id});
    if (!task) {
      throw new NotFoundException('no existe la tarea con esa id')
    }
    return task;
  }

  async findByUserId(userId: number){
    const task = await this.taskRepository.findOne({where: {userId : userId}});
      if (!task) {
        throw new NotFoundException('No existen tareas para ese usuario');
      }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const existingTask = await this.taskRepository.findOneBy({id});
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
        throw new NotFoundException('No existe la tarea con esa Id')
      }

      return this.taskRepository.update(id, {status});
      
    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    try {
      const task = await this.taskRepository.findOneBy({id});
      if (!task) {
        throw new NotFoundException('no existe la tarea con esa id')
      }

      return this.taskRepository.remove(task)
    } catch (error) {
      throw error
    }


  }
}
