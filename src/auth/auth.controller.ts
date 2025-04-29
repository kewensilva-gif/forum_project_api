import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { AuthService } from './auth.service';

@Controller('auth/login')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post()
  @HttpCode(HttpStatus.OK)
  signin(@Body() body: Prisma.UserCreateInput) {
    return this.authService.signin(body);
  }
}
