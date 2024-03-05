/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop({ type: [{ size: String, color: String, price: Number, quantity: Number, images: [String] }] })
    variantPricing: { size: string; color: string; price: number, quantity: number, images: [String] }[];

    @Prop()
    category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);