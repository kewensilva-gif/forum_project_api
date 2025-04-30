import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { Prisma, User as UserModel } from 'generated/prisma';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  async signupUser(
    @Body(new ValidationPipe()) userData: CreateUserDto,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Omit<UserModel, 'password'>> 
  {
    const user = await this.userService.user({ id: id });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllUser(): Promise<UserModel[]> {
    const users = await this.userService.allUsers();
    return users;
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) userData: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.updateUser(
      { 
        where: {id: id}, 
        data: userData
      }
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number
  ): Promise<UserModel> 
  {
    return this.userService.deleteUser({ id: id });
  }
}
