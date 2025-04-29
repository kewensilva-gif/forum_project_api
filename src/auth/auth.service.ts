import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserService;
  @Inject()
  private readonly jwtService: JwtService

  async signin(params: Prisma.UserCreateInput): Promise<{ access_token: string }> {
    const user = await this.userService.user({ email: params.email })

    if(!user) throw new NotFoundException('Usuário não encontrado');
    const passwordMatch = await bcrypt.compare(params.password, user.password);

    if(!passwordMatch) throw new UnauthorizedException("Credenciais inválidas");

    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}