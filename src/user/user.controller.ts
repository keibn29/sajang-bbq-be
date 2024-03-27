import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUser() {
    return 'get success';
  }

  @Post()
  async create(@Body() userData: CreateUserDto) {
    return await this.userService.create(userData);
  }
}
