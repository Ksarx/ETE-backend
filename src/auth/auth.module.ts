import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRESIN, SECRETKEY } from 'src/config';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: SECRETKEY,
      signOptions: { expiresIn: EXPIRESIN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
