import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
