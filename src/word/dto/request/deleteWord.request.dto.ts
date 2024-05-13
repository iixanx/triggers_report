import { Expose, Transform } from "class-transformer";
import { IsNumber, IsNumberString, NotEquals } from "class-validator";

export class DeleteWordParamRequestDto {
  @Expose({
    name: "word_id"
  })
  @Transform(e => Number(e))
  @IsNumber()
  @NotEquals(NaN)
  wordId: number;
}

export class DeleteWordRequestDto {
  
}