import { MatDialogModule } from '@angular/material/dialog';
import { Address } from './../../../../core/models/address.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Shop } from '../../models/shop.model';
import { ShopsListComponent } from './shops-list.component';
import { ShopService } from '../../shop.service';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment.prod';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ShopsListComponent', () => {
  let component: ShopsListComponent;
  let fixture: ComponentFixture<ShopsListComponent>;
  let service: ShopService;
  let newShop: Shop | undefined;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AngularFireModule.initializeApp(environment.firebase),AngularFireDatabaseModule, MatSnackBarModule, MatDialogModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopService);
    fixture = TestBed.createComponent(ShopsListComponent);
    component = fixture.componentInstance;
    newShop = new Shop("", "TestShopListComponent", new Address("", "", "", 0, "0"), true, []);
  });

  afterEach(async () => {
    if (typeof newShop !== 'undefined') {
      await service.permantlyDelete(newShop.id);
      newShop = undefined;
    }
  });
/*
  it('Deactivate Shop', async () =>{
    if (typeof newShop !== 'undefined') {
      newShop = new Shop("", "TestShopListComponentDeactivateShop", new Address("", "", "", 0, "0"), true, []);
      newShop = await service.addShop(newShop);
      component.deActivateShop(null,newShop);

      newShop = await service.getShop(newShop.name);

      newShop = component.shops.find( shop => shop.name == newShop?.name);
      console.log(newShop);
      expect(newShop?.active).toBeFalse();
    }
  });

  it('Activate Shop', async () =>{
    if (typeof newShop !== 'undefined') {
      newShop = new Shop("", "TestShopListComponentActivateShop", new Address("", "", "", 0, "0"), true, []);
      newShop = await service.addShop(newShop);
      component.deActivateShop(null,newShop);
      component.activateShop(null,newShop);
      newShop = await service.getShop(newShop.name);

      console.log(newShop);
      expect(newShop.active).toBeTrue();
    }
  }); */

});
