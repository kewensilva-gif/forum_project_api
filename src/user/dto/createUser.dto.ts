import { IsAlpha, IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class CreateUserDto {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  name: string | null;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsAlphanumeric()
  @IsNotEmpty()
  password: string;
}