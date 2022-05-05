import { Category } from './../../category/models/category.model';
export interface ProductDB{
  id: string;
  name: string;
  characteristics: string;
  price: number;
  description: string;
  catgories: Category[];
  image: string;
  active: boolean;
}
