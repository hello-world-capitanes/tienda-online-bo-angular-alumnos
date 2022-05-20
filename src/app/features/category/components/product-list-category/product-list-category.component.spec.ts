import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListCategoryComponent } from './product-list-category.component';

describe('ProductListCategoryComponent', () => {
  let component: ProductListCategoryComponent;
  let fixture: ComponentFixture<ProductListCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
