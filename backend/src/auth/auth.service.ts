import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(payload: LoginDto) {
    const adminUsername = this.configService.get<string>('ADMIN_USERNAME');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

    if (!adminUsername || !adminPassword) {
      throw new UnauthorizedException('Thiếu cấu hình tài khoản admin trong .env');
    }

    const isValidUser =
      payload.username === adminUsername && payload.password === adminPassword;

    if (!isValidUser) {
      throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không đúng');
    }

    const tokenPayload = {
      sub: 1,
      username: adminUsername,
      role: 'admin',
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken,
      user: {
        username: adminUsername,
        role: 'admin',
      },
    };
  }
}
