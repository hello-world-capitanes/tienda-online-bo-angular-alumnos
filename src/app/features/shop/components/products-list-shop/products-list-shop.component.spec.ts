import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { Category } from 'src/app/features/category/models/category.model';
import { Product } from 'src/app/features/product/models/product-models';
import { ProductStock } from 'src/app/features/product/models/product-stock.model';
import { environment } from 'src/environments/environment.prod';

import { ProductsListShopComponent } from './products-list-shop.component';

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
