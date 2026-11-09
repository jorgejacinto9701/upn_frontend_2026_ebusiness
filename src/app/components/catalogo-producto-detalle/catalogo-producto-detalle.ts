
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto-service';
import { Producto } from '../../models/producto.model';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import {
  ComentarioService,
  Comentario
} from '../../services/comentario-service';

import { TokenService } from '../../security/token.service';

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
  comentariosAux!: Observable<Comentario[]>;

  idProducto: number = 0;
  estaLogueado: boolean = false;
  nombreUsuario: string = '';

  formularioComentario: FormGroup;
  enviandoComentario: boolean = false;
  mensajeComentario: string = '';
  errorComentario: string = '';

  constructor(
    private productoService: ProductoService,
    private comentarioService: ComentarioService,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.formularioComentario = this.formBuilder.group({
      descripcion: ['', [
        Validators.required,
        Validators.maxLength(1000)
      ]]
    });
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    this.idProducto = Number(id);

    // Consultar el producto
    this.productoAux =
      this.productoService.verDetalle(id!);

    // Consultar sus comentarios
    this.cargarComentarios();

    // Comprobar si el usuario inició sesión
    this.estaLogueado = !!this.tokenService.getToken();

    this.nombreUsuario =
      this.tokenService.getUserNameComplete() || '';
  }

  cargarComentarios(): void {
    this.comentariosAux =
      this.comentarioService.listarPorProducto(this.idProducto);
  }

  publicarComentario(): void {

    this.mensajeComentario = '';
    this.errorComentario = '';

    if (!this.estaLogueado) {
      this.errorComentario =
        'Debes iniciar sesión para publicar un comentario.';
      return;
    }

    if (this.formularioComentario.invalid ||
        this.enviandoComentario) {
      this.formularioComentario.markAllAsTouched();
      return;
    }

    const descripcion =
      this.formularioComentario.value.descripcion.trim();

    if (!descripcion) {
      this.errorComentario =
        'Escribe un comentario antes de publicar.';
      return;
    }

    // El backend asigna el ID del usuario autenticado
    const nuevoComentario: Comentario = {
      descripcion: descripcion,
      idProducto: this.idProducto
    };

    this.enviandoComentario = true;

    this.comentarioService.registrar(nuevoComentario)
      .subscribe({
        next: () => {
          this.mensajeComentario =
            '¡Comentario publicado correctamente!';

          this.formularioComentario.reset();
          this.enviandoComentario = false;

          // Actualizar comentarios sin recargar la página
          this.cargarComentarios();
        },
        error: (error) => {
          this.enviandoComentario = false;

          if (error.status === 401 || error.status === 403) {
            this.errorComentario =
              'Tu sesión no es válida. Inicia sesión nuevamente.';
          } else {
            this.errorComentario =
              'No se pudo publicar el comentario. Inténtalo nuevamente.';
          }
        }
      });
  }
}
