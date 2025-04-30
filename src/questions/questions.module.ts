import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, PrismaService, AuthGuard],
})
export class QuestionsModule {}
