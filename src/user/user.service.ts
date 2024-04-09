import { HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionService } from 'src/utils/exceptionResponse';
import { CreateUserDto } from './dto';
import { ReadUserDto } from './dto/read-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async read(params: ReadUserDto) {
    const { current, size } = params;
    const user = await this.prismaService.user.findMany({
      skip: (+current - 1) * +size,
      take: +size,
    });
    const count = await this.prismaService.user.count();

    return {
      statusCode: HttpStatus.OK,
      user,
      count,
    };
  }
  catch(err) {
    throw new ExceptionService(err);
  }

  async create(data: CreateUserDto) {
    try {
      const { email, password, firstName, lastName, phone, avatar, role } =
        data;
      const hashedPassword = await hash(password);
      const user = await this.prismaService.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          phone,
          avatar,
          role,
        },
      });

      delete user.password;
      return {
        statusCode: HttpStatus.CREATED,
        user,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }
}
