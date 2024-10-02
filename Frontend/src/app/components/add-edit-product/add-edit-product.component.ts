import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-add-edit-products',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ProgressBarComponent],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent implements OnInit{
  formProducto: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  ngOnInit(): void {
    if(this.id != 0){
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
  }

  constructor (private fb: FormBuilder, private _productService: ProductService, private router: Router, private noti: AppComponent, private aRoute: ActivatedRoute){
    this.formProducto = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required]
    })
    this.id = Number(aRoute.snapshot.paramMap.get('id')); 
  } 

  addProduct(){ 
    const product: Product = {
      name: this.formProducto.value.name,
      description: this.formProducto.value.description,
      price: this.formProducto.value.price,
      stock: this.formProducto.value.stock
    }
    this.loading = true;

    if (this.id != 0){ //editar
      this._productService.updateProduct(this.id, product).subscribe(() => {
        product.id = this.id;
        console.log('Producto editado');
        this.noti.createNotification(`El producto ${product.name} fue editado con exito`, 'info');
        this.loading = false;
        this.router.navigate(['/']);
      })  
    } else { //agregar
      this._productService.saveProduct(product).subscribe(() => {
        console.log('Producto agregado');
        this.noti.createNotification(`El producto ${product.name} fue agregado con exito`, 'success');
        this.loading = false;
        this.router.navigate(['/']);
      })
     
    }

   
    

    //console.log(this.formProducto);  //Para mostrar cosas por consola
    //console.log(product);
  }

  getProduct(id: number){
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product)=>{
      //console.log(data);
      this.formProducto.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock 
      });
      this.loading = false;
    })

    
  }

}