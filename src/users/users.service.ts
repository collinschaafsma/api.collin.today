import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateInput } from './dto/user.create.inputs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: UserCreateInput): Promise<User> {
    return await this.usersRepository.save(
      this.usersRepository.create(data)
    );
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({email});
  }

  async findOneById(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }
}
