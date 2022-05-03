import { TestBed } from '@angular/core/testing';
import { Category } from '../models/category.model';
import { CategoryService } from './category-service.service';


describe('CategoryServiceService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryService);
  });

  it('Create category', () => {
    let category=new Category("Aceites","","Aceites",false)
    service.addCategory(category)
    expect(service.categoryExists(category)).toBe(true);
  });

  it('Delete category', () => {
    expect(service.deleteCategory(new Category("", "", "", true))).toBeFalse();
    service.addCategory(new Category("id", "nombre", "descripcion", true));
    service.deleteCategory(new Category("id", "nombre", "descripcion", true));
    expect(service.categoryExists).toBeFalse();
  });
});
