import { ShopService } from './../../shop.service';
import { Shop } from './../../models/shop.model';
import { Address } from './../../../../core/models/address.model';
import { PROVINCES } from './../../../../core/utils/lists/provinces.list';
import { COUNTRIES } from './../../../../core/utils/lists/countries.list';
import { SHOP_ERRORS } from '../../../../core/utils/errors/shop.erros';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shops-create',
  templateUrl: './shops-create.component.html',
  styleUrls: ['./shops-create.component.scss']
})
export class ShopsCreateComponent implements OnInit {

  @Output() anadirOutPut = new EventEmitter<any>();

  readonly SHOP_ERRORS = SHOP_ERRORS;

  readonly COUNTRIES = COUNTRIES;
  readonly PROVINCES = PROVINCES;

  constructor(
    private shopService: ShopService
  ) { }

  ngOnInit(): void {
  }

  formGroupShop = new FormGroup({
    name: new FormControl('',Validators.required),
    country: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    cp: new FormControl('', Validators.required),
  });

  addShop(){
    if(this.formGroupShop.valid){
      let name = this.formGroupShop.controls["name"].value;
      let country = this.formGroupShop.controls["country"].value;
      let province = this.formGroupShop.controls["province"].value;
      let location = this.formGroupShop.controls["location"].value;
      let street = this.formGroupShop.controls["street"].value;
      let cp = this.formGroupShop.controls["cp"].value;

      let addres = new Address(country, province, location, cp, street);

      let newShop = new Shop(name, addres);

      this.shopService.addShop(newShop);
    }


  }
}
