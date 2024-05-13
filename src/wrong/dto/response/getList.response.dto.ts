export class GetListResponseDto {
  words: Words[];
}

export class Words {
  word_id: number;

  word: string;

  mean: string;
}
