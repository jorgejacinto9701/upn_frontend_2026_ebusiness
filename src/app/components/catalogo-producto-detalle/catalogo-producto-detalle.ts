import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto-service';
import { Producto } from '../../models/producto.model';
import { RouterLink, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalogo-producto-detalle',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MenuComponent,
    RouterLink
  ],
  templateUrl: './catalogo-producto-detalle.html',
  styleUrl: './catalogo-producto-detalle.css',
})
export class CatalogoProductoDetalle implements OnInit {

  productoAux!: Observable<Producto>;

  constructor(private productoService: ProductoService,
    private route: ActivatedRoute
  ) {
    console.log("==> constructor ");
  }


  ngOnInit(): void {
    console.log("==> ngOnInit ");
    const id = this.route.snapshot.paramMap.get('id');
    this.productoAux = this.productoService.verDetalle(id!);
  }


}
