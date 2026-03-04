import { IsString, IsNumber, IsEnum, IsOptional, Min } from 'class-validator';
import { OrderStatus } from './create-order.dto';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  productId?: string;

  @IsString()
  @IsOptional()
  productName?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
