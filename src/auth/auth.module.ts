import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStategy } from './strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStategy],
})
export class AuthModule {}
