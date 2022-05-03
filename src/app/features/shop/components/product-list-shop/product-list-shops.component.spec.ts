import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListShopComponent } from './product-list-shop.component';

describe('ProductListShopComponent', () => {
  let component: ProductListShopComponent;
  let fixture: ComponentFixture<ProductListShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
