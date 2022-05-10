import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(private form: FormBuilder,
    public dialogRef: MatDialogRef<CategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private activeRoute: ActivatedRoute) {
    this.id = activeRoute.snapshot.params['id'];
    this.modifyCategoryForm = this.form.group({
      name: new FormControl
        (data.name,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ]
        ),
      description: new FormControl
        (data.description,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]
        ),
    });
  }

  get errorMessageName(): string {
    const form: FormControl = (this.modifyCategoryForm.get('name') as FormControl);
    return form.hasError('required') ?
      'Enter a name for the category' :
      form.hasError('minlength') ?
        'The name must have at least 3 characters' :
        form.hasError('maxlength') ?
          'The name must have maximum 20 characters' : '';
  }

  get errorMessageDescription(): string {
    const form: FormControl = (this.modifyCategoryForm.get('description') as FormControl);
    return form.hasError('required') ?
      'Enter a description for the category' :
      form.hasError('minlength') ?
        'The description must have at least 3 characters' :
      form.hasError('maxlength') ?
        'Enter a shorter description' : '';
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
function MD_DIALOG_DATA(MD_DIALOG_DATA: any) {
  throw new Error('Function not implemented.');
}

