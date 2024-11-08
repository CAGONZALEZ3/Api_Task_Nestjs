import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userRepository.findOne({where: {email:createUserDto.email}});
      if (existingUser) {
        throw new ConflictException('email already in use');
      }

      const user = this.userRepository.create(createUserDto);
      return this.userRepository.save(user)//this.userRepository.save(createUserDto);

    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findEmail(email: string){
    const user = await this.userRepository.findOne({where: {email: email}});

    if (!user) {
      throw new NotFoundException(`Usuario con email ${email} no existe`);
    }
  
    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({id});

    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no existe`);
    }
  
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
  
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('email already in use');
      }
  
      await this.userRepository.update(id, updateUserDto);
      return { message: 'User updated successfully' };
    } catch (error) {
      throw error;
    }
    //return this.userRepository.update();
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOneBy({id});
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return this.userRepository.remove(user);
    } catch (error) {
      throw error
    }
    
    
  }

  async validateUser(email: string, password: string){
    const user = await this.userRepository.findOne({where: {email},
                                                    select: ['id', 'email', 'password'],
                                                    })
    if (!user) {
      throw new NotFoundException('Not exists that email')
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
