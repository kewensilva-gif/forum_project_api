import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AnswersService {
  @Inject()
  private readonly prisma: PrismaService;

  create(createAnswerDto: CreateAnswerDto, userId: number, questionId: number) {
    const newAnswer = {
      body: createAnswerDto.body,
      user: {
        connect: {
          id: userId
        }
      },
      question: {
        connect: {
          id: questionId
        }
      }
    };
    console.log("body", newAnswer.body)
    return this.prisma.answers.create({
      data: newAnswer
    });
  }

  async findAll() {
      return await this.prisma.questions.findMany();
    }
    
    async findOne(id: number) {
      return await this.prisma.questions.findUnique({ where: { id } });
    }
  
    async update(id: number, updateAnswerDto: UpdateAnswerDto) {
      return await this.prisma.questions.update({
        where: { id },
        data: updateAnswerDto
      });
    }
  
    remove(id: number) {
      return this.prisma.questions.delete({ where: { id } })
    }
}
