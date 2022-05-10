import { PROVINCES, Province } from "../utils/lists/provinces.list";
import { AbstractControl, ValidatorFn } from '@angular/forms';

export class SpanishCpValidator{

  static provinces = PROVINCES;

  static isValidNumber(province: string | null): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return this._isCorrectNumber(control.value, province) == null
        ? null
        : {resultado: 'Incorrecto'}
    };
  }

  private static _isCorrectNumber(value: string, province: string | null){
    if(!value){
      return null;
    }


    let validRegEx = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;

    if(!validRegEx.test(value)){
      return { resultado: 'Incorrecto'};
    }else{

      if(province){

        let provinceFound: Province | undefined  = this.provinces.find(element => element.name == province);

        if(provinceFound){

          if(value.slice(0,2) == provinceFound.cod){
            return null;

          }else{
            return { resultado: 'Incorrecto'};
          }
        }else{
          return { resultado: 'Incorrecto'};
        }
      }else{
        return null;
      }
    }
  }

}
