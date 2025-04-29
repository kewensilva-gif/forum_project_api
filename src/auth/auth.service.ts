import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserService;

  async signin(params: Prisma.UserCreateInput): Promise<Omit<User, "password">> {
    const user = await this.userService.user({ email: params.email })
    if(!user) throw new NotFoundException('Usuário não encontrado');

    const passwordMatch = await bcrypt.compare(user.password, params.password);

    if(!passwordMatch) throw new UnauthorizedException("Credenciais inválidas");

    const { password, ...result } = user;
    return result;
  }
}
