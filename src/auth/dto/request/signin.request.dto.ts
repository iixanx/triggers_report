import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class SignInRequestDto {
  @Expose({
    name: 'email',
  })
  @IsString()
  @IsEmail()
  email: string;

  @Expose({
    name: "password",
  })
  @IsString()
  password: string;
}
