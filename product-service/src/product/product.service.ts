import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/models/product.model';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel:Model<ProductDocument>){}
     // Create a new product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

   // Get all products
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // Get a single product by ID
  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

   // Update a product
  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return updatedProduct;
  }
 // Delete a product
  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Product with ID ${id} not found`);
  }
}
