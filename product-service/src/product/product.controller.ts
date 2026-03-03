import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
      constructor(private readonly productService: ProductService) {}
 // ------------------------------
  // List all products (public)
  // ------------------------------
//   @Get()
  @MessagePattern({cmd:'get_all_products'})
  async findAll() {
    return this.productService.findAll();
  }

  // ------------------------------
  // Get a single product by ID (public)
  // ------------------------------
//   @Get(':id')
@MessagePattern({cmd:'get_product_by_id'})
  async findOne(@Payload() id: string) {
    return this.productService.findOne(id);
  }

  // ------------------------------
  // Create a product (trusted/internal)
  // ------------------------------
//   @Post()
  @MessagePattern({ cmd: 'create_product' })
  async create(@Payload() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // ------------------------------
  // Update a product (trusted/internal)
  // ------------------------------
//   @Patch(':id')

  @MessagePattern({ cmd: 'update_product' })
  async update(
    @Payload()
     data: { id: string; updateProductDto: UpdateProductDto },
  ) {
    return this.productService.update(data.id, data.updateProductDto);
  }

  // ------------------------------
  // Delete a product (trusted/internal)
  // ------------------------------
//   @Delete(':id')
  @MessagePattern({ cmd: 'delete_product' })
  async remove(@Payload() id: string) {
    await this.productService.remove(id);
    return { message: `Product with ID ${id} deleted successfully.` };
  }
}
