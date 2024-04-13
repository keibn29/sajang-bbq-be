import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { JwtStategy } from './auth/strategy';
import { BlogModule } from './blog/blog.module';
import { BookingModule } from './booking/booking.module';
import { BranchModule } from './branch/branch.module';
import { GalleryModule } from './gallery/gallery.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { UtilityModule } from './utility/utility.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    MulterModule.register(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'images'),
      serveRoot: '/images/',
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    BranchModule,
    BlogModule,
    UtilityModule,
    GalleryModule,
    BookingModule,
  ],
  providers: [JwtStategy],
})
export class AppModule {}
