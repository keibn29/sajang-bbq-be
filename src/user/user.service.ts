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
