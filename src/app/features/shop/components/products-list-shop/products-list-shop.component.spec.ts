import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListShopComponent } from './products-list-shop.component';

describe('ProductsListShopComponent', () => {
  let component: ProductsListShopComponent;
  let fixture: ComponentFixture<ProductsListShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsListShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
