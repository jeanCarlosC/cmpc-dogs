import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '../common/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() credentials: { username: string; password: string }): Promise<ApiResponse<{ accessToken: string }>> {
    const user = await this.authService.validateUser(credentials.username, credentials.password);
    if (!user) {
      return new ApiResponse(null, 'Credenciales inválidas', 401);
    }

    const accessToken = this.authService.generateAccessToken(user);
    return new ApiResponse({ accessToken }, 'Login exitoso', 200);
  }
}