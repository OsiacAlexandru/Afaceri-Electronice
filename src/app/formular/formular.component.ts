import { Component, OnInit } from '@angular/core';
import {Catalog} from '../catalog';
import {ProductService} from '../product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'


@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.css']
})
export class FormularComponent implements OnInit {
  
   categorii: string[] = [
    'Imbracaminte', 'Incaltaminte', 'Accesorii'
  ];
  
  produsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });
  
  catalog = new Catalog();

  constructor(private productService:ProductService) { 
 
  }
  
  notifyUserError() {
    var x = document.getElementById("snackbar");
    x.innerHTML = "Continutul formularului este incorect!"
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
  
  notifyUserSucces() {
    var x = document.getElementById("snackbar");
    x.innerHTML = "Produs adaugat cu succes!"
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
  
  ngOnInit(): void {
  }
  
  addProdus() {
      if(this.produsForm.valid) {
        if (this.produsForm.controls.category.value == "Imbracaminte") {
          this.catalog.category_id = 1;
        }
        if (this.produsForm.controls.category.value == "Incaltaminte") {
          this.catalog.category_id = 2;
        }
        if (this.produsForm.controls.category.value == "Accesorii") {
          this.catalog.category_id = 3;
        }
        this.catalog.name = this.produsForm.controls.name.value;
        this.catalog.description = this.produsForm.controls.description.value;
        this.catalog.price = this.produsForm.controls.price.value;
        this.productService.addProduct(this.catalog).subscribe(data => {
          console.log(data)
        });
        this.notifyUserSucces();
        window.location.reload();
      } else {
        this.notifyUserError();
      }
  }
}
