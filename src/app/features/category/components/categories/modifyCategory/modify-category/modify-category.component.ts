import { ActivatedRoute } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CATEGORY_ERRORS } from 'src/app/core/utils/errors/category.errors';
import { Category } from './../../../../models/category.model';
import { CategoryService } from './../../../../services/category-service.service';

@Component({
  selector: 'app-modify-category',
  templateUrl: './modify-category.component.html',
  styleUrls: ['./modify-category.component.scss']
})
export class ModifyCategoryComponent implements OnInit {
  modifyCategoryForm!: FormGroup;

  readonly CATEGORY_ERRORS = CATEGORY_ERRORS;

  categories!: Category[];
  id!: string;
  name!: string;
  description!: string;
  active!:boolean;

  constructor(
    public dialogRef: MatDialogRef<ModifyCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
  ) {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = (!!categories && categories.length > 0 ? categories : [])
    })
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.modifyCategoryForm = new FormGroup({
      description: new FormControl(this.description,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
    });
  }

  cancelModify() {
    this.dialogRef.close();
  }

  modifyCategory(id: string) {
    let newCat = new Category(
      id,
      this.name,
      this.modifyCategoryForm.get('description')?.value,
      this.active,
    )
    this.categoryService.modifyCategory(id, newCat);
    this.dialogRef.close();
  }

  findById(id: string): Category | undefined {
    return this.categories?.find((cat) => {
      if (cat.id === id) {
        return cat;
      }
      return null;
    })
  }

}

function MD_DIALOG_DATA(MD_DIALOG_DATA: any) {
  throw new Error('Function not implemented.');
}

