import { Component, OnInit } from '@angular/core';
import { Module } from '../../models/module.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  modules: Module[] = [
    { icon: "people", name: "Users" },
    { icon: "tag", name: "Categories" },
    { icon: "backup", name: "Products" },
    { icon: "shop", name: "Shops" },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}