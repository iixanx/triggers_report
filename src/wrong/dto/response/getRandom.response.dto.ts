import { Mean } from '@prisma/client';

export class GetRandomResponseDto {
  word_id: number;

  word: string;

  means: Mean[];
}
