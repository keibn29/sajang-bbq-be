import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { getFileInterceptor } from 'src/middlewares/multer';
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
  @UseInterceptors(getFileInterceptor('avatar'))
  async create(
    @Body() userData: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return await this.userService.create(userData, avatar);
  }
}
