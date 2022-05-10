import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  modifyCategoryForm!: FormGroup;
  id!: string;
  categories!: Category[];

  constructor(
    private form: FormBuilder,
    private activeRoute: ActivatedRoute,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoriesComponent>) {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = (!!categories && categories.length > 0 ? categories : [])
    })
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.modifyCategoryForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
    })
  }

  cancelModification() {
    this.dialogRef.close();
  }

  categoryModified(id: string) {
    let newCat = new Category(
      id,
      this.modifyCategoryForm.value.name,
      this.modifyCategoryForm.value.description,
      true
    )
    this.categoryService.categoryModified(id, newCat);
    this.dialogRef.close();
  }

  findById(id: string): Category | undefined{
    return this.categories?.find((cat) => {
      if(cat.id === id){
        return cat;
      }
      return null;
    })
  }

}
