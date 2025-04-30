import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private readonly jwtService: JwtService

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = this.extractTokenFromHeader(request);
    if(!authorization) throw new UnauthorizedException("Token obrigatório");
    
    try {
      const payload = this.jwtService.verify(authorization, {secret: process.env.SECRET_KEY});
      request['sub'] = payload;
    } catch (error) {
      throw new UnauthorizedException("Token inválido")
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers['authorization'];
    if (!authHeader) return undefined;
  
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }  
}
