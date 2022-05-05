import { CategoryService } from './../../../../services/category-service.service';
import { Category } from './../../../../models/category.model';
import { CategoriesComponent } from './../../categories.component';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify-category',
  templateUrl: './modify-category.component.html',
  styleUrls: ['./modify-category.component.scss']
})
export class ModifyCategoryComponent implements OnInit {
  modifyCategoryForm: FormGroup;
  id!:string;

  constructor(private form: FormBuilder,
    public dialogRef: MatDialogRef<CategoriesComponent>,
    private categoryService: CategoryService,
    private activeRoute: ActivatedRoute) {
    this.id = activeRoute.snapshot.params['id'];
    this.modifyCategoryForm = this.form.group({
      name: new FormControl(),
      description: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  getCategory(): Category{
    return this.categoryService.getCategory(this.id);
  }

  categoryModified(){
    console.log=(this.modifyCategoryForm.value);
    if(this.modifyCategoryForm.invalid){
      return;
    }
  }

  cancelModification(){
    this.dialogRef.close();
  }

}
