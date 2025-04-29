import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post()
  signin(@Body() body: Prisma.UserCreateInput) {
    return this.authService.signin(body);
  }
}
