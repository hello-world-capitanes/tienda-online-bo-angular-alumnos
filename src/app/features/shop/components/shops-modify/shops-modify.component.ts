import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shops-modify',
  templateUrl: './shops-modify.component.html',
  styleUrls: ['./shops-modify.component.scss']
})
export class ShopsModifyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  increaseStock(addedStock: number){
    return;
  }
  decreaseStock(addedStock: number){
    return;
  }

}
