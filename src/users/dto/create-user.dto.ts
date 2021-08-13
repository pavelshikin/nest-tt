import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "Не может быть пустым" })
  @IsEmail({}, { message: "Некорректный email" })
  readonly email: string;

  @IsString({ message: "Должно быть строкой" })
  @Length(6, 16, { message: "Не меньше 6 и не более 16" })
  readonly password: string;

  readonly username: string;
}