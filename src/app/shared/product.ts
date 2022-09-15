import { Rating } from "./rating";

export interface Product {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    title: string;
    rating: Rating;
}