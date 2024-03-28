import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { JwtStategy } from './auth/strategy';
import { BranchModule } from './branch/branch.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    BranchModule,
  ],
  providers: [JwtStategy],
})
export class AppModule {}
