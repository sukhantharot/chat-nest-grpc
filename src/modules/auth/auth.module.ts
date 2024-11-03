import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from '../../strategy/google.strategy';
import { JwtStrategy } from '../../strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../constants/jwt';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from '../../configs/google-oauth.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync(jwtConstants),
    ConfigModule.forFeature(googleOauthConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
