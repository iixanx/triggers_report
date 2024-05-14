import { Expose, Transform } from 'class-transformer';
import { IsNumber, NotEquals, Min } from 'class-validator';

export class GetUserWordsQueryRequestDto {
  @Expose({
    name: 'user_id',
  })
  @Transform((e) => Number(e.value))
  @IsNumber()
  @NotEquals(NaN)
  @Min(0)
  userId: number;

  @Expose({
    name: 'page',
  })
  @Transform((e) => (e.value === undefined ? 0 : Number(e.value)))
  @IsNumber()
  @NotEquals(NaN)
  @Min(0)
  page: number;
}
