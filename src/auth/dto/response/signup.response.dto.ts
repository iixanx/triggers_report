import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";

export class SignUpResponseDto {
  @Expose({
    name: "user_id"
  })
  @IsNumber()
  userId: number;
}