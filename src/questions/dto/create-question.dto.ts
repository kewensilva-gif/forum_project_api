import { IsNotEmpty, IsString } from "class-validator";

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @IsNotEmpty()
  @IsString()
  body: string;
}
