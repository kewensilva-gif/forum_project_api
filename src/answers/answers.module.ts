import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService, AuthGuard, PrismaService],
})
export class AnswersModule {}
