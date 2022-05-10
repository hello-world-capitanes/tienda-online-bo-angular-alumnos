import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyInfoShopsComponent } from './modify-info-shops.component';

describe('ModifyInfoShopsComponent', () => {
  let component: ModifyInfoShopsComponent;
  let fixture: ComponentFixture<ModifyInfoShopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyInfoShopsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyInfoShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
