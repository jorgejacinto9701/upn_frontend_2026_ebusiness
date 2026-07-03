import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto-service';
import { Producto } from '../../models/producto.model';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalogo-producto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MenuComponent,
    RouterLink
  ],
  templateUrl: './catalogo-producto.html',
  styleUrl: './catalogo-producto.css',
})
export class CatalogoProducto implements OnInit {

  productosAux!: Observable<Producto[]>;

  constructor(private productoService: ProductoService) {
    console.log("==> constructor ");
  }

  ngOnInit(): void {
    console.log("==> ngOnInit ");
    this.productosAux = this.productoService.listaCatalogo();
  }
}
