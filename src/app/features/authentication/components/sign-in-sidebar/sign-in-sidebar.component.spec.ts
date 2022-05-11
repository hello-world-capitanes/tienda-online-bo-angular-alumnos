import { MatSnackBarModule} from '@angular/material/snack-bar';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { SignInSidebarComponent } from './sign-in-sidebar.component';

describe('SignInSidebarComponent', () => {
  let component: SignInSidebarComponent;
  let fixture: ComponentFixture<SignInSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        MatSnackBarModule],
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
