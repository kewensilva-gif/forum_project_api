import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { Prisma, User as UserModel } from 'generated/prisma';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  async signupUser(
    @Body() userData:Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserModel> {
    const user = await this.userService.user({ id: Number(id) });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  @Get()
  async getAllUser(): Promise<UserModel[]> {
    const users = await this.userService.allUsers();
    return users;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: Prisma.UserUpdateInput,
  ): Promise<UserModel> {
    return this.userService.updateUser(
      { 
        where: {id: Number(id)}, 
        data: userData
      }
    );
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string
  ): Promise<UserModel> 
  {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
