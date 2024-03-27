import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionService } from 'src/utils/exceptionResponse';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

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

  async generateAccessToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const signConfig = {
      expiresIn: '24h',
      secret: process.env.JWT_SECRET,
    };
    const accessToken = await this.jwtService.signAsync(payload, signConfig);

    return { accessToken };
  }
}
