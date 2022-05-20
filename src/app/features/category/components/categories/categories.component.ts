import { ProductListCategoryComponent } from './../product-list-category/product-list-category.component';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/features/category/services/category-service.service';
import { Category } from './../../models/category.model';
import { ModifyCategoryComponent } from './modifyCategory/modify-category/modify-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categoryForm: FormGroup;
  panelOpenState = false;
  sub: Subscription;
  categories!: Category[];

  constructor(
    private form: FormBuilder,
    public categoryService: CategoryService,
    private matDialog: MatDialog
  ) {
    this.sub = this.categoryService
      .getCategories()
      .subscribe((categoriesFromApi) => {
        this.categories =
          !!categoriesFromApi && categoriesFromApi.length > 0
            ? categoriesFromApi
            : [];
      });

    this.categoryForm = this.form.group({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    });
  }

  ngOnInit(): void {}

  get errorMessageName(): string {
    const form: FormControl = this.categoryForm.get('name') as FormControl;
    return form.hasError('required')
      ? 'Enter a name for the category'
      : form.hasError('minlength')
      ? 'The name must have at least 3 characters'
      : form.hasError('maxlength')
      ? 'The name must have maximum 20 characters'
      : '';
  }

  get errorMessageDescription(): string {
    const form: FormControl = this.categoryForm.get(
      'description'
    ) as FormControl;
    return form.hasError('required')
      ? 'Enter a description for the category'
      : form.hasError('minlength')
      ? 'The description must have at least 3 characters'
      : form.hasError('maxlength')
      ? 'Enter a shorter description'
      : '';
  }

  addCategory() {
    if (!this.categoryForm.valid) {
      return;
    }

    let category = new Category(
      this.categoryForm.get('id')?.value,
      this.categoryForm.get('name')?.value,
      this.categoryForm.get('description')?.value,
      true
    );

    this.categoryService.addCategory(category);
    this.categoryForm.reset();
  }

  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category);
  }
  activeCategory(category: Category) {
    this.categoryService.activeCategory(category);
  }
  generateId(): string {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  modifyCategory(id: string){
    let config = new MatDialogConfig();
    const dialogRef = this.matDialog.open(ModifyCategoryComponent, {
      width: '350px',
    });
    dialogRef.componentInstance.id = id;
  }

  openProductList(category: Category){
    this.categoryService.setSelectedCategorySeeProducts(category.name);
    const dialogRef = this.matDialog.open(ProductListCategoryComponent, {
      height:'400px',
      width: '60%',
      data: {
        category: category
      }
    })

  }
}
