import { SpanishCpValidator } from 'src/app/core/validators/spanish-cp.validators';
import { Address } from './../../../../core/models/address.model';
import { PROVINCES } from './../../../../core/utils/lists/provinces.list';
import { COUNTRIES } from './../../../../core/utils/lists/countries.list';
import { SHOP_ERRORS } from '../../../../core/utils/errors/shop.erros';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../../shop.service';
import { Shop } from '../../models/shop.model';

@Component({
  selector: 'app-shops-create',
  templateUrl: './shops-create.component.html',
  styleUrls: ['./shops-create.component.scss']
})
export class ShopsCreateComponent implements OnInit {

  @Output() anadirOutPut = new EventEmitter<any>();
  panelOpenState = false;

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

      let address = new Address(country, province, location, cp, street);

      let newShop = new Shop("9887465",name, address, true, []);

      this.shopService.addShop(newShop);
    }
  }

  resetValidatorsByProvinceSelected(province: string, country: string){
    if (province && country){
      this.formGroupShop.get('cp')?.clearValidators();
      this.formGroupShop.get('cp')?.addValidators(Validators.required);
      this.formGroupShop.get('cp')?.updateValueAndValidity();
      if (country == 'España'){
        this.formGroupShop.get('cp')?.addValidators(SpanishCpValidator.isValidNumber(province));
        this.formGroupShop.get('cp')?.updateValueAndValidity();
      }
    }
  }

}
