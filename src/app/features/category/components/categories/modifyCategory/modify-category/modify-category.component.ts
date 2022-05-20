import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  active!:boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModifyCategoryComponent>,
    private categoryService: CategoryService
  ) {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = (!!categories && categories.length > 0 ? categories : [])
    })
    this.modifyCategoryForm = new FormGroup({
      description: new FormControl
      (data.description, 
        [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.createForm();
    this.updateForm();
  }

  createForm() {
    this.modifyCategoryForm = new FormGroup({
      description: new FormControl('', [
        Validators.required
      ]),
    });
  }

  updateForm(){
    this.modifyCategoryForm.patchValue({
      description:this.data.description,
    })
  }

  modifyCategory(id: string) {
    if(this.modifyCategoryForm.invalid){
      return;
    }
    let newCat = new Category(
      id,
      this.modifyCategoryForm.value.name,
      this.modifyCategoryForm.value.description,
      this.active,
    )
    this.categoryService.modifyCategory(id, newCat);
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }

}

function MD_DIALOG_DATA(MD_DIALOG_DATA: any) {
  throw new Error('Function not implemented.');
}

