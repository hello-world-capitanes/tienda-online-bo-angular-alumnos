import { async, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { CategoryService } from './category-service.service';


describe('CategoryServiceService', () => {
  let service: CategoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
      ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryService);
  });

  it('Create category', () => {
    let category=new Category("Aceites","","Aceites",false)
    service.addCategory(category)
    expect(service.categoryExists(category).then( value => {

      if (value?.active == true){
        return true;
      } else {
        return false;
      }
    }
      )).toBeTruthy();
  });

/*   it('Delete category', () => {
    service.addCategory(new Category("id", "nombre", "descripcion", true));
    service.deleteCategory(new Category("id", "nombre", "descripcion", true));
    expect(service.categoryExists).toBeFalse();
  }); */
});
