import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('api')
export class ApiController {
  constructor(
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
    @Inject('PRODUCT_SERVICE') private productClient: ClientProxy,
    @Inject('ORDER_SERVICE') private orderClient: ClientProxy,
  ) {}

  // ------------------------------
  // Auth: login
  // ------------------------------
  @Post('auth/login')
  async login(@Body() data: any) {
    return firstValueFrom(this.authClient.send({ cmd: 'login_user' }, data));
  }

  @Post('auth/register')
  async register(@Body() data: any) {
    console.log(data);
    try {
      const result = await firstValueFrom(
        this.authClient.send({ cmd: 'register_user' }, data),
      );
      return result;
    } catch (error) {
      console.error('Error in register:', error);
      throw error;
    }
  }

  // ------------------------------
  // Product: list all
  // ------------------------------
  @Get('products')
  async getProducts() {
    return firstValueFrom(
      this.productClient.send({ cmd: 'get_all_products' }, {}),
    );
  }

  // ------------------------------
  // Order: create order
  // ------------------------------
  @Post('orders')
  async createOrder(
    @Body() data: { productId: string; userId: string; quantity?: number },
  ) {
    return firstValueFrom(
      this.orderClient.send({ cmd: 'create_order_with_product' }, data),
    );
  }

  // ------------------------------
  // Order: get orders by user
  // ------------------------------
  @Get('orders/user/:userId')
  async getOrdersByUser(@Param('userId') userId: string) {
    return firstValueFrom(
      this.orderClient.send({ cmd: 'get_orders_by_user' }, userId),
    );
  }
}
