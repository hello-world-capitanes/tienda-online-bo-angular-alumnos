import { Address } from './../../../../core/models/address.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Shop } from '../../models/shop.model';

import { ShopsListComponent } from './shops-list.component';

describe('ShopsListComponent', () => {
  let component: ShopsListComponent;
  let fixture: ComponentFixture<ShopsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopsListComponent ]
    })
    .compileComponents();
  });

  it('add', () => {
    let address = new Address("España", "Soria", "Soria", 42004, "Calle Melancolía, Nº13")
    let newShop = new Shop("Nombre", address);
    expect(newShop).toBeDefined();
  })

});
