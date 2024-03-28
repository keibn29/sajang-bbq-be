import { HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionService } from 'src/utils/exceptionResponse';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateUserDto) {
    try {
      const { email, password, firstName, lastName, phone, avatar } = data;
      const hashedPassword = await hash(password);
      await this.prismaService.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          phone,
          avatar,
        },
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Add new user success',
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }
}
