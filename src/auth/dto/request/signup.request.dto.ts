import { Expose } from 'class-transformer';
import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';

export class SignUpRequestDto {
  @Expose({
    name: 'name',
  })
  @IsString()
  @Length(1, 15)
  name: string;

  @Expose({
    name: 'email',
  })
  @IsString()
  @IsEmail()
  @Length(5, 50)
  email: string;

  @Expose({
    name: 'password',
  })
  @IsString()
  @Length(8, 50)
  password: string;

  @Expose({
    name: 'is_admin',
  })
  @IsBoolean()
  isAdmin: boolean;
}
