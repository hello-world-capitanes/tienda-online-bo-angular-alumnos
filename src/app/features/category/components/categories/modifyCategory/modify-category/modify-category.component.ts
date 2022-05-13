import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from './../../../../models/category.model';
import { CategoryService } from './../../../../services/category-service.service';

@Component({
  selector: 'app-modify-category',
  templateUrl: './modify-category.component.html',
  styleUrls: ['./modify-category.component.scss']
})
export class ModifyCategoryComponent implements OnInit {
  modifyCategoryForm!: FormGroup;

  categories!: Category[];
  id!: string;

  constructor(
    public dialogRef: MatDialogRef<ModifyCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService
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
      id: new FormControl(''),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      description: new FormControl('', [
        Validators.required
      ]),
    });
  }

  modifyCategory(id: string) {
    let newCat = new Category(
      id,
      this.modifyCategoryForm.get('name')?.value,
      this.modifyCategoryForm.get('description')?.value,
      true,
      []
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

