import {
  IsInt,
  IsOptional,
} from 'class-validator';

export class GetTasksDto {
  @IsOptional()
  @IsInt()
  categoryId?: number;
}
