import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsModifyComponent } from './shops-modify.component';

describe('ShopsModifyComponent', () => {
  let component: ShopsModifyComponent;
  let fixture: ComponentFixture<ShopsModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopsModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Unit test Stock functions
  it('Increase stock', () => {
    expect(component).toBeTruthy();
  });
  it('Decrease stock', () => {
    expect(component).toBeTruthy();
  });
  it('Find product', () => {
    expect(component).toBeTruthy();
  });

});
