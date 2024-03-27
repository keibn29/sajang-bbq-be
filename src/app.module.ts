import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStategy } from './auth/strategy';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [JwtModule.register({}), PrismaModule],
  controllers: [AuthController, UserController],
  providers: [AuthService, JwtStategy, UserService],
})
export class AppModule {}
