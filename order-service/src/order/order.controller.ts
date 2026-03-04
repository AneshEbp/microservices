import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateOrderDto } from './dtos/update-order.dto';
// import { UpdateOrderDto } from './dtos/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // ------------------------------
  // Create order (call product service)
  // ------------------------------
  @MessagePattern({ cmd: 'create_order_with_product' })
  async createOrder(
    @Payload() data: { productId: string; userId: string; quantity?: number },
  ) {
    const { productId, userId, quantity } = data;
    return this.orderService.createWithProduct(productId, userId, quantity);
  }

  // ------------------------------
  // Get all orders
  // ------------------------------
  @MessagePattern({ cmd: 'get_all_orders' })
  async findAll() {
    return this.orderService.findAll();
  }
  // ------------------------------
  // Get order by ID
  // ------------------------------
  @MessagePattern({ cmd: 'get_order_by_id' })
  async findOne(@Payload() id: string) {
    return this.orderService.findOne(id);
  }

  // ------------------------------
  // Get orders by user
  // ------------------------------
  @MessagePattern({ cmd: 'get_orders_by_user' })
  async findByUser(@Payload() userId: string) {
    return this.orderService.findByUser(userId);
  }

  // ------------------------------
  // Update order
  // ------------------------------
  @MessagePattern({ cmd: 'update_order' })
  async update(
    @Payload() data: { id: string; updateOrderDto: UpdateOrderDto },
  ) {
    const { id, updateOrderDto } = data;
    return this.orderService.update(id, updateOrderDto);
  }

  // ------------------------------
  // Delete order
  // ------------------------------
  @MessagePattern({ cmd: 'delete_order' })
  async remove(@Payload() id: string) {
    await this.orderService.remove(id);
    return { message: `Order with ID ${id} deleted successfully.` };
  }
}
