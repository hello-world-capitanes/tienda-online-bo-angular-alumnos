import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsCreateComponent } from './shops-create.component';

describe('ShopsCreateComponent', () => {
  let component: ShopsCreateComponent;
  let fixture: ComponentFixture<ShopsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
