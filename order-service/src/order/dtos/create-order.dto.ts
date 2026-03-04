import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  Min,
} from 'class-validator';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  CANCELLED = 'CANCELLED',
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userId: string; // Microservice user ID

  @IsString()
  @IsNotEmpty()
  productId: string; // Microservice product ID

  @IsString()
  @IsNotEmpty()
  productName: string; // Snapshot of product name

  @IsNumber()
  @Min(0)
  price: number; // Snapshot of product price

  @IsEnum(OrderStatus)
  @IsOptional() // Defaults to PENDING if not provided
  status?: OrderStatus;
}
