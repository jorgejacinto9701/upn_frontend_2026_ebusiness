import { Component, OnInit } from '@angular/core';
import { Opcion } from '../security/opcion';
import { TokenService } from '../security/token.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
  CommonModule,
  ReactiveFormsModule,
  RouterModule,
  RouterLink, 
  NgIf, 
  NgFor
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;
  opcRegistro : Opcion[] = [];
  opcConsulta : Opcion[] = [];
  opcCRUD : Opcion[] = [];
  opcTransacciones : Opcion[] = [];

  constructor(private tokenService: TokenService) {
    console.log("MenuComponent >>> constructor >>> " + this.tokenService.getToken());
  }

  ngOnInit() {
    console.log("MenuComponent >>> ngOnInit >>> ");

    const opciones = this.tokenService.getOpciones();

    console.log('Todas las opciones:', opciones);

    this.opcRegistro = opciones.filter(x => x.tipo === 1);
    this.opcConsulta = opciones.filter(x => x.tipo === 2);
    this.opcCRUD = opciones.filter(x => x.tipo === 3);
    this.opcTransacciones = opciones.filter(x => x.tipo === 4);

    console.log('Registro:', this.opcRegistro);
    console.log('Consulta:', this.opcConsulta);
    console.log('CRUD:', this.opcCRUD);
    console.log('Transacciones:', this.opcTransacciones);

    
    if (this.tokenService.getToken()) {
      console.log("MenuComponent >>> this.isLogged = true >>> ");
      this.isLogged = true;
    } else {
      console.log("MenuComponent >>> this.isLogged = false >>> ");
      this.isLogged = false;
    }
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

}
