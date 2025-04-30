import { Answer } from "src/answers/entities/answer.entity";
import { User } from "src/user/entities/user.entity";

export class Question implements Question {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  answers: Answer;
}
