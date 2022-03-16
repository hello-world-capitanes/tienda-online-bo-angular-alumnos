import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shops-create',
  templateUrl: './shops-create.component.html',
  styleUrls: ['./shops-create.component.scss']
})
export class ShopsCreateComponent implements OnInit {

  @Output() anadirOutPut = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  formGroupShop = new FormGroup({
    name: new FormControl(''),
    value: new FormControl(''),
  });

  anadirShop(){
    let name = this.formGroupShop.controls["name"].value;
    let value = this.formGroupShop.controls["value"].value;

    let objCreado = {name: name, value: value};

    this.anadirOutPut.emit(objCreado);

  }
}