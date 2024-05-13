import { User } from "@prisma/client";
import { Expose } from "class-transformer";

export class NewWordRequestDto {
  @Expose({
    name: "word"
  })
  word: string;

  @Expose({
    name: "mean"
  })
  mean: string;

  user: User;
}