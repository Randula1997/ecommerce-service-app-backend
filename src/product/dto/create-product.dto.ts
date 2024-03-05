/* eslint-disable prettier/prettier */
export class CreateProductDTO {
    name: string; 
    description: string;
    variantPricing: { size: string; color: string; price: number, quantity: number, images: string[] }[];
    category: string;
}