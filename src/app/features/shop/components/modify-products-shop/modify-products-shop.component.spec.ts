import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProductsShopComponent } from './modify-products-shop.component';

describe('ModifyProductsShopComponent', () => {
  let component: ModifyProductsShopComponent;
  let fixture: ComponentFixture<ModifyProductsShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyProductsShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyProductsShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
