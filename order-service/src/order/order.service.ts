import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { Order, OrderDocument } from 'src/models/order.model';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
  ) {}

  async createWithProduct(
    productId: string,
    userId: string,
    quantity: number = 1,
  ) {
    // call from product microservice
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const product = await firstValueFrom(
      this.productClient.send({ cmd: 'get_product_by_id' }, productId),
    );

    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    // 2️⃣ Create order snapshot
    const order = new this.orderModel({
      userId,
      productId,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      productName: product.name,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      price: product.price * quantity,
      status: 'PENDING',
    });

    return order.save();
  }

  // ------------------------------
  // 1️⃣ Get all orders
  // ------------------------------
  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  // ------------------------------
  // 2️⃣ Get a single order by ID
  // ------------------------------
  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
    return order;
  }

  // ------------------------------
  // 3️⃣ Get all orders for a specific user
  // ------------------------------
  async findByUser(userId: string): Promise<Order[]> {
    return this.orderModel.find({ userId }).exec();
  }

  // ------------------------------
  // 4️⃣ Update an order
  // ------------------------------
  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const updated = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException(`Order with ID ${id} not found`);
    return updated;
  }

  // ------------------------------
  // 5️⃣ Delete an order
  // ------------------------------
  async remove(id: string): Promise<void> {
    const deleted = await this.orderModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Order with ID ${id} not found`);
  }
}
