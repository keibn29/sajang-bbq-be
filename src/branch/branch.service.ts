import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionService } from 'src/utils/exceptionResponse';
import { CreateBranchDto } from './dto/create-dto';

@Injectable()
export class BranchService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateBranchDto) {
    try {
      const { name, address, phone, avatar } = data;
      await this.prismaService.branch.create({
        data: {
          name,
          address,
          phone,
          avatar,
        },
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Add new success',
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }
}
