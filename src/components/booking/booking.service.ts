import { HttpStatus, Injectable } from '@nestjs/common';
import { ENUM_BOOKING_STATUS } from 'src/constants/app';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionService } from 'src/utils/exceptionResponse';
import { UpdateBookingDto } from './dto/update-booking';

@Injectable()
export class BookingService {
  constructor(private prismaService: PrismaService) {}

  async read(params: any) {
    try {
      const { current, size } = params;
      const booking = await this.prismaService.booking.findMany({
        skip: (Number(current) - 1) * Number(size),
        take: Number(size),
        include: {
          branch: true,
          customer: true,
        },
      });
      const count = await this.prismaService.booking.count();

      return {
        statusCode: HttpStatus.OK,
        booking,
        count,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  async getById(params: any) {
    try {
      const booking = await this.prismaService.booking.findUnique({
        where: {
          id: Number(params.id),
        },
      });

      return {
        statusCode: HttpStatus.OK,
        booking,
      };
    } catch (err) {
      throw new ExceptionService(err);
    }
  }

  async create(data: any) {
    try {
      const { customerId, branchId, table, date, scheduleId } = data;
      await this.prismaService.booking.create({
        data: {
          status: ENUM_BOOKING_STATUS.new,
          customerId: +customerId,
          branchId: +branchId,
          table: +table,
          date,
          scheduleId: +scheduleId,
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

  async update(params: any, data: UpdateBookingDto) {
    try {
      const { status } = data;
      await this.prismaService.booking.update({
        where: {
          id: Number(params.id),
        },
        data: { status },
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
      await this.prismaService.booking.delete({
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
