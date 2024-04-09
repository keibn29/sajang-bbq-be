import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { ReadUserDto } from './dto/read-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async read(@Query() params: ReadUserDto) {
    return await this.userService.read(params);
  }

  @Post()
  async create(@Body() userData: CreateUserDto) {
    return await this.userService.create(userData);
  }
}
