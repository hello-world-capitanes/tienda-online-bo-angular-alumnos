import { Component, OnInit, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shops-create',
  templateUrl: './shops-create.component.html',
  styleUrls: ['./shops-create.component.scss']
})
export class ShopsCreateComponent implements OnInit {

  name:string="";
  value:string="";

  @Output() updateList = new EventEmitter<string[]>();
  constructor() { }

  ngOnInit(): void {
  }

  sendValues(){
    this.updateList.emit([this.name,this.value]);
  }

}
