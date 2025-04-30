
import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService

  async allUsers(
    where?: Prisma.UserWhereInput,
  ): Promise<User[]> { 
    return this.prisma.user.findMany({
      where, 
    });
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Omit<User, 'password'> | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }
  
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const userData = { ...data, password: await bcrypt.hash(data.password, 10) };
    return this.prisma.user.create({ data: userData });
    // data.password = await bcrypt.hash(data.password, 10)
    
    // return this.prisma.user.create({
    //   data,
    // });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
