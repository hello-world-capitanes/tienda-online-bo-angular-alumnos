import { Categoria } from './models/categoria.models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  title = 'colorPicker';
  color: string = '#2889e9';
  arrayColors: any = {
    color1: '#2883e9',
    color2: '#e920e9',
    color3: 'rgb(255,245,0)',
    color4: 'rgb(236,64,64)',
    color5: 'rgba(45,208,45,1)'
  };
  selectedColor: string = 'color1';

  //categories: Categoria[] = [];
  categoryForm !: FormGroup;
  buttonPressed: boolean = false;
  errorDatoExistente: boolean = false;

  categories: Categoria[] = [
    new Categoria("Fruta", true, "Descripción", "color"),
    new Categoria("Cereales", true, "Descripción", "color"),
    new Categoria("Verdura", false, "Descripción", "color"),
    new Categoria("Drogería", true, "Descripción", "color"),
  ];

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
