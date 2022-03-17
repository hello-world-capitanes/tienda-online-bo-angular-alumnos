import { Categoria } from './models/categoria.models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoryForm !: FormGroup;
  buttonPressed: boolean = false;
  errorDatoExistente: boolean = false;

  categories: Categoria[] = [];

  constructor(private formulario: FormBuilder) { }

  ngOnInit(): void {

    this.categoryForm = this.formulario.group({

      nombre: new FormControl('', [Validators.required]),

      descripcion: new FormControl('', [Validators.required]),

      //color: new FormControl('', [Validators.required])
    })
  }

  addLista(){

    this.buttonPressed = true;
    console.log(this.categoryForm.valid);
    if (this.categoryForm.valid){

      if (this.categories.some( (elemento) => elemento.getNombre() == this.categoryForm.get("nombre")?.value)){
        if (this.categories.some( (elemento) => (elemento.getNombre() == this.categoryForm.get("nombre")?.value) && elemento.getEstado() == false)){

            for (let elemento of this.categories){
              if ((elemento.getNombre() == this.categoryForm.get("nombre")?.value) && elemento.getEstado() == false){

                elemento.cambiarEstado();
              }
            }

        } else {

          this.errorDatoExistente = true;
        }

      } else {
        this.errorDatoExistente = false;
        this.categories.push(new Categoria(this.categoryForm.get("nombre")?.value, true, this.categoryForm.get("descripcion")?.value, 'hola'));
      }
    }
  }

  remove(categoriaRef: Categoria)
  {
    this.categories.forEach(categorie => {
      if(categorie === categoriaRef)
      {
        categorie.cambiarEstado();
      }
    });
  }
}
