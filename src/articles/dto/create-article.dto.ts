import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateArticleDto {
  @MinLength(1)
  @MaxLength(500)
  title: string;

  @IsNotEmpty()
  content: string;

  author: string;
}
