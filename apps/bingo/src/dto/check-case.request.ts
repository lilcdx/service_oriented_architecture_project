import { IsInt, Min, Max } from 'class-validator';

export class CheckCaseRequest {
  @IsInt()
  @Min(0)
  @Max(4) 
  rowIndex: number;

  @IsInt()
  @Min(0)
  @Max(4) 
  colIndex: number;
}
