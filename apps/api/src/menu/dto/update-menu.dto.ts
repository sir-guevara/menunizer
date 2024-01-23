import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum StatusEnum {
  PROCESSING = 'processing',
  COMPLETED = 'completed',
}

export class UpdtateOrderDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(StatusEnum)
  status: string;
}
