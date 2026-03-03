import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({timestamps:true})
export class Product{
    @Prop({required:true})
    name:string

    @Prop({required:true})
    price:number
}

export type ProductDocument = HydratedDocument<Product>
export const ProductSchema=SchemaFactory.createForClass(Product)