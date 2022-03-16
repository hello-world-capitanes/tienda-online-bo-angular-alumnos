import { Component, OnInit } from '@angular/core';

export interface shopElement{
  name: String;
}
@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.scss']
})
export class ShopsListComponent implements OnInit {

  shops: shopElement[] = [
    {name:"Shop1"},
    {name:"Shop2"},
    {name:"Shop3"},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
