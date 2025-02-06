import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateBingoRequest {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(3x3|4x4|5x5)$/, {
    message: 'Size must be either 3x3, 4x4, or 5x5',
  })
  size: string;
}
