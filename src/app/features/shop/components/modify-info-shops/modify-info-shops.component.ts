import { ShopService } from './../../shop.service';
import { ProductStock } from 'src/app/features/product/models/product-stock.model';
import { Product } from 'src/app/features/product/models/product-models';
import { Address } from 'src/app/core/models/address.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SHOP_ERRORS } from 'src/app/core/utils/errors/shop.erros';
import { COUNTRIES } from 'src/app/core/utils/lists/countries.list';
import { PROVINCES } from 'src/app/core/utils/lists/provinces.list';
import { SpanishCpValidator } from 'src/app/core/validators/spanish-cp.validators';
import { Shop } from '../../models/shop.model';
import { ProductShopFirebase } from 'src/app/features/product/models/product-shop-firebase.model';

@Component({
  selector: 'app-modify-info-shops',
  templateUrl: './modify-info-shops.component.html',
  styleUrls: ['./modify-info-shops.component.scss']
})
export class ModifyInfoShopsComponent implements OnInit {

  id!: string;
  name!: string;
  active!: boolean;
  productsStock!: ProductShopFirebase[];


  readonly SHOP_ERRORS = SHOP_ERRORS;

  readonly COUNTRIES = COUNTRIES;
  readonly PROVINCES = PROVINCES;
  formGroupShop: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shopService: ShopService,
    public dialogRef: MatDialogRef<ModifyInfoShopsComponent>,
  ) {
    this.formGroupShop = new FormGroup({
      country: new FormControl
        (this.data.address.country,
          [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)]
        ),
      province: new FormControl
        (this.data.address.province,
          [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)]
        ),
      location: new FormControl
        (this.data.address.location,
          [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)]
        ),
      street: new FormControl
        (this.data.address.street,
          [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)]
        ),
      cp: new FormControl
        (this.data.address.cp,
          [Validators.required]
        ),
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

  modifyShop(id: string){
    if(this.formGroupShop.invalid){
      return
    }
    let newAddress = new Address(
      this.formGroupShop.value.country,
      this.formGroupShop.value.province,
      this.formGroupShop.value.location,
      this.formGroupShop.value.cp,
      this.formGroupShop.value.street,
    )
    let newShop = new Shop(
      id,
      this.name,
      newAddress,
      this.active,
      []
    )
    this.shopService.modifyShop(id, newShop);
    this.closeModal();
  }

  closeModal(){
    this.dialogRef.close();
  }

}
