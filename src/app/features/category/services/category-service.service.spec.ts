import { TestBed } from '@angular/core/testing';
import { Category } from '../models/category.model';

import { CategoryService } from './category-service.service';

describe('CategoryServiceService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryService);
  });

  it('Crear categoría', () => {
    let category=new Category("123","Productos Lácteos",true)
    service.addCategory(category)
    expect(service.categoryExists(category)).toBe(true);
  });
});
