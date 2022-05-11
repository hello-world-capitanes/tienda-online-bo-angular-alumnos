import { async, TestBed } from '@angular/core/testing';
import { Address } from 'src/app/core/models/address.model';
import { Shop } from './models/shop.model';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { ShopService } from './shop.service';

describe('ShopService', () => {
  let service: ShopService;
  let newShop: Shop | undefined;
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
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopService);
    newShop = new Shop("id", "name", new Address("", "", "", 0, "0"), true, []);
  });
  afterEach(async () => {

    if (!!newShop) {
      await service.permantlyDelete(newShop.id);
      newShop = undefined;
    }
  });

  it('Delete shop', async () => {
    if (!!newShop) {
      newShop = await service.addShop(newShop);
      await service.deleteShop(newShop);

      newShop = await service.getShop(newShop.name);
      expect(newShop.active).toBeFalse();
    }

  });

  it('Add shop', async () => {
    if (!!newShop) {
      newShop = await service.addShop(newShop);

      newShop = await service.getShop(newShop.name);
      expect(newShop.active).toBeTruthy();
    }

  })

});
