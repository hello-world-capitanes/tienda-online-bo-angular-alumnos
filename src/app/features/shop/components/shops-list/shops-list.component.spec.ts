import { Address } from './../../../../core/models/address.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Shop } from '../../models/shop.model';

import { ShopsListComponent } from './shops-list.component';

describe('ShopsListComponent', () => {

  let component: ShopsListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopsListComponent ]
    })
    .compileComponents();
  });

});
