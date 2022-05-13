import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInSidebarComponent } from './sign-in-sidebar.component';

describe('SignInSidebarComponent', () => {
  let component: SignInSidebarComponent;
  let fixture: ComponentFixture<SignInSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
