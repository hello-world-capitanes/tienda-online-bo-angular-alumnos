import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { ProductComponent } from './product.component';
//TODO
describe('ProductComponent', () => {
 /*  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
      ],
      declarations: [ProductComponent],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Test de la funcion añadir producto', () => {
    component.productForm.setValue({
      id: '',
      name: 'Sal',
      characteristics: 'Un poco de sal',
      price: 10.0,
      description: 'Un poco de sal',
      categories: 'Lacteos',
    });
    expect(component.newProduct()).toBe(true);
  });
  it('Test de la funcion añadir producto con valores no validos', () => {
    component.productForm.setValue({
      id: '',
      name: 'Sal',
      characteristics: 'Un poco de sal',
      price: 'aaa',
      description: '',
      categories: 'Lacteos',
    });
    expect(component.newProduct()).toBe(false);
  }); */
});
