import { CategoryService } from 'src/app/features/category/services/category-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoryForm: FormGroup;
  panelOpenState=false;
  categories!: Category[];

  constructor(private form: FormBuilder,
    public categoryService: CategoryService) {
    this.categoryForm = this.form.group({
      name: new FormControl
        (null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ]
        ),
      description: new FormControl
        (null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]
        ),
      active: new FormControl
        (null,
          [
            Validators.required,
          ]
        ),
    });
  }

  ngOnInit(): void {
    this.categories = this.categoryService.getAllCategories();
  }

  get errorMessageName(): string {
    const form: FormControl = (this.categoryForm.get('name') as FormControl);
    return form.hasError('required') ?
      'Introduce un nombre para la categoría' :
      form.hasError('minlength') ?
        'El nombre debe tener mínimo x carácteres' :
        form.hasError('maxlength') ?
          'El nombre debe tener máximo x carácteres' : '';
  }

  get errorMessageDescription(): string {
    const form: FormControl = (this.categoryForm.get('description') as FormControl);
    return form.hasError('required') ?
      'Introduce una descripción para la categoría' :
      form.hasError('minlength') ?
        'Introduce una buena descripción' :
        form.hasError('maxlength') ?
          'Introduce una descripción mas corta' : '';
  }

  get errorMessageActive(): string {
    const form: FormControl = (this.categoryForm.get('active') as FormControl);
    return form.hasError('required') ?
      'Introduce un estado para la categoría' : '';
  }

  addCategory() {
    let bool: boolean;
    if (!this.categoryForm.valid) {
      return;
    }

    if (this.categoryForm.get('active')?.value === "Activo") {
      bool = true;
    } else {
      bool = false
    }

    let category = new Category(this.categoryForm.get('name')?.value,
      this.categoryForm.get('id')?.value,
      this.categoryForm.get('description')?.value,
      bool)

    this.categoryService.addCategory(category)
  }

  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category);
  }

  existId(id: string): boolean {
    if (
      this.categoryService.categoryList.find((category) => {
        category.id === id;
      })
    ) {
      return true;
    } else {
      return false;
    }
  }

  generateId(): string {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }

}
