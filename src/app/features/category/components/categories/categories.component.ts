import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { ProductListCategoryComponent } from './../product-list-category/product-list-category.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/features/category/services/category-service.service';
import { Category } from './../../models/category.model';
import { ModifyCategoryComponent } from './modifyCategory/modify-category/modify-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  animations: [
    trigger('detailExpand',[
      state('collapsed', style({ height: '0', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class CategoriesComponent implements OnInit {
  categoryForm: FormGroup;
  panelOpenState = false;
  activeCategoryListSub: Subscription;
  deActiveCategoryListSub: Subscription;

  activeCategories!: Category[];
  deActiveCategories !: Category[];
  dataSourceActiveCategories!: MatTableDataSource<Category>;
  dataSourceDeActiveCategories!: MatTableDataSource<Category>;

  pageSize = 5;

  categoryExpanded: Category | null = null;
  columnsToDisplay: string[] = [ "edit", "active", "category-name", "expand"];
  pageSizeOptionsActiveCategories: number[] = [5, 10, 20, 50];
  pageSizeOptionsDeActiveCategories: number[] = [5, 10, 20, 50];

  @ViewChild('matPaginatorActiveCategories') matPaginatorActiveCategories !: MatPaginator;
  @ViewChild('matPaginatorDeactiveCategories') matPaginatorDeactiveCategories !: MatPaginator;

  // MatPaginator Output
  pageEventActiveCategories!: PageEvent;
  pageEventDeActiveCategories!: PageEvent;

  constructor(
    private form: FormBuilder,
    public categoryService: CategoryService,
    private matDialog: MatDialog
  ) {
    this.activeCategoryListSub = this.categoryService
      .getAllActiveCategories()
      .subscribe((categoriesFromApi) => {
        this.activeCategories =
          !!categoriesFromApi && categoriesFromApi.length > 0
            ? categoriesFromApi
            : [];

        this.dataSourceActiveCategories = new MatTableDataSource<Category>(this.activeCategories);
        this.dataSourceActiveCategories.paginator = this.matPaginatorActiveCategories;
    });

    this.deActiveCategoryListSub = this.categoryService
    .getAllDeActiveCategories()
    .subscribe((categoriesFromApi) => {
      this.deActiveCategories =
        !!categoriesFromApi && categoriesFromApi.length > 0
          ? categoriesFromApi
          : [];
      this.dataSourceDeActiveCategories = new MatTableDataSource<Category>(this.deActiveCategories);
      this.dataSourceDeActiveCategories.paginator = this.matPaginatorDeactiveCategories;
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

  toggleCollapse(row: Category) {
    this.categoryExpanded = (this.categoryExpanded === row ? null: row);
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
    this.activeCategoryListSub.unsubscribe();
    this.deActiveCategoryListSub.unsubscribe();
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
