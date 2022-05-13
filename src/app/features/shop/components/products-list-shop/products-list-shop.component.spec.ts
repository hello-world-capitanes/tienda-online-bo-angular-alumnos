import { async, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment.prod';


describe('ProductsListShopComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [RouterTestingModule,
            AngularFireModule.initializeApp(environment.firebase),
            AngularFireDatabaseModule,
            MatSnackBarModule
          ],

        })
          .compileComponents();
      }));
});
