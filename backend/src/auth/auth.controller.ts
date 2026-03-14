import { Body, Controller, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

const ACCESS_TOKEN_COOKIE = 'mtpc_admin_access_token';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  private getCookieOptions() {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    return {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: isProduction,
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
    };
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(loginDto);
    response.cookie(ACCESS_TOKEN_COOKIE, result.accessToken, this.getCookieOptions());
    return {
      user: result.user,
    };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(ACCESS_TOKEN_COOKIE, {
      ...this.getCookieOptions(),
      maxAge: undefined,
    });
    return {
      success: true,
      message: 'Đăng xuất thành công',
    };
  }
}
