import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { JwtStategy } from './auth/strategy';
import { BranchModule } from './branch/branch.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { UtilityModule } from './utility/utility.module';
import { GalleryModule } from './gallery/gallery.module';
import { ScheduleModule } from './schedule/schedule.module';
import { TimeModule } from './time/time.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    BranchModule,
    BlogModule,
    UtilityModule,
    GalleryModule,
    ScheduleModule,
    TimeModule,
    BookingModule,
  ],
  providers: [JwtStategy],
})
export class AppModule {}
