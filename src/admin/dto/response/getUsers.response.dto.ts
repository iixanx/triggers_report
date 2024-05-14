import { Expose } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class GetUsersResponseDto {
  @IsArray()
  @IsOptional()
  @Length(0, 10)
  users: User[];
}

export class User {
  @Expose({
    name: 'user_id',
  })
  @IsNumber()
  @Min(0)
  userId: number;

  @Expose({
    name: 'name',
  })
  @IsString()
  name: string;

  @Expose({
    name: 'email',
  })
  @IsString()
  @IsEmail()
  email: string;

  @Expose({
    name: 'coin',
  })
  @IsNumber()
  @Min(0)
  coin: number;
}
