import { Component, OnInit } from '@angular/core';
import { Module } from '../../models/module.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  modules: Module[] = [
    { icon: "people", name: "Users", url: '/users' },
    { icon: "category", name: "Categories", url: '/categories' },
    { icon: "backup", name: "Products", url: '/products' },
    { icon: "shop", name: "Shops", url: '/shops' },
    { icon: "person_add", name: "Sign up", url: '/sign-up' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
