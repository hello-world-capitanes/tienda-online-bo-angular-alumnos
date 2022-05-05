import { Category } from './../../category/models/category.model';
export interface ProductDB{
  id: string;
  name: string;
  characteristics: string;
  price: number;
  description: string;
  categories: Category[];
  image: string;
  active: boolean;
}
