import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Category } from './../../../../models/category.model';
import { CategoryService } from './../../../../services/category-service.service';
import { CategoriesComponent } from './../../categories.component';

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

/*   categoryModified(){
    console.log=(this.modifyCategoryForm.value);
    if(this.modifyCategoryForm.invalid){
      return;
    }
  } */

  cancelModification(){
    this.dialogRef.close();
  }

  categoryModified() {
    let bool: boolean;
    if (!this.modifyCategoryForm.valid) {
      return;
    }

    let category = new Category(this.modifyCategoryForm.get('name')?.value,
      this.modifyCategoryForm.get('id')?.value,
      this.modifyCategoryForm.get('description')?.value,
      true)

    this.categoryService.modifyCategory(category);
    this.modifyCategoryForm.reset();
  }

}
