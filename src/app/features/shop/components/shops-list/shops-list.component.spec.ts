import { Address } from './../../../../core/models/address.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Shop } from '../../models/shop.model';

import { ShopsListComponent } from './shops-list.component';
import { ShopService } from '../../shop.service';

describe('ShopsListComponent', () => {

  let component: ShopsListComponent;
  let service: ShopService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopsListComponent ]
    })
    .compileComponents();
  });





});
