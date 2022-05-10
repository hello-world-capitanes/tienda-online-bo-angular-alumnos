import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SHOP_ERRORS } from 'src/app/core/utils/errors/shop.erros';
import { COUNTRIES } from 'src/app/core/utils/lists/countries.list';
import { PROVINCES } from 'src/app/core/utils/lists/provinces.list';
import { SpanishCpValidator } from 'src/app/core/validators/spanish-cp.validators';

@Component({
  selector: 'app-modify-info-shops',
  templateUrl: './modify-info-shops.component.html',
  styleUrls: ['./modify-info-shops.component.scss']
})
export class ModifyInfoShopsComponent implements OnInit {

  id!: string;


  readonly SHOP_ERRORS = SHOP_ERRORS;

  readonly COUNTRIES = COUNTRIES;
  readonly PROVINCES = PROVINCES;
  formGroupShop: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroupShop = new FormGroup({
      /*name: new FormControl(this.data.name,[Validators.required]),
      country: new FormControl(this.data.address.country, Validators.required),
      province: new FormControl(this.data.address.province, Validators.required),
      location: new FormControl(this.data.address.location, Validators.required),
      street: new FormControl(this.data.address.street, Validators.required),
      cp: new FormControl(this.data.address.cp, Validators.required),
      active: new FormControl(this.data.active),
      products: new FormGroup(this.data.products)*/
    })
   }

  ngOnInit(): void {

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

  modifyShop(){

  }

}
