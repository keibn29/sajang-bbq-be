import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionService } from 'src/utils/exceptionResponse';
import { CreateBranchDto } from './dto/create-dto';

@Injectable()
export class BranchService {
  constructor(private prismaService: PrismaService) {}

  async read(params: any) {
    try {
      const { current, size } = params;
      const user = await this.prismaService.branch.findMany({
        skip: (Number(current) - 1) * Number(size),
        take: Number(size),
      });
      const count = await this.prismaService.branch.count();

      return {
        statusCode: HttpStatus.OK,
        user,
        count,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  async getById(params: any) {
    try {
      const user = await this.prismaService.branch.findUnique({
        where: {
          id: Number(params.id),
        },
      });

      return {
        statusCode: HttpStatus.OK,
        user,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  async create(data: CreateBranchDto, avatar: Express.Multer.File) {
    try {
      const { name, address, phone } = data;
      await this.prismaService.branch.create({
        data: {
          name,
          address,
          phone,
          avatar: avatar?.path,
        },
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Success',
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  async update(params: any, data: any, avatar: Express.Multer.File) {
    try {
      const { name, address, phone } = data;
      await this.prismaService.branch.update({
        where: {
          id: Number(params.id),
        },
        data: {
          name,
          address,
          phone,
          avatar: avatar?.path,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  async delete(params: any) {
    try {
      await this.prismaService.branch.delete({
        where: {
          id: Number(params.id),
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }
}
