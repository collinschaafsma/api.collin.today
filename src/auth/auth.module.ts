import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: configService.get<string>('SECRET'),
      signOptions: { expiresIn: '365 days' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
